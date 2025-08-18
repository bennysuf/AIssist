import axios from "./axios";
import type { Note } from "../dto/noteDto";

export async function getNotes(
  assistantId: number,
  filter: string,
  opts?: { before?: number }
): Promise<Note[]> {
//   console.log(
//     `notes api: assistant: ${assistantId}, filter: ${filter}, opts: ${opts}`
//   );
  const { data } = await axios.get("/notes/load_notes/", {
    params: {
      assistantId,
      filter,
      limit: 20,
      ...(opts?.before && { before: opts.before }),
    },
  });
  return data.data;
}

export async function updateNote(updates: Partial<Note>): Promise<Note> {
  const { data } = await axios.patch("/", updates);
  return data;
}
