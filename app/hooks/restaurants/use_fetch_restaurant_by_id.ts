import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const fetchRestaurantById = async (id: string) => {
  return await apiFetch<{
    id: string;
    name: string;
    enabled: boolean;
    address: string;
    city: string;
    country: string;
    created_at: string;
    updated_at: string;
  }>(`/restaurants/${id}`);
};

export const useFetchRestaurantById = (id: string) => {
  return useQuery({
    queryKey: ["restaurants-by-id", id],
    queryFn: () => fetchRestaurantById(id),
    keepPreviousData: true,
  });
};
