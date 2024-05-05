import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInvoice as createInvoiceApi,
  getAllInvoices,
} from "../../services/apiInvoices";
import toast from "react-hot-toast";

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createInvoice } = useMutation({
    mutationFn: createInvoiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
      toast.success("New Invoice created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createInvoice };
}

export function useInvoices() {
  const {
    isLoading,
    data: invoices = [],
    error,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
  });

  return { isLoading, invoices, error };
}
