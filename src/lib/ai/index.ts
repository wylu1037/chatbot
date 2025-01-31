import { createOpenAI } from "@ai-sdk/openai";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";

import { customMiddleware } from "./custom-middleware";

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: customMiddleware,
  });
};

// custom openai client
const openai = createOpenAI({
  compatibility: "strict",
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_PROXY_URL,
});

export const imageGenerationModel = openai.image("dall-e-3");
