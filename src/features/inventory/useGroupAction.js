import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGroup as createGroupApi,
  deleteGroup as deleteGroupApi,
  getAllGroups,
  getGroup,
  updateGroup as updateGroupApi,
} from "../../services/apiGroups";
import toast from "react-hot-toast";

export function useGroups() {
  const {
    isLoading,
    data: groups = [],
    error,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
  });

  return { isLoading, groups, error };
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createGroup } = useMutation({
    mutationFn: createGroupApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      toast.success("New Group created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createGroup };
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteGroup } = useMutation({
    mutationFn: deleteGroupApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });

      toast.success("Group deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteGroup };
}

export function useGetGroup(groupId) {
  const enabled = !!groupId;

  const {
    isLoading,
    data: group = [],
    error,
  } = useQuery({
    queryKey: ["groups", groupId],
    queryFn: () => getGroup(groupId),
    enabled,
  });

  return { isLoading, group, error };
}

export function useUpdateGroup() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateGroup } = useMutation({
    mutationFn: ({ newGroupData, id }) => updateGroupApi(newGroupData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
      toast.success("Group updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateGroup };
}
