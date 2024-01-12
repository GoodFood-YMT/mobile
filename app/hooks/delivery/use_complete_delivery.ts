import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const completeDelivery = (id: string) => {
  return apiFetch<{}>(`/delivery/deliveries/${id}/complete`, {
    method: "POST",
  });
};

export const useCompleteDelivery = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return completeDelivery(id);
    },
  });
};
