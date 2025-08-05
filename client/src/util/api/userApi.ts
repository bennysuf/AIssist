import axios from "./axios";
import type { User } from "../dto/userDtos";

export async function fetchUser(): Promise<User> {
  const { data } = await axios.get("/me");
  return data.data;
}

export async function updateUser(updates: Partial<User>): Promise<User> {
  const { data } = await axios.patch("/me", updates);
  return data;
}