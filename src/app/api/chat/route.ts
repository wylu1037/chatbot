import { customModel } from "@/lib/ai";
import { models } from "@/lib/ai/models";
import { auth } from "@/server/auth";
import { Message, streamText } from "ai";
import { getWeather } from "@/lib/ai/tools/get-weather";

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    messages,
    modelId,
  }: { id: string; messages: Array<Message>; modelId: string } =
    await req.json();

  const model = models.find((model) => model.id === modelId);

  if (!model) {
    return new Response("Model not found", { status: 404 });
  }

  const result = streamText({
    model: customModel(model.apiIdentifier),
    system: "You are a helpful assistant!",
    messages,
    maxSteps: 5,
    tools: {
      getWeather,
    },
  });

  return result.toDataStreamResponse();
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not found", { status: 404 });
  }

  const session = await auth();
  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // getChatById
    // deleteChatById

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
