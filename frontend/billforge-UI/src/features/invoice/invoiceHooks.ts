import { useMutation } from "@tanstack/react-query";
import { createInvoiceApi } from "./invoiceApi";

export const useCreateInvoice = () =>
  useMutation({ mutationFn: createInvoiceApi });
