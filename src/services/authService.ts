import type { LoginCredentials } from "../models/LoginCredentials";
import type { LoginResponse } from "../models/LoginResponse";
import { notifyError, notifySuccess } from "../utils/notifications";

export async function loginService(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
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

    const data: LoginResponse = await response.json();
    notifySuccess({
      title: "Connexion réussie",
      message: `Bienvenue, ${data.user?.email ?? "utilisateur"} !`,
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
