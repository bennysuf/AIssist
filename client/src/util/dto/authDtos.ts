import type { SignupUser } from "./userDtos";

export type AuthState = {
  isLoading: boolean;
  error: string | null;
  isAuth: boolean;
  setIsAuth(param: boolean): void;
  login(email: string, password: string): Promise<boolean>;
  signup(user: SignupUser): Promise<boolean>;
  logout(): void;
};
