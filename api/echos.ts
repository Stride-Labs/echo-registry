import type { VercelRequest, VercelResponse } from "@vercel/node";
import { echos } from "../src/echos";
import { cors } from "../src/middleware/cors";

export default cors(
  async (_request: VercelRequest, response: VercelResponse) => {
    response.json({ echos });
  }
);
