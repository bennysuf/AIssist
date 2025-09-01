import axios from "./axios";
import type { Note } from "../dto/noteDto";

export async function getNotes(
  assistantId: number,
  filter: string,
  opts?: { before?: number }
): Promise<Note[]> {
  const { data } = await axios.get(
    `assistant/${assistantId}/notes/load_notes/`,
    {
      params: {
        filter,
        limit: 20,
        ...(opts?.before && { before: opts.before }),
      },
    }
  );
  return data.data;
}

export async function updateNote(updates: Partial<Note>, assistant_id: number): Promise<Note> {
  const { id, markedRead } = updates;
  const { data } = await axios.patch(`assistant/${assistant_id}/notes/${id}`, {
    markedRead: markedRead,
  });
  return data.data;
}

export async function markAllRead(
  markAllAsRead: boolean,
  assistant_id: number
): Promise<number[]> {
  const { data } = await axios.patch(
    `assistant/${assistant_id}/notes/mark_all_read`,
    {
      markedRead: markAllAsRead,
    }
  );
  return data.data;
}
