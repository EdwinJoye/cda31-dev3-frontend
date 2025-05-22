import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginService } from "../services/authService";
import type { AuthState } from "../models/AuthState";
import type { LoginCredentials } from "../models/LoginCredentials";

const EXPIRATION_TIME = 30 * 60 * 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      timestamp: null,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        const data = await loginService(credentials);
        const now = Date.now();

        set({
          token: data.token,
          timestamp: now,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: null,
          timestamp: null,
          isAuthenticated: false,
        });
      },

      checkAndUpdateAuth: () => {
        const state = get();

        if (
          state.isAuthenticated &&
          state.timestamp &&
          Date.now() - state.timestamp > EXPIRATION_TIME
        ) {
          set({
            token: null,
            timestamp: null,
            isAuthenticated: false,
          });
          return false;
        }

        return state.isAuthenticated;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        timestamp: state.timestamp,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
