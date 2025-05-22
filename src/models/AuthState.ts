import type { LoginCredentials } from "./LoginCredentials";

export interface AuthState {
  token: string | null;
  timestamp: number | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAndUpdateAuth: () => boolean;
}
