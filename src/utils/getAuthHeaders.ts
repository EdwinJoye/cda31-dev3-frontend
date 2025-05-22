import { useAuthStore } from "../stores/useAuthStore";

export const getAuthHeaders = () => {
  const { token } = useAuthStore.getState();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
