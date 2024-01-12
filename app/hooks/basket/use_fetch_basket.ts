import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const fetchBasket = async () => {
  return await apiFetch<{
    user_id: string;
    items: Array<{
      id: string;
      quantity: number;
      label: string;
      description: string;
      price: number;
      categoryId: string;
      restaurantId: string;
    }>;
  }>(`/basket`);
};

export const useFetchBasket = () => {
  return useQuery({
    queryKey: ["basket"],
    queryFn: () => fetchBasket(),
    keepPreviousData: true,
  });
};
