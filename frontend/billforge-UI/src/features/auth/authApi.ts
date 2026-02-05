import { api } from "../../services/api";

export const loginApi = async (data: any) =>
  (await api.post("/auth/login", data)).data;

export const signupApi = async (data: any) =>
  (await api.post("/auth/signup", data)).data;
