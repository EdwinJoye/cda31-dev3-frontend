import type { User } from "../models/User";
import { notifyError, notifySuccess } from "../utils/notifications";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllUsersService = async () => {
  try {
    const response = await fetch(`${API_URL}/all/collaborators`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    const formData = new FormData();
    formData.append("id", id.toString());

    const response = await fetch(`${API_URL}/collaborator/id`, {
      method: "POST",
      body: formData,
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

export const fetchUserByEmailService = async (email: string) => {
  try {
    const formData = new FormData();
    formData.append("email", email);

    const response = await fetch(`${API_URL}/collaborator/email`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to fetch user with email ${email}`
      );
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de récupérer le collaborateur avec l'email ${email}.`,
    });
    return null;
  }
};

export const fetchRandomUserService = async () => {
  try {
    const response = await fetch(`${API_URL}/collaborator/random`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch random user");
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching random user:", error);
    notifyError({
      title: "Erreur",
      message: "Impossible de récupérer un collaborateur aléatoire.",
    });
    return null;
  }
};

export const fetchUsersByCategoryService = async (category: string) => {
  try {
    const formData = new FormData();
    formData.append("category", category);

    const response = await fetch(`${API_URL}/collaborators/category`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to fetch user in category ${category}`
      );
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error(`Error fetching user in category ${category}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de récupérer les utilisateurs de la catégorie ${category}.`,
    });
    return [];
  }
};

export const fetchUsersByNameService = async (name: string) => {
  try {
    const formData = new FormData();
    formData.append("name", name);

    const response = await fetch(`${API_URL}/collaborators/name`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to fetch users with name ${name}`
      );
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error(`Error fetching users with name ${name}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de récupérer les collaborateurs avec le nom ${name}.`,
    });
    return [];
  }
};

export const filterUsersByTextService = async (text: string) => {
  try {
    const response = await fetch(`${API_URL}/collaborators/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to filter users with text ${text}`
      );
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error(`Error filtering users with text ${text}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de filtrer les collaborateurs avec le texte "${text}".`,
    });
    return [];
  }
};

export const createUserService = async (user: Partial<User>) => {
  try {
    const response = await fetch(`${API_URL}/collaborator`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create user");
    }

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    notifyError({
      title: "Erreur",
      message: "Impossible de créer l'utilisateur.",
    });
    return false;
  }
};

export const updateUserService = async (id: number, user: Partial<User>) => {
  try {
    const response = await fetch(`${API_URL}/collaborator/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to update user with ID ${id}`);
    }

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
    const response = await fetch(`${API_URL}/collaborator/delete/${id}`, {
      method: "DELETE",
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
