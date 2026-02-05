import { useAuth } from "./useAuth";

export const useRole = () => {
  const { user } = useAuth();

  return {
    role: user?.role ?? null,
    isAdmin: user?.role === "admin",
    isClient: user?.role === "client",
    isFreelancer: user?.role === "freelancer"
  };
};
