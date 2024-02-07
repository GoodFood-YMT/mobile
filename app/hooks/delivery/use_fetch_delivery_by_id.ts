import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const fetchDeliveryById = async (id: string) => {
  return await apiFetch<{
    id: string;
    status: string;
    address_id: string;
    delivery_id: string;
    deliverer_id: string;
    order_id: string;
    created_at: string;
    updated_at: string;
    address: {
      name: string;
      street: string;
      zip_code: string;
      city: string;
      country: string;
      id: string;
      user_id: string;
    };
  }>(`/delivery/deliveries/${id}`);
};

export const useFetchDeliveryById = (id: string) => {
  return useQuery({
    queryKey: ["delivery-by-id", id],
    queryFn: () => fetchDeliveryById(id),
    keepPreviousData: true,
  });
};
