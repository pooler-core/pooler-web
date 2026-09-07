import { agentJson } from "@/lib/discovery";

export const dynamic = "force-static";

export function GET() {
  return new Response(`${JSON.stringify(agentJson(), null, 2)}\n`, {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
