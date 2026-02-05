import { api } from "../../services/api";

export const getClientsApi = async () =>
  (await api.get("/client")).data;
