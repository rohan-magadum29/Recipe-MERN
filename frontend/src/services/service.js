import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpClient from "../helper/httpClient";
import { useNavigate } from "react-router-dom";

export const useGetRecipes = (filter) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["recipes", filter],
    queryFn: () => httpClient(`/api/recipes?search=${filter}`),
    placeholderData: (previousData) => previousData,
  });
  return { data, isLoading, isFetching };
};
export const useGetRecipesById = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["recipes", id],
    queryFn: () => httpClient(`/api/recipes/${id}`),
    enabled: !!id,
  });
  return { data, isLoading };
};

export const useCreateRecipe = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, data, isPending } = useMutation({
    mutationFn: (payload) => {
      return httpClient("/api/recipes", {
        data: payload,
        method: "POST",
      });
    },
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries(["recipes"]);
        navigate("/");
      }
    },
  });
  return { mutate, data, isPending };
};
export const useUpdateRecipe = (id) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, data, isPending } = useMutation({
    mutationFn: (payload) => {
      return httpClient(`/api/recipes/${id}`, {
        data: payload,
        method: "PUT",
      });
    },
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries(["recipes"]);
        navigate("/");
      }
    },
  });
  return { mutate, data, isPending };
};
export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id) => {
      return httpClient(`/api/recipes/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries(["recipes"]);
      }
    },
  });
  return { mutate, isPending };
};
export const useUploadFile = () => {
  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: (payload) => {
      return httpClient("/api/recipes/uploadFile", {
        data: payload,
        method: "POST",
      });
    },
  });
  return { mutateAsync, data, isPending };
};
