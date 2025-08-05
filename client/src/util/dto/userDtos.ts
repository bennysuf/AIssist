export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  updateProfile(updates: Partial<User>): Promise<void>;
  fetchUser(): Promise<void>;
  resetUser(): void;
};
