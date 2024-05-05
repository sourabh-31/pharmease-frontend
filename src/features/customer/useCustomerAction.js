import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCustomer as createCustomerApi,
  deleteCustomer as deleteCustomerApi,
  getAllCustomer,
  updateCustomer as updateCustomerApi,
} from "../../services/apiCustomer";
import toast from "react-hot-toast";

export function useCustomers() {
  const {
    isLoading,
    data: customers = [],
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomer,
  });

  return { isLoading, customers, error };
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCustomer } = useMutation({
    mutationFn: createCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      toast.success("New Customer created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCustomer };
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCustomer } = useMutation({
    mutationFn: ({ newCustomerData, id }) =>
      updateCustomerApi(newCustomerData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateCustomer };
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCustomer } = useMutation({
    mutationFn: deleteCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      toast.success("Customer deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCustomer };
}
