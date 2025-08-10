import { useState } from "react";
import { useAuthStore, useSignup } from "../util/stores/authStore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "../util/muiExports";
import type { SignupUser } from "../util/dto/userDtos";

function SignupForm() {
  const [userData, setUserData] = useState<SignupUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const error = useAuthStore((state) => state.error);
  const signup = useSignup();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success: boolean = await signup(userData);
      if (success) navigate("/portal");
    } catch (e) {
      console.error("Signup failed: ", e);
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
      <Typography>Create an account!</Typography>
      <Typography>
        Already have an account?
        <Button
          onClick={() => navigate("/auth/login")}
          sx={{
            textTransform: "none",
            textDecoration: "underline",
            marginRight: ".7em",
            fontSize: ".9em",
            color: "black",
          }}
        >
          Log In
        </Button>
      </Typography>
      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            type="text"
            name="firstName"
            placeholder="Fist Name"
            value={userData.firstName}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={userData.lastName}
            onChange={handleChange}
          />
        </Box>
        <TextField
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        <TextField
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={handleChange}
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
          Create Account
        </Button>
      </form>
    </Box>
  );
}

export default SignupForm;
