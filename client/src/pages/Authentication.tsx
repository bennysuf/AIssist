import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import WelcomeSign from "../components/WelcomeSign";
import { Box } from "../util/muiExports";

function Authentication() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("login")) setAuthMode("login");
    if (location.pathname.includes("signup")) setAuthMode("signup");
  }, [location.pathname]);

  return (
    <Box
      sx={{
        marginTop: { xs: "-50px", sm: 0 },
        display: "flex",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "100dvh",
          display: {
            xs: "none",
            sm: "flex",
          },
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WelcomeSign />
      </Box>
      <Box
        sx={{
          width: "100vw",
          maxWidth: {
            sm: "500px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        {authMode === "login" && <LoginForm />}
        {authMode === "signup" && <SignupForm />}
      </Box>
    </Box>
  );
}

export default Authentication;
