import { api } from "../../services/api";

export const startTimerApi = async (projectId: string) =>
  (await api.post("/timelog/start", { projectId })).data;
