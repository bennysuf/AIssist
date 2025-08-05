import type { User } from "./userDtos";

export type AuthState = {
  isLoading: boolean;
  error: string | null;
  isAuth: boolean;
  setIsAuth(param: boolean): void;
  login(email: string, password: string): Promise<boolean>;
  signup(
    user: User,
    password: string,
    passwordConfirmation: string
  ): Promise<void>;
  logout(): void;
};
