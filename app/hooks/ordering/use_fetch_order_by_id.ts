import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const fetchOrderById = async (id: string) => {
  return await apiFetch<{
    id: string;
    status: string;
    previous_status: string;
    total_price: string;
    user_id: string;
    address_id: string;
    restaurant_id: string;
    delivery_id: string;
    created_at: string;
    updated_at: string;
    products: Array<{
      product_id: string;
      quantity: number;
      price: string;
      label: string;
    }>;
  }>(`/ordering/orders/${id}`);
};

export const useFetchOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order-by-id", id],
    queryFn: () => fetchOrderById(id),
    keepPreviousData: true,
  });
};
