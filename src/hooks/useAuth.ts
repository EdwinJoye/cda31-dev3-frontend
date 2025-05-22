import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export const useAuth = () => {
  const checkAndUpdateAuth = useAuthStore((state) => state.checkAndUpdateAuth);
  const store = useAuthStore();

  useEffect(() => {
    checkAndUpdateAuth();
  }, [checkAndUpdateAuth]);

  return store;
};
