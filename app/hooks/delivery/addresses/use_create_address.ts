import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../../utils/basic_fetch";

const fetchCreateAddress = async (data: {
  name: string;
  street: string;
  zip_code: string;
  city: string;
  country: string;
}) => {
  return await apiFetch<{
    name: string;
    street: string;
    zip_code: string;
    city: string;
    country: string;
    id: string;
    user_id: string;
  }>("/delivery/addresses", {
    method: "POST",
    json: data,
  });
};

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: (payload: {
      name: string;
      street: string;
      zip_code: string;
      city: string;
      country: string;
    }) => {
      return fetchCreateAddress(payload);
    },
  });
};
