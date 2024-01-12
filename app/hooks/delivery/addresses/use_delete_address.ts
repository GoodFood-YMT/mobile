import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../../utils/basic_fetch";

const fetchDeleteAddress = async (id: string) => {
  return await apiFetch<{
    name: string;
    street: string;
    zip_code: string;
    city: string;
    country: string;
    id: string;
    user_id: string;
  }>(`/delivery/addresses/${id}`, {
    method: "DELETE",
  });
};

export const useDeleteAddress = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return fetchDeleteAddress(id);
    },
  });
};
