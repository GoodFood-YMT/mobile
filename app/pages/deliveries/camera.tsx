import { styled } from "nativewind";
import { ImageBackground, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { Button } from "../../components/ui/button";
import { useCompleteDelivery } from "../../hooks/delivery/use_complete_delivery";
import Toast from "react-native-toast-message";

const StyledView = styled(View);
const StyledImageBackground = styled(ImageBackground);

export default function OpenCameraView() {
  const { deliveryId } = useParams();
  const completeDelivery = useCompleteDelivery();
  const navigate = useNavigate();

  const handleCompleteDelivery = () => {
    if (!deliveryId) return;

    completeDelivery.mutate(deliveryId, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Delivery completed",
          visibilityTime: 3000,
          autoHide: true,
        });
        navigate("/deliveries");
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

  return (
    <StyledImageBackground
      source={{
        uri: "https://images-ext-2.discordapp.net/external/RsZns2dNhO_H8CgrlRHauKnw2rbi__5Mo3Q2S6ZYalc/%3Fq%3D80%26w%3D2268%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D/https/images.unsplash.com/photo-1608686207856-001b95cf60ca?format=webp&width=377&height=670",
      }}
      resizeMode="cover"
      className="h-screen w-screen relative"
    >
      <StyledView className="absolute bottom-0 w-screen p-8">
        <Button
          title="Complete the delivery"
          onPress={handleCompleteDelivery}
        />
      </StyledView>
    </StyledImageBackground>
  );
}
