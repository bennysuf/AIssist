import React, { useState } from "react";
import { useAuthStore } from "../util/stores/authStore";
import { useLogin } from "../util/stores/authStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const error = useAuthStore((state) => state.error);
  //   const isLoading = useUserStore((state) => state.isLoading);
  const login = useLogin();

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
    <div style={{}}>
      <div style={{ height: "200px", width: "200px", backgroundColor: "blue" }}>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
