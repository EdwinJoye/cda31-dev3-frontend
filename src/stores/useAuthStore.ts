import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginCheckService, loginService } from "../services/authService";
import type { AuthState } from "../models/AuthState";
import type { LoginCredentials } from "../models/LoginCredentials";

const EXPIRATION_TIME = 30 * 60 * 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      timestamp: null,
      isAuthenticated: false,
      connectedUser: null,

      login: async (credentials: LoginCredentials) => {
        try {
          const userData = await loginService(credentials);
          const tokenData = await loginCheckService(credentials);

          const now = Date.now();

          set({
            token: tokenData.token,
            timestamp: now,
            isAuthenticated: true,
            connectedUser: userData.user,
          });
        } catch (error) {
          console.error("Erreur lors de la connexion :", error);
          throw error;
        }
      },

      logout: () => {
        set({
          token: null,
          timestamp: null,
          isAuthenticated: false,
          connectedUser: null,
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
            connectedUser: null,
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
        connectedUser: state.connectedUser,
      }),
    }
  )
);
