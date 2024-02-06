import { Button } from "../../../components/ui/button";
import { getRestaurantImage } from "../../../utils/get_restaurant_image";
import { PageTitle } from "../../../components/page_title";
import { PageWrapper } from "../../../components/page_wrapper";
import { ImageBackground, Text, View } from "react-native";
import { styled } from "nativewind";
import { useAddToBasket } from "../../../hooks/basket/use_add_to_basket";
import { useFetchProductById } from "../../../hooks/catalog/products/use_fetch_product_by_id";
import { useParams } from "react-router-native";
import { useQueryClient } from "@tanstack/react-query";

const StyledImageBackground = styled(ImageBackground);
const StyledText = styled(Text);
const StyledView = styled(View);

export default function ProductPage() {
  const { productId } = useParams();
  const addToBasket = useAddToBasket();
  const queryClient = useQueryClient();

  if (!productId) return;

  const product = useFetchProductById(productId);

  const handleOnAddToBasket = async () => {
    await addToBasket.mutateAsync({ id: product.data!.id, quantity: 1 });
    await queryClient.invalidateQueries({ queryKey: ["basket"] });
  };

  return (
    <PageWrapper>
      <PageTitle>{product.data?.label}</PageTitle>
      <StyledView className="grid grid-cols-2 bg-white p-4 shadow-sm">
        <StyledImageBackground
          src={getRestaurantImage(product.data!.label)}
          className="relative aspect-square w-full"
        />
        <StyledView className="flex flex-col justify-between">
          <StyledView className="flex flex-col gap-2">
            <StyledView className="flex justify-between">
              <StyledText className="text-lg font-medium tracking-tight">
                {product.data?.price} €
              </StyledText>
            </StyledView>
            <StyledText className="text-sm opacity-60">
              {product.data?.description}
            </StyledText>
            <Button title="Add to basket" onPress={handleOnAddToBasket} />
          </StyledView>
        </StyledView>
      </StyledView>
    </PageWrapper>
  );
}
