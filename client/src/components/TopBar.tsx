import { IconButton, Toolbar } from "@mui/material";
import {
  Box,
  MenuIcon,
  AppBar,
} from "../util/muiExports";

type Props = {
  setNavBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navBarOpen: boolean;
};

function TopBar({ setNavBarOpen, navBarOpen }: Props) {
  return (
    <Box
      sx={{
        display: { sm: "none" },
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--color-primary-main)",
          width: "100dvw",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setNavBarOpen(!navBarOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
