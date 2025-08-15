export type Note = {
  id: number;
  assistantId: number;
  callerName: string;
  noteText: string;
  noteSummery: string;
  markedRead: boolean;
};

export type NoteState = {
  notes: Note[] | [];
  error: string | null;
  filter: "all" | "read" | "unread";
  assistantId: number | null;
  hasMore: boolean;

  setFilter(param: "all" | "read" | "unread"): void;
  setAssistantId(param: number | null): void;
  setNotes(param: Note[] | []): void;
  setHasMore(param: boolean): void;
  loadInitialNotes(): Promise<void>;
  loadMoreNotes(): Promise<void>;
  updateNote(updates: Partial<Note>): Promise<void>;
};
