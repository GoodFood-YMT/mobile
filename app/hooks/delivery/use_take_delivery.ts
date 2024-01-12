import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const takeDelivery = (id: string) => {
  return apiFetch<{}>(`/delivery/deliveries/${id}/take`, {
    method: "POST",
  });
};

export const useTakeDelivery = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return takeDelivery(id);
    },
  });
};
