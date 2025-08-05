import axios from "./axios";
import type { User } from "../dto/userDtos";

export async function login(email: string, password: string): Promise<number> {
    const  {status}  = await axios.post("/auth/login", { email, password });
    return status;
  }
  
  export async function signup(
    user: User, password: string, passwordConfirmation: string
  ): Promise<User> {
    // ! test params in backend
    const { data } = await axios.post("/auth/signup", { user, password, passwordConfirmation });
    return data.message;
  }

  export async function logout(): Promise<void> {
    await axios.post("/auth/logout");
  }