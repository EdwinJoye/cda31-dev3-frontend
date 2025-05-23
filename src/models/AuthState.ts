import type { LoginCredentials } from "./LoginCredentials";
import type { User } from "./User";

export interface AuthState {
  token: string | null;
  timestamp: number | null;
  isAuthenticated: boolean;
  connectedUser: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAndUpdateAuth: () => boolean;
}
