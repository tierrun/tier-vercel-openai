import { Client } from "postmark";

import { env } from "@/env.mjs";

export const postmarkClient = new Client(env.POSTMARK_API_TOKEN);
