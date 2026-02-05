import { useMutation } from "@tanstack/react-query";
import { startTimerApi } from "./timelogApi";

export const useStartTimer = () =>
  useMutation({ mutationFn: startTimerApi });
