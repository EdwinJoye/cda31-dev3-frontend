import type { LoginCredentials } from "../models/LoginCredentials";
import type { LoginResponse } from "../models/LoginResponse";
import type { LoginCheckResponse } from "../models/LoginCheckResponse";
import { notifyError, notifySuccess } from "../utils/notifications";

export async function loginService(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || "Identifiants invalides.";
      notifyError({ title: "Échec de la connexion", message: errorMessage });
      throw new Error(errorMessage);
    }

    const data = await response.json();

    console.log("Réponse loginService :", data);

    if (!data) {
      throw new Error("La réponse du serveur ne contient pas d'utilisateur.");
    }

    notifySuccess({
      title: "Connexion réussie",
      message: `Bienvenue, ${data.email ?? "utilisateur"} !`,
    });

    return { user: data };
  } catch (err: unknown) {
    const message =
      err &&
      typeof err === "object" &&
      "message" in err &&
      typeof err.message === "string"
        ? err.message
        : "Impossible de contacter le serveur";

    if (!message.includes("Échec de la connexion")) {
      notifyError({ title: "Erreur réseau", message });
    }

    throw err;
  }
}

export async function loginCheckService(
  credentials: LoginCredentials
): Promise<LoginCheckResponse> {
  try {
    const response = await fetch(import.meta.env.VITE_LOGIN_CHECK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      notifyError({
        title: "Échec de la connexion",
        message: error.message || "Identifiants invalides.",
      });
      throw new Error(error.message || "Erreur de connexion");
    }

    const data: LoginCheckResponse = await response.json();

    notifySuccess({
      title: "Connexion réussie",
      message: `Token reçu`,
    });

    return data;
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message?: unknown }).message === "string"
    ) {
      const message = (err as { message: string }).message;
      if (!message.includes("Échec de la connexion")) {
        notifyError({
          title: "Erreur réseau",
          message: message || "Impossible de contacter le serveur",
        });
      }
    } else {
      notifyError({
        title: "Erreur réseau",
        message: "Impossible de contacter le serveur",
      });
    }
    throw err;
  }
}
