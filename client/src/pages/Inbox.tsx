import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FilterAltIcon,
  MenuItem,
  Select,
  Typography,
} from "../util/muiExports";
import {
  useNoteStore,
  useLoadInitialNotes,
  useLoadMoreNotes,
} from "../util/stores/noteStore";
import { useUserStore } from "../util/stores/userStore";

function Inbox() {
  const {
    hasMore,
    setHasMore,
    filter,
    setFilter,
    setAssistantId,
    notes,
    setNotes,
  } = useNoteStore();
  const user = useUserStore((state) => state.user);

  const loadInitialNotes = useLoadInitialNotes();
  const loadMoreNotes = useLoadMoreNotes();

  // When filter changes
  useEffect(() => {
    const assistantId = user?.assistants[0].id ?? null;

    setNotes([]);
    setHasMore(false);
    setAssistantId(assistantId);
    loadInitialNotes();
  }, [filter, user]);

  const markAsRead = () => {};

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Typography>Inbox</Typography>
        <Button sx={{ width: "200px" }}>mark all as read</Button>
      </Box>
      <Box
        sx={{
          padding: "10px",
          border: "2px solid #ccc",
          borderRadius: "20px",
          fontSize: "1rem",
          margin: "2rem",
          height: "75px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FilterAltIcon
          sx={{ color: "var(--text-secondary)", margin: "1rem .5rem" }}
        />
        <Select
          id="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            width: "8rem",
            height: "3rem",
            borderRadius: "16px",
          }}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"unread"}>Unread</MenuItem>
          <MenuItem value={"read"}>Read</MenuItem>
        </Select>
        {/* search bar, and amount of messages */}
      </Box>
      {/* no messages display or grid of cards */}
      {/* set up load more option. if hasMore: display load more button */}
      {hasMore && <Button onClick={() => loadMoreNotes()}>Load more</Button>}
    </Box>
  );
}

export default Inbox;
// ! Will need to display the assistant connected to note, if user has multiple assistants
// * ^ In backend, get notes where assistant_id == param.assistantId. So frontend will have another filter that on change, it fetches all notes again but with the new assistant id
