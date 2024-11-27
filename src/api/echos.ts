import type { VercelRequest, VercelResponse } from "@vercel/node";
import { echos } from "../echos";

export default function (_request: VercelRequest, response: VercelResponse) {
  response.json({ echos });
}
