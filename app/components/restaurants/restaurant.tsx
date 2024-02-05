import { styled } from "nativewind";
import { View, Text, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { getRestaurantImage } from "../../utils/get_restaurant_image";

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

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImageBackground = styled(ImageBackground);

export function Restaurant({ restaurant }: RestaurantProps) {
  return (
    <StyledImageBackground
      source={{
        uri: getRestaurantImage(restaurant.name),
      }}
      resizeMode="cover"
      className="aspect-video mb-4 w-full"
    >
      <StyledView className="h-full w-full relative bg-black/40">
        <StyledText className="flex items-center absolute right-2 top-2 text-black px-2 py-1 text-xs bg-white rounded-full">
          <Icon name="location-pin" size={11} color="black" />
          <StyledText> {restaurant.city}</StyledText>
        </StyledText>
        <StyledText className="absolute bottom-2 left-2 text-white font-bold text-lg">
          {restaurant.name}
        </StyledText>
      </StyledView>
    </StyledImageBackground>
  );
}
