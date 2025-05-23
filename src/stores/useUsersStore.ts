import { create } from "zustand";
import type { User } from "../models/User";
import {
  createUserService,
  deleteUserService,
  fetchAllUsersService,
  fetchRandomUserService,
  fetchUserByIdService,
  updateUserService,
} from "../services/userService";
import { useAuthStore } from "./useAuthStore";

interface UserState {
  users: User[];
  selectedUser: User | null;
  lastRandomUser: User | null;
  loading: boolean;
  error: string | null;

  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  fetchAllUsers: () => Promise<User[]>;
  fetchUserById: (id: number) => Promise<User | null>;
  fetchRandomUser: () => Promise<User | null>;
  createUser: (user: Partial<User>) => Promise<User>;
  updateUser: (id: number, user: Partial<User>) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
}

const useUsersStore = create<UserState>((set, get) => ({
  users: [],
  selectedUser: null,
  lastRandomUser: null,
  loading: false,
  error: null,

  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchAllUsers: async () => {
    try {
      set({ loading: true, error: null });
      const users = await fetchAllUsersService();
      users.sort((a: User, b: User) => a.id - b.id);
      const reversedUsers = users.slice().reverse();
      set({ users: reversedUsers, loading: false });
      return reversedUsers;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
      return [];
    }
  },

  fetchUserById: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const user = await fetchUserByIdService(id);
      set({ selectedUser: user, loading: false });
      return user;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
      return null;
    }
  },

  fetchRandomUser: async () => {
    const MAX_ATTEMPTS = 10;
    let attempts = 0;

    try {
      set({ loading: true, error: null });

      const connectedUser = useAuthStore.getState().connectedUser;
      const lastRandomUser = get().lastRandomUser;
      let randomUser: User | null = null;

      while (attempts < MAX_ATTEMPTS) {
        randomUser = await fetchRandomUserService();

        if (!randomUser) {
          break;
        }

        const isConnectedUser =
          connectedUser && randomUser.id === connectedUser.id;
        const isSameAsLast =
          lastRandomUser && randomUser.id === lastRandomUser.id;

        if (!isConnectedUser && !isSameAsLast) {
          break;
        }

        attempts++;
      }

      if (randomUser) {
        set({
          selectedUser: randomUser,
          lastRandomUser: randomUser,
          loading: false,
        });
      } else {
        set({ loading: false });
      }

      return randomUser;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
      return null;
    }
  },

  createUser: async (user) => {
    try {
      set({ loading: true, error: null });

      const { collaborateur } = await createUserService(user);

      if (collaborateur) {
        await get().fetchAllUsers();
      }

      set({ loading: false });

      return collaborateur;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
      throw error;
    }
  },

  updateUser: async (id: number, user: Partial<User>) => {
    try {
      set({ loading: true, error: null });
      const success = await updateUserService(id, user);
      if (success) {
        const currentUsers = get().users;
        const updatedUsers = currentUsers.map((c) =>
          c.id === id ? { ...c, ...user } : c
        );
        set({ users: updatedUsers });

        const selectedUser = get().selectedUser;
        if (selectedUser && selectedUser.id === id) {
          set({
            selectedUser: { ...selectedUser, ...user },
          });
        }
      }
      set({ loading: false });
      return success;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
      return false;
    }
  },

  deleteUser: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const success = await deleteUserService(id);

      if (success) {
        const currentUsers = get().users;
        const updatedUsers = currentUsers.filter((c) => c.id !== id);

        const selectedUser = get().selectedUser;
        if (selectedUser && selectedUser.id === id) {
          set({ selectedUser: null });
        }

        set({ users: updatedUsers });
      }

      set({ loading: false });
      return success;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
      return false;
    }
  },
}));

export default useUsersStore;
