import { ImageBackground, Pressable, Text, View } from "react-native";
import { styled } from "nativewind";
import { getRestaurantImage } from "../../utils/get_restaurant_image";
import { useNavigate } from "react-router-native";

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledImageBackground = styled(ImageBackground);
const StyledText = styled(Text);

interface Props {
  product: {
    id: string;
    label: string;
    description: string;
    price: number;
    visible: boolean;
    quantity: number;
    categoryId: string | null;
    restaurantId: string | null;
  };
}

export default function Product({ product }: Props) {
  const navigate = useNavigate();
  const handleOnPressProduct = () =>
    navigate(`/restaurants/${product.restaurantId}/products/${product.id}`);

  return (
    <StyledImageBackground
      source={{
        uri: getRestaurantImage(product.label),
      }}
      resizeMode="cover"
      className="aspect-video mb-4 w-full"
    >
      <StyledPressable onPress={handleOnPressProduct}>
        <StyledView className="h-full w-full relative bg-black/40">
          <StyledText className="flex items-center absolute right-2 top-2 text-black px-2 py-1 text-xs bg-white rounded-full">
            <StyledText> {product.price} €</StyledText>
          </StyledText>
          <StyledText className="absolute bottom-2 left-2 text-white font-bold text-lg">
            {product.label}
          </StyledText>
        </StyledView>
      </StyledPressable>
    </StyledImageBackground>
  );
}
