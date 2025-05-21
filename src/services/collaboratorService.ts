import type { User } from "../models/User";
import { notifyError } from "../utils/notifications";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllCollaborators = async () => {
  try {
    const response = await fetch(`${API_URL}/all/collaborators`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.log(`REQUETE : ${API_URL}/all/collaborators`);
      const errorData = await response.text();
      console.error("Error response:", errorData);
      throw new Error(errorData || "Failed to fetch collaborators");
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
      throw new Error("Invalid data format: allCollaborators not found");
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

export const fetchCollaboratorById = async (id: number) => {
  try {
    const formData = new FormData();
    formData.append("id", id.toString());

    const response = await fetch(`${API_URL}/collaborator/id`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to fetch collaborator with ID ${id}`
      );
    }

    const data = await response.json();
    return data.collaborator;
  } catch (error) {
    console.error(`Error fetching collaborator with ID ${id}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de récupérer le collaborateur avec l'ID ${id}.`,
    });
    return null;
  }
};

export const fetchCollaboratorByEmail = async (email: string) => {
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
        errorData.error || `Failed to fetch collaborator with email ${email}`
      );
    }

    const data = await response.json();
    return data.collaborator;
  } catch (error) {
    console.error(`Error fetching collaborator with email ${email}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de récupérer le collaborateur avec l'email ${email}.`,
    });
    return null;
  }
};

export const fetchRandomCollaborator = async () => {
  try {
    const response = await fetch(`${API_URL}/collaborator/random`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch random collaborator");
    }

    const data = await response.json();
    return data.collaborator;
  } catch (error) {
    console.error("Error fetching random collaborator:", error);
    notifyError({
      title: "Erreur",
      message: "Impossible de récupérer un collaborateur aléatoire.",
    });
    return null;
  }
};

export const fetchCollaboratorsByCategory = async (category: string) => {
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
        errorData.error ||
          `Failed to fetch collaborators in category ${category}`
      );
    }

    const data = await response.json();
    return data.collaborators;
  } catch (error) {
    console.error(
      `Error fetching collaborators in category ${category}:`,
      error
    );
    notifyError({
      title: "Erreur",
      message: `Impossible de récupérer les collaborateurs de la catégorie ${category}.`,
    });
    return [];
  }
};

export const fetchCollaboratorsByName = async (name: string) => {
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
        errorData.error || `Failed to fetch collaborators with name ${name}`
      );
    }

    const data = await response.json();
    return data.collaborators;
  } catch (error) {
    console.error(`Error fetching collaborators with name ${name}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de récupérer les collaborateurs avec le nom ${name}.`,
    });
    return [];
  }
};

export const filterCollaboratorsByText = async (text: string) => {
  try {
    const response = await fetch(`${API_URL}/collaborators/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to filter collaborators with text ${text}`
      );
    }

    const data = await response.json();
    return data.collaborators;
  } catch (error) {
    console.error(`Error filtering collaborators with text ${text}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de filtrer les collaborateurs avec le texte "${text}".`,
    });
    return [];
  }
};

export const createCollaborator = async (collaborator: Partial<User>) => {
  try {
    const response = await fetch(`${API_URL}/collaborator`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collaborator),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create collaborator");
    }

    return true;
  } catch (error) {
    console.error("Error creating collaborator:", error);
    notifyError({
      title: "Erreur",
      message: "Impossible de créer le collaborateur.",
    });
    return false;
  }
};

export const updateCollaborator = async (
  id: number,
  collaborator: Partial<User>
) => {
  try {
    const response = await fetch(`${API_URL}/collaborator/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collaborator),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to update collaborator with ID ${id}`
      );
    }

    return true;
  } catch (error) {
    console.error(`Error updating collaborator with ID ${id}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de mettre à jour le collaborateur avec l'ID ${id}.`,
    });
    return false;
  }
};

export const deleteCollaborator = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/collaborator/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to delete collaborator with ID ${id}`
      );
    }

    return true;
  } catch (error) {
    console.error(`Error deleting collaborator with ID ${id}:`, error);
    notifyError({
      title: "Erreur",
      message: `Impossible de supprimer le collaborateur avec l'ID ${id}.`,
    });
    return false;
  }
};
