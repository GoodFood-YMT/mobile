import { getRestaurantImage } from "../../utils/get_restaurant_image";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { styled } from "nativewind";
import { useNavigate } from "react-router-native";
import { View, Text, ImageBackground, Pressable } from "react-native";

interface RestaurantProps {
  restaurant: {
    id: string;
    name: string;
    enabled: boolean;
    address: string;
    city: string;
    country: string;
    created_at: string;
    updated_at: string;
  };
}

const StyledPressable = styled(Pressable);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImageBackground = styled(ImageBackground);

export function Restaurant({ restaurant }: RestaurantProps) {
  const navigate = useNavigate();
  const handleOnPressRestaurant = () =>
    navigate(`/restaurants/${restaurant.id}/products`);
  return (
    <StyledImageBackground
      source={{
        uri: getRestaurantImage(restaurant.name),
      }}
      resizeMode="cover"
      className="aspect-video mb-4 w-full"
    >
      <StyledPressable onPress={handleOnPressRestaurant}>
        <StyledView className="h-full w-full relative bg-black/40">
          <StyledText className="flex items-center absolute right-2 top-2 text-black px-2 py-1 text-xs bg-white rounded-full">
            <Icon name="location-pin" size={11} color="black" />
            <StyledText> {restaurant.city}</StyledText>
          </StyledText>
          <StyledText className="absolute bottom-2 left-2 text-white font-bold text-lg">
            {restaurant.name}
          </StyledText>
        </StyledView>
      </StyledPressable>
    </StyledImageBackground>
  );
}
