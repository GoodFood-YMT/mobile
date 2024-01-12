import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../../utils/basic_fetch";

const fetchUpdateAddress = async (
  id: string,
  data: {
    name: string;
    street: string;
    zip_code: string;
    city: string;
    country: string;
  }
) => {
  return await apiFetch<{
    name: string;
    street: string;
    zip_code: string;
    city: string;
    country: string;
    id: string;
    user_id: string;
  }>(`/delivery/addresses/${id}`, {
    method: "PATCH",
    json: data,
  });
};

export const useUpdateAddress = () => {
  return useMutation({
    mutationFn: (payload: {
      id: string;
      data: {
        name: string;
        street: string;
        zip_code: string;
        city: string;
        country: string;
      };
    }) => {
      return fetchUpdateAddress(payload.id, payload.data);
    },
  });
};
