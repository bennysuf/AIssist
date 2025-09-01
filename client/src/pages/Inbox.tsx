import { useEffect } from "react";
import {
  Box,
  Button,
  FilterAltIcon,
  Grid,
  MenuItem,
  Select,
  Typography,
  Paper,
  VisibilityIcon,
  VisibilityOffIcon,
  Tooltip,
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
  const updateNote = useNoteStore((state) => state.updateNote);
  const markAllRead = useNoteStore((state) => state.markAllRead);

  const loadInitialNotes = useLoadInitialNotes();
  const loadMoreNotes = useLoadMoreNotes();

  // When filter changes
  useEffect(() => {
    const getAssistantId = user?.assistants[0].id ?? null;

    setNotes([]);
    setHasMore(false);
    setAssistantId(getAssistantId);
    loadInitialNotes();
  }, [filter, user]);

  const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      //   year: "numeric",
    });
    const time12 = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { date: formattedDate, time: time12 };
  };

  const markAsRead = (
    id: number,
    markedRead: boolean
  ) => {
    updateNote({ id, markedRead });
  };

  const markAllAsRead = (markedRead: boolean) => {
    markAllRead(markedRead);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flex: 1,
        overflowY: "scroll",
        paddingBottom: "10px",
        scrollbarWidth: "none",
        msOverflowStyle: "none" as const,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Typography>Inbox</Typography>
        <Button sx={{ width: "200px" }} onClick={() => markAllAsRead(true)}>
          mark all as read
        </Button>
        <Button sx={{ width: "200px" }} onClick={() => markAllAsRead(false)}>
          mark all as unread
        </Button>
      </Box>
      <Box
        sx={{
          padding: "10px",
          border: "2px solid #ccc",
          borderRadius: "20px",
          fontSize: "1rem",
          margin: "1rem 2rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
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
      </Box>
      <Box sx={{}}>
        {notes.length < 1 ? (
          <Typography>no notes</Typography>
        ) : (
          <Grid
            container
            direction="row"
            sx={{
              gap: "1em",
              marginTop: "1em",
              paddingBottom: "10px",
            }}
          >
            {notes.map((note, index) => {
              // TODO: onClick of paper, have popup with full text
              const {
                id,
                callerName,
                noteSummery,
                noteText,
                markedRead,
                createdAt,
              } = note;
              const createdDate = formatDate(new Date(createdAt));
              if (createdDate.date === formatDate(new Date()).date) {
                createdDate.date = "Today";
              }
              return (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    width: "100%",
                    height: "10rem",
                    position: "relative",
                    padding: "15px",
                    bgcolor: "var(--bg-default)",
                    margin: "0 2rem",
                    borderRadius: "20px",
                    border: "1px solid #ccc",
                    borderLeft: markedRead
                      ? undefined
                      : "3px solid var(--color-primary-dark)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{ position: "absolute", right: 10 }}
                    onClick={() => markAsRead(id, !markedRead)}
                  >
                    {/* //TODO: create mark logic */}
                    <Tooltip
                      title={markedRead ? "Mark as unread" : "Mark as read"}
                      arrow
                    >
                      {markedRead ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </Tooltip>
                  </Box>
                  <Typography>{callerName}</Typography>
                  {/* add caller phone number */}
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <Typography variant="caption">123-456-7890</Typography>
                    <Typography variant="caption">
                      {createdDate.date} {createdDate.time}
                    </Typography>
                  </Box>
                  <Typography variant="body1">{noteSummery}</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      padding: "10px",
                      //   border: "2px solid #ccc",
                      // TODO: add min and max height
                      height: "50%",
                      width: "100%",
                      borderRadius: "20px",
                      bgcolor: "white",
                      fontSize: "1rem",
                    }}
                  >
                    {noteText}
                  </Typography>
                </Paper>
              );
            })}
          </Grid>
        )}
      </Box>
      {hasMore && <Button onClick={() => loadMoreNotes()}>Load more</Button>}
    </Box>
  );
}

export default Inbox;
// ! Will need to display the assistant connected to note, if user has multiple assistants
// * ^ In backend, get notes where assistant_id == param.assistantId. So frontend will have another filter that on change, it fetches all notes again but with the new assistant id
