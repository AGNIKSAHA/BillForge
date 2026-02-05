import { api } from "../../services/api";

export const getProjectsApi = async () =>
  (await api.get("/project")).data;
