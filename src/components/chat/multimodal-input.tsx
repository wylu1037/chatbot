"use client";

import type {
  Attachment,
  ChatRequestOptions,
  CreateMessage,
  Message,
} from "ai";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { ArrowUp, PaperclipIcon, Square } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useWindowSize } from "usehooks-ts";
type MultimodalInputProps = {
  chatId: string;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Attachment[]>>;
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  className?: string;
};

function PureMultimodalInput({
  chatId,
  input,
  setInput,
  isLoading,
  stop,
  attachments,
  setAttachments,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
}: MultimodalInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // What does using a queue do?
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  // handle textarea input change
  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  // upload files to the cloud
  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);

      console.log(
        "files",
        files.map((file) => file.name),
      );

      setUploadQueue(files.map((file) => file.name));

      try {
        // upload files

        setAttachments((currentAttachments) => [...currentAttachments]);
      } catch (error) {
        console.error("Error uploading files!", error);
      } finally {
        // remove files from upload queue that have been uploaded
        setUploadQueue([]);
      }
    },
    [setAttachments],
  );

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <input
        type="file"
        className="pointer-events-none fixed hidden"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        tabIndex={-1}
      />

      <div className="relative w-full max-w-2xl">
        <Textarea
          className="min-h-[24px] resize-none overflow-hidden !text-base"
          ref={textareaRef}
          placeholder="Send a message..."
          value={input}
          rows={3}
          onChange={handleInput}
        />

        <AttachmentsButton fileInputRef={fileInputRef} isLoading={isLoading} />
        {!isLoading ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
          <SendButton
            submitForm={handleSubmit}
            input={input}
            uploadQueue={uploadQueue}
          />
        )}
      </div>
    </div>
  );
}

export const MultimodalInput = memo(PureMultimodalInput);

interface AttachmentsButtonProps {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  isLoading: boolean;
}

function PureAttachmentsButton({
  fileInputRef,
  isLoading,
}: AttachmentsButtonProps) {
  return (
    <Button
      className="absolute bottom-2 right-12 flex h-8 w-8 items-center gap-2 rounded-full"
      variant="outline"
      disabled={isLoading}
      onClick={(event) => {
        event.preventDefault();
        fileInputRef.current?.click();
      }}
    >
      <PaperclipIcon />
    </Button>
  );
}

export const AttachmentsButton = memo(PureAttachmentsButton);

function PureStopButton({
  stop,
  setMessages,
}: {
  stop: () => void;
  setMessages: Dispatch<SetStateAction<Array<Message>>>; // used to filer out uncompleted messages
}) {
  return (
    <Button
      className="absolute bottom-2 right-2 flex h-8 w-8 items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600"
      variant="outline"
      onClick={(event) => {
        event.preventDefault();
        stop();
        // TODO
        setMessages((currentMessages) =>
          currentMessages.filter((message) => message.id !== "uncompleted"),
        );
      }}
    >
      <Square className="text-muted/80" />
    </Button>
  );
}
const StopButton = memo(PureStopButton);

function PureSendButton({
  submitForm,
  input,
  uploadQueue,
}: {
  submitForm: () => void;
  input: string;
  uploadQueue: Array<string>;
}) {
  return (
    <Button
      className="absolute bottom-2 right-2 flex h-8 w-8 items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600"
      onClick={(event) => {
        event.preventDefault();
        submitForm();
      }}
      variant="outline"
      disabled={input.length === 0 || uploadQueue.length > 0}
    >
      <ArrowUp className="text-muted" />
    </Button>
  );
}

const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
  if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length) {
    return false;
  }
  if (prevProps.input !== nextProps.input) {
    return false;
  }
  return true;
});
