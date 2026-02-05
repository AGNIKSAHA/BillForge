import { useQuery } from "@tanstack/react-query";
import { getNotificationsApi } from "./notificationApi";

export const useNotifications = () =>
  useQuery({ queryKey: ["notifications"], queryFn: getNotificationsApi });
