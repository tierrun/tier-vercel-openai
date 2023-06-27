import { OpenAIStream, StreamingTextResponse } from "ai";
import { FeatureName } from "tier";
import { z } from "zod";

import { env } from "@/env.mjs";
import { openAI } from "@/lib/ai";
import { tier } from "@/lib/tier";

if (!env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const runtime = "edge";

const inputSchema = z.object({
  prompt: z.string(),
  userId: z.string(),
});

const generateCopyStream = async (input: string) => {
  const prompt = `You are a marketing expert and a customer approaches you to write a very short and very interesting marketing copy for him or her. They want a marketing copy on the topic of \"${input}\".\n\nThis is the short marketing copy you came up with:\n\n`;

  const response = await openAI.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.85,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  const stream = await OpenAIStream(response, {
    onStart: async () => {},
  });

  return stream;
};

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = inputSchema.parse(json);

    const tierAnswer = await tier.can(
      `org:${body.userId}`,
      env.TIER_AICOPY_FEATURE_ID as FeatureName
    );

    if (tierAnswer.ok) {
      const stream = await generateCopyStream(body.prompt);

      await tierAnswer.report();

      return new StreamingTextResponse(stream);
    } else {
      const tierExtraCopyAnswer = await tier.can(
        `org:${body.userId}`,
        env.TIER_EXTRACOPY_FEATURE_ID as FeatureName
      );

      if (tierExtraCopyAnswer.ok) {
        const stream = await generateCopyStream(body.prompt);

        await tierAnswer.report();

        return new StreamingTextResponse(stream);
      } else {
        return new Response("You are not allowed to use this feature", {
          status: 402,
        });
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
