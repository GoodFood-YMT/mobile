import { useNavigate, useParams } from "react-router-native";
import { PageTitle } from "../../components/page_title";
import { PageWrapper } from "../../components/page_wrapper";
import { View, Text } from "react-native";
import { styled } from "nativewind";
import { useFetchDeliveryById } from "../../hooks/delivery/use_fetch_delivery_by_id";
import { useFetchOrderById } from "../../hooks/ordering/use_fetch_order_by_id";
import { OrderProducts } from "../../components/products/order_products";
import { Button } from "../../components/ui/button";
import { useTakeDelivery } from "../../hooks/delivery/use_take_delivery";
import { useCompleteDelivery } from "../../hooks/delivery/use_complete_delivery";
import Toast from "react-native-toast-message";
import { useAccountStore } from "../../stores/account_store";
import { Loader } from "../../components/loader";

const StyledView = styled(View);
const StyledText = styled(Text);

export function OneDelivery() {
  const { deliveryId } = useParams();
  const accountStore = useAccountStore();
  const navigate = useNavigate();

  const delivery = useFetchDeliveryById(deliveryId ?? "");
  const order = useFetchOrderById(delivery.data?.order_id ?? "");

  const takeDelivery = useTakeDelivery();
  const completeDelivery = useCompleteDelivery();

  const handleTakeDelivery = () => {
    if (!deliveryId) return;

    takeDelivery.mutate(deliveryId, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Delivery taken",
          visibilityTime: 3000,
          autoHide: true,
        });
        delivery.refetch();
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "An error occurred",
          visibilityTime: 3000,
          autoHide: true,
        });
      },
    });
  };

  const handleCompleteDelivery = () => {
    if (!deliveryId) return;

    navigate(`/deliveries/${deliveryId}/camera`);
  };

  if (delivery.isLoading || order.isLoading) {
    return (
      <PageWrapper>
        <PageTitle>Delivery</PageTitle>
        <Loader />
      </PageWrapper>
    );
  }

  if (delivery.isError || order.isError) {
    return (
      <PageWrapper>
        <PageTitle>Delivery</PageTitle>

        <StyledView className="bg-white p-4 shadow-sm">
          <StyledView className="flex h-full w-full flex-col items-center justify-center gap-2">
            <StyledText className="text-center text-lg font-medium">
              Something went wrong
            </StyledText>
            <StyledText className="max-w-[60%] text-center text-xs opacity-60">
              Could not load your delivery. Please try again later.
            </StyledText>
          </StyledView>
        </StyledView>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageTitle>
        Delivery <StyledText className="text-sm">#{deliveryId}</StyledText>
      </PageTitle>

      <StyledView className="flex flex-row justify-between">
        <StyledText></StyledText>
        <StyledText className="capitalize mb-4 bg-orange-400 px-2 py-1 rounded-full text-white">
          {delivery.data?.status}
        </StyledText>
      </StyledView>

      <StyledView className="bg-white p-4 shadow-sm mb-2">
        <StyledText className="font-bold text-lg mb-2">Address</StyledText>
        <StyledText>
          {delivery.data?.address.street}, {delivery.data?.address.zip_code}{" "}
          {delivery.data?.address.city}, {delivery.data?.address.country}
        </StyledText>
      </StyledView>

      {order.data && order.data.products ? (
        <OrderProducts order={order.data} />
      ) : null}

      {delivery.data?.status === "pending" && (
        <Button
          className="mt-4"
          title="Take delivery"
          onPress={handleTakeDelivery}
        />
      )}

      {delivery.data?.status === "delivering" &&
      accountStore.account?.id === delivery.data.deliverer_id ? (
        <Button
          className="mt-4"
          title="Mark as delivered"
          onPress={handleCompleteDelivery}
        />
      ) : null}
    </PageWrapper>
  );
}
