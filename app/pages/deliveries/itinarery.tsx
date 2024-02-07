import { styled } from "nativewind";
import React from "react";
import { View, Text, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-native";
import { useFetchDeliveryById } from "../../hooks/delivery/use_fetch_delivery_by_id";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export function ItinareryPage() {
  const { deliveryId } = useParams();
  const navigate = useNavigate();

  const delivery = useFetchDeliveryById(deliveryId ?? "");

  function handleBack() {
    navigate(`/deliveries/${deliveryId}`);
  }

  function handleComplete() {
    navigate(`/deliveries/${deliveryId}/camera`);
  }

  return (
    <StyledView className="relative h-screen w-screen">
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: delivery.data?.address.lat ?? 37.78825,
          longitude: delivery.data?.address.lon ?? -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        style={{ alignSelf: "stretch", height: "100%" }}
      />
      <StyledView className="absolute w-screen pt-20 px-8 pb-6 bg-white">
        <StyledPressable
          onPress={handleBack}
          className="flex flex-row items-center"
        >
          <Icon name="arrow-left" size={16} color="black" />
          <StyledText className="text-black text-sm ml-2">Back</StyledText>
        </StyledPressable>
        <StyledView className="mt-4 border border-border p-2">
          <StyledText className="text-xs">
            {delivery.data?.address.street}, {delivery.data?.address.zip_code}{" "}
            {delivery.data?.address.city}, {delivery.data?.address.country}
          </StyledText>
        </StyledView>
      </StyledView>
      <StyledView className="absolute bottom-0 w-screen p-8">
        <Button title="Complete delivery" onPress={handleComplete} />
      </StyledView>
    </StyledView>
  );
}
