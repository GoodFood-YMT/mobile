import { styled } from "nativewind";
import { View, Text } from "react-native";
import { useFetchDeliveryById } from "../hooks/delivery/use_fetch_delivery_by_id";

interface DeliveryInformationProps {
  deliveryId: string;
}

const StyledView = styled(View);
const StyledText = styled(Text);

export function DeliveryInformation({ deliveryId }: DeliveryInformationProps) {
  const delivery = useFetchDeliveryById(deliveryId);

  return (
    <StyledView className="bg-white p-4 shadow-sm mb-2">
      <StyledText className="text-lg font-medium tracking-tight mb-2">
        Delivery
      </StyledText>
      <StyledView className="flex flex-row mb-1">
        <StyledText className="font-medium w-[100px]">Status</StyledText>
        <StyledText className="capitalize">{delivery.data?.status}</StyledText>
      </StyledView>
      <StyledView className="flex flex-row mb-1">
        <StyledText className="font-medium w-[100px]">Address</StyledText>
        <StyledText>
          {delivery.data?.address.street}
          {"\n"}
          {delivery.data?.address.zip_code} {delivery.data?.address.city}
          {"\n"}
          {delivery.data?.address.country}
        </StyledText>
      </StyledView>
    </StyledView>
  );
}
