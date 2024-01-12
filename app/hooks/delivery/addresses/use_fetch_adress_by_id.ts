import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../utils/basic_fetch";

const fetchAddressById = async (id: string) => {
  return await apiFetch<{
    name: string;
    street: string;
    zip_code: string;
    city: string;
    country: string;
    id: string;
    user_id: string;
  }>(`/delivery/addresses/${id}`, {
    method: "GET",
  });
};

export const useFetchAddressById = (id?: string) => {
  return useQuery({
    queryKey: ["address-by-id", id],
    queryFn: () => {
      if (id) {
        return fetchAddressById(id);
      }

      return Promise.resolve(null);
    },
    keepPreviousData: true,
  });
};
