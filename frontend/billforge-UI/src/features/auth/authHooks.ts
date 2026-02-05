import { useMutation } from "@tanstack/react-query";
import { loginApi, signupApi } from "./authApi";

export const useLogin = () =>
  useMutation({ mutationFn: loginApi });

export const useSignup = () =>
  useMutation({ mutationFn: signupApi });
