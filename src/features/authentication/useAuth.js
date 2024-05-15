import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser as createUserApi,
  forgotPassword as forgotPasswordApi,
  getUser,
  loginUser as loginUserApi,
  logoutUser,
  resetPassword as resetPasswordApi,
  updateUser as updateUserApi,
} from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export function useLogoutUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { logout: logoutAuth } = useAuthContext();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Logout Successful");
      logoutAuth();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout, isLoading };
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createUser } = useMutation({
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

  const { isPending: isLoading, mutate: loginUser } = useMutation({
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

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Users updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateUser };
}

export function useForgotPassword() {
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: forgotPassword } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("A reset email was sent to your email");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, forgotPassword };
}

export function useResetPassword() {
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: resetPassword } = useMutation({
    mutationFn: ({ token, password }) => resetPasswordApi(token, password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("Your password is successfully reset");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, resetPassword };
}
