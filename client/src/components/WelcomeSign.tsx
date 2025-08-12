import { Box, Typography } from "../util/muiExports";

function WelcomeSign() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: "var(--color-secondary-light)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography>Welcome to AIssit!</Typography>
      Logo
      <Typography>Your own personal AI assistant</Typography>
    </Box>
  );
}

export default WelcomeSign;
