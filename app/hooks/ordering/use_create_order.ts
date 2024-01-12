import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const fetchCreateOrder = async (data: {
  addressId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}) => {
  return await apiFetch<{
    id: string;
    user_id: string;
    address_id: string;
    restaurant_id: string;
    total_price: number;
    status: string;
    previous_status: string;
    created_at: string;
    updated_at: string;
  }>(`/ordering/orders`, {
    method: "POST",
    json: data,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (payload: {
      addressId: string;
      products: Array<{
        productId: string;
        quantity: number;
      }>;
    }) => {
      return fetchCreateOrder(payload);
    },
  });
};
