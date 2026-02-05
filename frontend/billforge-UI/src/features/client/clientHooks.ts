import { useQuery } from "@tanstack/react-query";
import { getClientsApi } from "./clientApi";

export const useClients = () =>
  useQuery({ queryKey: ["clients"], queryFn: getClientsApi });
