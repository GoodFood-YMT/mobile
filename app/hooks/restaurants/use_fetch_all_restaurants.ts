import { useInfiniteQuery } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const fetchAllRestaurants = async (page: number, limit: number, q: string) => {
  return await apiFetch<{
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      first_page: number;
      first_page_url: string;
      last_page_url: string;
      next_page_url: string | null;
      previous_page_url: string | null;
    };
    data: Array<{
      id: string;
      name: string;
      enabled: boolean;
      address: string;
      city: string;
      country: string;
      created_at: string;
      updated_at: string;
    }>;
  }>(`/restaurants?page=${page}&limit=${limit}&q=${q}`);
};

export const useFetchAllRestaurants = (
  page: number = 1,
  limit: number = 10,
  q: string = ""
) => {
  return useInfiniteQuery({
    queryKey: ["restaurants", page, limit, q],
    queryFn: ({ pageParam }) => {
      return fetchAllRestaurants(pageParam ?? page, limit, q);
    },
    getNextPageParam: (result) => {
      if (result.meta.current_page < result.meta.last_page) {
        return result.meta.current_page + 1;
      }
      return undefined;
    },
    keepPreviousData: true,
  });
};
