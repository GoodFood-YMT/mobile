import { styled } from "nativewind";
import { ImageBackground, Pressable, View, Text } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { Button } from "../../components/ui/button";
import { useCompleteDelivery } from "../../hooks/delivery/use_complete_delivery";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { Camera, CameraType } from "expo-camera";
import { useEffect } from "react";

const StyledView = styled(View);
const StyledImageBackground = styled(ImageBackground);
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledCamera = styled(Camera);

export default function OpenCameraView() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
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

  const handleBack = () => {
    navigate(`/deliveries/${deliveryId}/itinarery`);
  };

  useEffect(() => {
    async function requestCameraPermission() {
      await requestPermission();
    }

    requestCameraPermission();
  }, []);

  if (!permission || !permission.granted) {
    return (
      <StyledImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1617500603321-bcd6286973b7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        resizeMode="cover"
        className="h-screen w-screen relative"
      >
        <StyledView className="absolute w-screen pt-20 px-8 pb-6 bg-white">
          <StyledPressable
            onPress={handleBack}
            className="flex flex-row items-center"
          >
            <Icon name="arrow-left" size={16} color="black" />
            <StyledText className="text-black text-sm ml-2">Back</StyledText>
          </StyledPressable>
        </StyledView>
        <StyledView className="absolute bottom-0 w-screen p-8">
          <Button
            title="Complete the delivery"
            onPress={handleCompleteDelivery}
          />
        </StyledView>
      </StyledImageBackground>
    );
  }

  return (
    <StyledCamera className="h-screen w-screen relative" type={CameraType.back}>
      <StyledView className="absolute w-screen pt-20 px-8 pb-6 bg-white">
        <StyledPressable
          onPress={handleBack}
          className="flex flex-row items-center"
        >
          <Icon name="arrow-left" size={16} color="black" />
          <StyledText className="text-black text-sm ml-2">Back</StyledText>
        </StyledPressable>
      </StyledView>
      <StyledView className="absolute bottom-0 w-screen p-8">
        <Button
          title="Complete the delivery"
          onPress={handleCompleteDelivery}
        />
      </StyledView>
    </StyledCamera>
  );
}
