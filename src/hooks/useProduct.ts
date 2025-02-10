import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  postProduct,
  deleteProduct,
  Product,
} from "../api/productApi";

export type { Product };

// Hook untuk fetch produk
export const useProducts = (limit?: number, sort?: string) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", limit, sort],
    queryFn: () => fetchProducts(limit, sort),
    staleTime: 10000,
    refetchOnWindowFocus: false,
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
