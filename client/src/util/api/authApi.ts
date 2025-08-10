import axios from "./axios";
import type { SignupUser } from "../dto/userDtos";

export async function login(email: string, password: string): Promise<number> {
  const { status } = await axios.post("/auth/login", { email, password });
  return status;
}

export async function signup(user: SignupUser): Promise<number> {
  const { status } = await axios.post("/auth/signup", { user });
  return status;
}

export async function logout(): Promise<void> {
  await axios.post("/auth/logout");
}
