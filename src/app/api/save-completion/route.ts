import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const inputSchema = z.object({
  completion: z.string(),
  input: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const json = await req.json();
    const body = inputSchema.parse(json);

    await db.content.create({
      data: {
        prompt: body.input,
        generatedContent: body.completion,
        userId: user.id,
      },
    });

    return new Response(
      JSON.stringify({
        result: body.completion,
      })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
