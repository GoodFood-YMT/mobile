import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const fetchDeleteBasket = async (data: { id: string; quantity: number }) => {
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
  }>("/basket", {
    method: "DELETE",
    json: data,
  });
};

export const useDeleteFromBasket = () => {
  return useMutation({
    mutationFn: (payload: { id: string; quantity: number }) => {
      return fetchDeleteBasket(payload);
    },
  });
};
