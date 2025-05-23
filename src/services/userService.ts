import type { User } from "../models/User";
import { getAuthHeaders } from "../utils/getAuthHeaders";
import { notifyError, notifySuccess } from "../utils/notifications";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllUsersService = async () => {
  try {
    const headers = {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    };
    const response = await fetch(`${API_URL}/all/collaborators`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error response:", errorData);
      throw new Error(errorData || "Failed to fetch users");
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorData = await response.text();
      throw new Error(
        `Unexpected content type: ${contentType}. Response: ${errorData}`
      );
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    if (data.allCollaborators) {
      return data.allCollaborators;
    } else {
      throw new Error("Invalid data format: allUsers not found");
    }
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    notifyError({
      title: "Erreur",
      message: "Impossible de récupérer la liste des collaborateurs.",
    });
    throw error;
  }
};

export const fetchUserByIdService = async (id: number) => {
  try {
    const headers = {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_URL}/collaborator/id`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to fetch user with ID ${id}`);
    }

    const data = await response.json();
    return data.collaborator;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de récupérer le collaborateur avec l'ID ${id}.`,
    });
    return null;
  }
};

export const fetchRandomUserService = async () => {
  try {
    const headers = {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_URL}/collaborator/random`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch random user");
    }

    const data = await response.json();
    return data.collaborator;
  } catch (error) {
    console.error("Error fetching random user:", error);
    notifyError({
      title: "Erreur",
      message: "Impossible de récupérer un collaborateur aléatoire.",
    });
    return null;
  }
};

export const createUserService = async (user: Partial<User>) => {
  try {
    const headers = {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    };
    const response = await fetch(`${API_URL}/collaborator/create`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create user");
    }

    const createdUser = await response.json();

    notifySuccess({
      title: "Succès",
      message: "Utilisateur créé avec succès.",
    });

    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    notifyError({
      title: "Erreur",
      message: "Impossible de créer l'utilisateur.",
    });
    throw error;
  }
};

export const updateUserService = async (id: number, user: Partial<User>) => {
  try {
    const headers = {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    };
    const response = await fetch(`${API_URL}/collaborator/update/${id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to update user with ID ${id}`);
    }
    notifySuccess({
      title: "Utilisateur mis à jour",
      message: `L'utilisateur a été mis à jour avec succès`,
    });
    return true;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de mettre à jour le collaborateur avec l'ID ${id}.`,
    });
    return false;
  }
};

export const deleteUserService = async (id: number) => {
  try {
    const headers = {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    };
    const response = await fetch(`${API_URL}/collaborator/delete/${id}`, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to delete user with ID ${id}`);
    }

    notifySuccess({
      title: "Collaborateur supprimé",
      message: `Le collaborateur avec l'ID ${id} a bien été supprimé.`,
    });

    return true;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de supprimer le collaborateur avec l'ID ${id}.`,
    });
    return false;
  }
};
