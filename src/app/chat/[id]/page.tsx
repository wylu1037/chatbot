"use client";

import { MultimodalInput } from "@/components/chat/multimodal-input";
import { type Message, useChat } from "ai/react";
import { useSWRConfig } from "swr";

export default function ChatPage() {
  const id = "123";
  const selectedModelId = "gpt-4o-mini";
  const initialMessages: Message[] = [];
  const { mutate } = useSWRConfig();
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
    data: streamingData,
  } = useChat({
    id,
    body: { id, modelId: selectedModelId },
    initialMessages,
    onFinish: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      mutate("/api/history").then(() => {
        console.log("mutate");
      });
    },
  });

  return (
    <div>
      <MultimodalInput
        chatId="123"
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        stop={stop}
        attachments={[]}
        setAttachments={() => {
          console.log("setAttachments");
        }}
        messages={messages}
        setMessages={setMessages}
        append={append}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
