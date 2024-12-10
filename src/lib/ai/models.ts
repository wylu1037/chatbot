export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Model[] = [
  {
    id: "gpt-turbo-3.5",
    label: "GPT Turbo 3.5",
    apiIdentifier: "gpt-turbo-3.5",
    description: "Fast, lightweight model for fast, lightweight tasks",
  },
  {
    id: "gpt-4o-mini",
    label: "GPT 4o mini",
    apiIdentifier: "gpt-4o-mini",
    description: "Small model for fast, lightweight tasks",
  },
  {
    id: "gpt-4o",
    label: "GPT 4o",
    apiIdentifier: "gpt-4o",
    description: "For complex, multi-step tasks",
  },
] as const;

export const DEFAULT_MODEL_NAME: string = "gpt-turbo-3.5";
