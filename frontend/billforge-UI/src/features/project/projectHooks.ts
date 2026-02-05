import { useQuery } from "@tanstack/react-query";
import { getProjectsApi } from "./projectApi";

export const useProjects = () =>
  useQuery({ queryKey: ["projects"], queryFn: getProjectsApi });
