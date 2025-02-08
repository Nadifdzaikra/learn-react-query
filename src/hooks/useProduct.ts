import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  postProduct,
  deleteProduct,
  Product,
} from "../api/productApi";

export type { Product };

// Hook untuk fetch produk
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 10000,
  });
};

// Hook untuk tambah produk
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refresh data setelah POST
    },
  });
};

// Hook untuk hapus produk
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refresh data setelah DELETE
    },
  });
};
