import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMedicinesToGroup as addMedicinesToGroupApi,
  createMedicine as createMedicineApi,
  deleteMedicine as deleteMedicineApi,
  getAllMedicine,
  getEmptyMedicines,
  getExpiredMedicines,
  getExpiringMedicines,
  getMedicine,
  getMedicinesByGroup,
  getShortageMedicines,
  subtractMedicineQuantity,
  updateMedicine as updateMedicineApi,
} from "../../services/apiMedicines";
import toast from "react-hot-toast";

export function useMedicines() {
  const {
    isLoading,
    data: medicines = [],
    error,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: getAllMedicine,
  });

  return { isLoading, medicines, error };
}

export function useExpiredMedicines() {
  const {
    isLoading,
    data: expired = [],
    error,
  } = useQuery({
    queryKey: ["expired"],
    queryFn: getExpiredMedicines,
  });

  return { isLoading, expired, error };
}

export function useGetMedicine(id) {
  const enabled = !!id;

  const {
    isLoading,
    data: singleMedicine = [],
    error,
  } = useQuery({
    queryKey: ["medicines", id],
    queryFn: () => getMedicine(id),
    enabled,
  });

  return { isLoading, singleMedicine, error };
}

export function useGetMedicinesByGroup(id) {
  const enabled = !!id;

  const {
    isLoading,
    data: medicinesByGroup = [],
    error,
  } = useQuery({
    queryKey: ["medicinesByGroup", id],
    queryFn: () => getMedicinesByGroup(id),
    enabled,
  });

  return { isLoading, medicinesByGroup, error };
}

export function useCreateMedicine() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createMedicine } = useMutation({
    mutationFn: createMedicineApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medicines"],
      });
      toast.success("New Medicine created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createMedicine };
}

export function useUpdateMedicine(id) {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateMedicine } = useMutation({
    mutationFn: ({ newMedicineData, id }) =>
      updateMedicineApi(newMedicineData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medicines"],
      });
      queryClient.invalidateQueries({
        queryKey: ["medicinesByGroup", id],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateMedicine };
}

export function useDeleteMedicine() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteMedicine } = useMutation({
    mutationFn: deleteMedicineApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medicines"],
      });

      toast.success("Medicine deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteMedicine };
}

export function useDeleteExpired() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteExpired } = useMutation({
    mutationFn: deleteMedicineApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expired"],
      });

      toast.success("Expired Medicine deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteExpired };
}

export function useAddMedicinesToGroup(groupId) {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: addMedicinesToGroup } = useMutation({
    mutationFn: addMedicinesToGroupApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medicinesByGroup", groupId],
      });
      toast.success("Medicine added successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, addMedicinesToGroup };
}

export function useSubtractMedicine() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: subtractMedicine } = useMutation({
    mutationFn: (newMedicineData) => subtractMedicineQuantity(newMedicineData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["medicines"],
      });
      toast.success("Medicine updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, subtractMedicine };
}

export function useExpiringMedicines() {
  const {
    isLoading,
    data: expiring = [],
    error,
  } = useQuery({
    queryKey: ["expiring"],
    queryFn: getExpiringMedicines,
  });

  return { isLoading, expiring, error };
}

export function useShortageMedicines() {
  const {
    isLoading,
    data: shortage = [],
    error,
  } = useQuery({
    queryKey: ["shortage"],
    queryFn: getShortageMedicines,
  });

  return { isLoading, shortage, error };
}

export function useEmptyMedicines() {
  const {
    isLoading,
    data: empty = [],
    error,
  } = useQuery({
    queryKey: ["empty"],
    queryFn: getEmptyMedicines,
  });

  return { isLoading, empty, error };
}
