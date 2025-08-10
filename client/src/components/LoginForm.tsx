import { useState } from "react";
import { useLogin, useAuthStore } from "../util/stores/authStore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "../util/muiExports";
import {} from "@mui/material";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const error = useAuthStore((state) => state.error);
  const login = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success: boolean = await login(email, password);
      if (success) navigate("/portal");
    } catch (e) {
      console.error("Login failed:", e);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>Welcome Back!</Typography>
      <Typography>
        Don't have an account?
        <Button
          onClick={() => {
            navigate("/auth/signup");
          }}
          sx={{
            textTransform: "none",
            textDecoration: "underline",
            marginRight: ".7em",
            fontSize: ".9em",
            color: "black",
          }}
        >
          Sign Up
        </Button>
      </Typography>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "var(--color-secondary-main)",
            boxShadow: "none",
            textTransform: "none",
            borderRadius: "10px",
            height: "3rem",
            width: "7rem",
            fontSize: ".9em",
            marginTop: ".5em",
          }}
        >
          Login
        </Button>
      </form>
      <Button
        sx={{
          textTransform: "none",
          textDecoration: "underline",
          marginRight: ".7em",
          fontSize: ".9em",
          color: "black",
        }}
      >
        Forgot Password?
      </Button>
    </Box>
  );
}

export default LoginForm;
