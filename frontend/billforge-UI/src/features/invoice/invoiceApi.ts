import { api } from "../../services/api";

export const createInvoiceApi = async (projectId: string) =>
  (await api.post("/invoice", { projectId })).data;
