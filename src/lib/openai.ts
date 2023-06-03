import { Configuration } from "openai";

import { env } from "@/env.mjs";

export const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
