import type { Assistant } from "./assistantDto";

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  assistants: Assistant[] | [];
};

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  updateProfile(updates: Partial<User>): Promise<boolean>;
  fetchUser(): Promise<void>;
  resetUser(): void;
};

export type SignupUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

