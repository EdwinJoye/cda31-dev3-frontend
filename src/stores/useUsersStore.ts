import { create } from "zustand";
import type { User } from "../models/User";
import {
  fetchAllCollaborators,
  fetchCollaboratorById,
  fetchCollaboratorByEmail,
  fetchRandomCollaborator,
  fetchCollaboratorsByCategory,
  fetchCollaboratorsByName,
  filterCollaboratorsByText,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator,
} from "../services/collaboratorService";

interface CollaboratorState {
  collaborators: User[];
  selectedCollaborator: User | null;
  loading: boolean;
  error: string | null;

  // Setters
  setCollaborators: (collaborators: User[]) => void;
  setSelectedCollaborator: (collaborator: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // API Methods
  fetchAllCollaborators: () => Promise<void>;
  fetchCollaboratorById: (id: number) => Promise<void>;
  fetchCollaboratorByEmail: (email: string) => Promise<void>;
  fetchRandomCollaborator: () => Promise<void>;
  fetchCollaboratorsByCategory: (category: string) => Promise<void>;
  fetchCollaboratorsByName: (name: string) => Promise<void>;
  filterCollaboratorsByText: (text: string) => Promise<void>;
  createCollaborator: (collaborator: Partial<User>) => Promise<void>;
  updateCollaborator: (
    id: number,
    collaborator: Partial<User>
  ) => Promise<void>;
  deleteCollaborator: (id: number) => Promise<void>;
}

const useCollaboratorsStore = create<CollaboratorState>((set, get) => ({
  collaborators: [],
  selectedCollaborator: null,
  loading: false,
  error: null,

  // Setters
  setCollaborators: (collaborators) => set({ collaborators }),
  setSelectedCollaborator: (collaborator) =>
    set({ selectedCollaborator: collaborator }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // API Methods
  fetchAllCollaborators: async () => {
    try {
      set({ loading: true, error: null });
      const collaborators = await fetchAllCollaborators();
      set({ collaborators, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  fetchCollaboratorById: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const collaborator = await fetchCollaboratorById(id);
      set({ selectedCollaborator: collaborator, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  fetchCollaboratorByEmail: async (email: string) => {
    try {
      set({ loading: true, error: null });
      const collaborator = await fetchCollaboratorByEmail(email);
      set({ selectedCollaborator: collaborator, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  fetchRandomCollaborator: async () => {
    try {
      set({ loading: true, error: null });
      const collaborator = await fetchRandomCollaborator();
      set({ selectedCollaborator: collaborator, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  fetchCollaboratorsByCategory: async (category: string) => {
    try {
      set({ loading: true, error: null });
      const collaborators = await fetchCollaboratorsByCategory(category);
      set({ collaborators, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  fetchCollaboratorsByName: async (name: string) => {
    try {
      set({ loading: true, error: null });
      const collaborators = await fetchCollaboratorsByName(name);
      set({ collaborators, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  filterCollaboratorsByText: async (text: string) => {
    try {
      set({ loading: true, error: null });
      const collaborators = await filterCollaboratorsByText(text);
      set({ collaborators, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  createCollaborator: async (collaborator: Partial<User>) => {
    try {
      set({ loading: true, error: null });
      const success = await createCollaborator(collaborator);
      if (success) {
        await get().fetchAllCollaborators();
      }
      set({ loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  updateCollaborator: async (id: number, collaborator: Partial<User>) => {
    try {
      set({ loading: true, error: null });
      const success = await updateCollaborator(id, collaborator);
      if (success) {
        const currentCollaborators = get().collaborators;
        const updatedCollaborators = currentCollaborators.map((c) =>
          c.id === id ? { ...c, ...collaborator } : c
        );
        set({ collaborators: updatedCollaborators, loading: false });

        const selectedCollaborator = get().selectedCollaborator;
        if (selectedCollaborator && selectedCollaborator.id === id) {
          set({
            selectedCollaborator: { ...selectedCollaborator, ...collaborator },
          });
        }
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },

  deleteCollaborator: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const success = await deleteCollaborator(id);
      if (success) {
        const currentCollaborators = get().collaborators;
        const updatedCollaborators = currentCollaborators.filter(
          (c) => c.id !== id
        );

        const selectedCollaborator = get().selectedCollaborator;
        if (selectedCollaborator && selectedCollaborator.id === id) {
          set({ selectedCollaborator: null });
        }

        set({ collaborators: updatedCollaborators, loading: false });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      });
    }
  },
}));

export default useCollaboratorsStore;
