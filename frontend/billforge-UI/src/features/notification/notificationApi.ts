import { api } from "../../services/api";

export const getNotificationsApi = async () =>
  (await api.get("/notification")).data;
