import axios from "./axios";
import type { Note } from "../dto/noteDto";

export async function getNotes(
  assistantId: number,
  filter: string,
  opts?: { before?: number }
): Promise<Note[]> {
  const { data } = await axios.get("", {
    params: {
      assistantId,
      filter,
      limit: 20,
      ...(opts?.before && { before: opts.before }),
    },
  });
  return data;
}

export async function updateNote(updates: Partial<Note>): Promise<Note> {
  const { data } = await axios.patch("/", updates);
  return data;
}
