"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// A slowly pooling liquid: domain-warped fbm, drawn almost entirely in the
// bottom two stops of the value range so the wordmark stays legible on top.
const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time * 0.045;

  // Two rounds of domain warping give the field its slow, folding motion.
  vec2 q = vec2(
    fbm(uv * 1.4 + t),
    fbm(uv * 1.4 + vec2(5.2, 1.3) - t)
  );
  vec2 r = vec2(
    fbm(uv * 1.4 + 3.6 * q + vec2(1.7, 9.2) + t * 1.3),
    fbm(uv * 1.4 + 3.6 * q + vec2(8.3, 2.8) - t * 1.1)
  );
  float f = fbm(uv * 1.4 + 3.6 * r);

  // Faint contour rings where the field crosses even intervals.
  float rings = abs(fract(f * 7.0) - 0.5) * 2.0;
  rings = smoothstep(0.86, 1.0, rings) * 0.16;

  vec3 deep  = vec3(0.016, 0.018, 0.024);
  vec3 pale  = vec3(0.42, 0.46, 0.56);
  vec3 col = mix(deep, pale, pow(clamp(f, 0.0, 1.0), 2.6));
  col += rings * mix(0.3, 1.0, f);

  // Hold the middle of the screen back so the wordmark reads cleanly.
  float center = smoothstep(0.15, 0.95, length(uv * vec2(0.62, 1.0)));
  col *= mix(0.34, 1.0, center);

  // Vignette toward the edges.
  col *= 1.0 - 0.55 * smoothstep(0.55, 1.45, length(uv));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", { antialias: false, alpha: false }) as
        | WebGLRenderingContext
        | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    // No WebGL: leave the canvas transparent. The CSS gradient underneath is
    // the fallback, so the page still looks intentional.
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // One oversized triangle covers the clip volume with no index buffer.
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");

    const resize = () => {
      // Cap DPR: the shader is fill-rate bound and 3x buys nothing visible.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    const draw = (seconds: number) => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = performance.now();

    const loop = (now: number) => {
      draw((now - start) / 1000);
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const run = () => {
      stop();
      if (reduced.matches) {
        // Still composed, still pretty — just not moving.
        draw(12);
        return;
      }
      start = performance.now();
      frame = requestAnimationFrame(loop);
    };

    // Don't burn a GPU loop on a tab nobody is looking at.
    const onVisibility = () => (document.hidden ? stop() : run());

    run();
    window.addEventListener("resize", run);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", run);

    return () => {
      stop();
      window.removeEventListener("resize", run);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", run);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
