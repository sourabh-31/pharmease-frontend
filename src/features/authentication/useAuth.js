import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser as createUserApi,
  getUser,
  loginUser as loginUserApi,
  logoutUser,
} from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createUser } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("Registered successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createUser };
}

export function useLoginUser() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: loginUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("Login successful");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, loginUser };
}

export function useUser() {
  const {
    isLoading,
    data: user = [],
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  return { isLoading, user, error };
}

export function useLogoutUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Logout Successful");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isLoading };
}
