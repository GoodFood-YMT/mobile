import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../utils/basic_fetch";

const fetchAllCategories = async () => {
  return await apiFetch<{
    addresses: Array<{
      name: string;
      street: string;
      zip_code: string;
      city: string;
      country: string;
      id: string;
      user_id: string;
    }>;
  }>(`/delivery/addresses`);
};

export const useFetchAllAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: () => {
      return fetchAllCategories();
    },
    keepPreviousData: true,
  });
};
