import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../../utils/basic_fetch";

const fetchClearBasket = async () => {
  return await apiFetch<{}>("/basket/clear", {
    method: "DELETE",
    json: {},
  });
};

export const useClearBasket = () => {
  return useMutation({
    mutationFn: () => {
      return fetchClearBasket();
    },
  });
};
