import { create } from "zustand";
import * as noteApi from "../api/noteApi";
import type { NoteState } from "../dto/noteDto";
import { useUserStore } from "./userStore";

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  error: null,
  filter: "all",
  assistantId: null,
  hasMore: false,

  setHasMore: (bool) => set({ hasMore: bool }),

  setNotes: (messages) => set({ notes: messages }),

  setFilter: (type) => set({ filter: type }),

  setAssistantId: (id) => set({ assistantId: id }),

  loadInitialNotes: async () => {
    console.log("load initial notes");
    const { assistantId, filter } = get();

    if (!assistantId) return;

    const notes = await noteApi.getNotes(assistantId, filter);
    set({ notes, hasMore: notes.length === 20 });
  },

  loadMoreNotes: async () => {
    const { assistantId, filter, notes, hasMore } = get();
    if (!assistantId || !hasMore || notes.length === 0) return;

    const lastId: number = notes[notes.length - 1].id;

    const moreNotes = await noteApi.getNotes(assistantId, filter, {
      before: lastId,
    });

    set((state) => ({
      hasMore: moreNotes.length !== 20,
      notes: [...state.notes, ...moreNotes],
    }));
  },

  updateNote: async (updates) => {
    const { filter, notes } = get();
    set({ error: null });
    try {
      const res = await noteApi.updateNote(updates);

      let updatedNotes = [];
      if (filter === "all") {
        updatedNotes = notes.map((note) =>
          note.id === res.id ? { ...note, markedRead: res.markedRead } : note
        );
      } else {
        updatedNotes = notes.filter((note) => note.id !== res.id);
      }

      set({ notes: updatedNotes });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      set({ error: message });
    }
  },
}));

export const useLoadInitialNotes = () =>
  useNoteStore((state) => state.loadInitialNotes);
export const useLoadMoreNotes = () =>
  useNoteStore((state) => state.loadMoreNotes);

/* 
getNotes makes a request to get up to 20 notes
if it isn't the initial request, it gets the next batch of 20, 
starting from before the id of the last note.

hasMore is if there aren't 20 notes returned, 
it means we are at the last of the users notes
and we shouldn't allow for more fetches.


*/
