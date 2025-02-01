import { auth } from "@/server/auth";

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
