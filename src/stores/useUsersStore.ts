import { create } from "zustand";
import type { User } from "../models/User";
import {
  fetchAllUsersService,
  fetchUserByIdService,
  fetchUserByEmailService,
  fetchRandomUserService,
  fetchUsersByCategoryService,
  fetchUsersByNameService,
  filterUsersByTextService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService";

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;

  // Setters
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // API Methods
  fetchAllUsers: () => Promise<User[]>;
  fetchUserById: (id: number) => Promise<User | null>;
  fetchUserByEmail: (email: string) => Promise<User | null>;
  fetchRandomUser: () => Promise<User | null>;
  fetchUsersByCategory: (category: string) => Promise<User[]>;
  fetchUsersByName: (name: string) => Promise<User[]>;
  filterUsersByText: (text: string) => Promise<User[]>;
  createUser: (user: Partial<User>) => Promise<boolean>;
  updateUser: (id: number, user: Partial<User>) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
}

const useUsersStore = create<UserState>((set, get) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  // Setters
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // API Methods
  fetchAllUsers: async () => {
    try {
      set({ loading: true, error: null });
      const users = await fetchAllUsersService();
      set({ users, loading: false });
      return users;
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

  fetchUserByEmail: async (email: string) => {
    try {
      set({ loading: true, error: null });
      const user = await fetchUserByEmailService(email);
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
    try {
      set({ loading: true, error: null });
      const user = await fetchRandomUserService();
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

  fetchUsersByCategory: async (category: string) => {
    try {
      set({ loading: true, error: null });
      const users = await fetchUsersByCategoryService(category);
      set({ users, loading: false });
      return users;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
      return [];
    }
  },

  fetchUsersByName: async (name: string) => {
    try {
      set({ loading: true, error: null });
      const users = await fetchUsersByNameService(name);
      set({ users, loading: false });
      return users;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
      return [];
    }
  },

  filterUsersByText: async (text: string) => {
    try {
      set({ loading: true, error: null });
      const users = await filterUsersByTextService(text);
      set({ users, loading: false });
      return users;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
      return [];
    }
  },

  createUser: async (user: Partial<User>) => {
    try {
      set({ loading: true, error: null });
      const success = await createUserService(user);
      if (success) {
        await get().fetchAllUsers();
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
