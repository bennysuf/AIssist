import type { Prompt } from "./promptDto";

export type Assistant = {
  id: number;
  apiKey: string;
  role: string;
  companyName: string;
  prompts: Prompt[];
};
