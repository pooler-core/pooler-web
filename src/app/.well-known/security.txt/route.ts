import { securityTxt } from "@/lib/discovery";

export const dynamic = "force-static";

export function GET() {
  return new Response(securityTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
