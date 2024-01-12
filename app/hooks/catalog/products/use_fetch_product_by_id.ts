import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../utils/basic_fetch";

const fetchProductById = async (id: string) => {
  return await apiFetch<{
    id: string;
    label: string;
    description: string;
    price: number;
    visible: boolean;
    quantity: number;
    categoryId: string | null;
    restaurantId: string | null;
  }>(`/catalog/products/${id}`);
};

export const useFetchProductById = (id: string) => {
  return useQuery({
    queryKey: ["products-by-id", id],
    queryFn: () => fetchProductById(id),
    keepPreviousData: true,
  });
};
