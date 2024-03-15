import { PageTitle } from "../components/page_title";
import { PageWrapper } from "../components/page_wrapper";
import { useAddToBasket } from "../hooks/basket/use_add_to_basket";
import { useClearBasket } from "../hooks/basket/use_clear_basket";
import { useFetchBasket } from "../hooks/basket/use_fetch_basket";
import { useDeleteFromBasket } from "../hooks/basket/use_delete_from_basket";
import { Image, Text, View } from "react-native";
import { styled } from "nativewind";
import { Loader } from "../components/loader";
import { Button } from "../components/ui/button";
import { formatToPrice } from "../utils/format_to_price";
import { useNavigate } from "react-router-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

export function CartPage() {
  const navigate = useNavigate();
  const basket = useFetchBasket();
  const clearBasket = useClearBasket();
  const addToBasket = useAddToBasket();
  const deleteFromBasket = useDeleteFromBasket();

  const subtotal =
    basket.data?.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) ?? 0;

  const handleClearBasket = async () => {
    await clearBasket.mutateAsync();
    await basket.refetch();
  };

  const handleAddToBasket = async (id: string) => {
    await addToBasket.mutateAsync({ id, quantity: 1 });
    await basket.refetch();
  };

  const handleDeleteFromBasket = async (id: string) => {
    await deleteFromBasket.mutateAsync({ id, quantity: 1 });
    await basket.refetch();
  };

  if (basket.isLoading) {
    return (
      <PageWrapper>
        <PageTitle>Cart</PageTitle>

        <StyledView className="bg-white p-4 shadow-sm">
          <StyledView className="flex h-full w-full flex-col items-center justify-center gap-2">
            <Loader />
          </StyledView>
        </StyledView>
      </PageWrapper>
    );
  }

  if (basket.isError) {
    return (
      <PageWrapper>
        <PageTitle>Cart</PageTitle>

        <StyledView className="bg-white p-4 shadow-sm">
          <StyledView className="flex h-full w-full flex-col items-center justify-center gap-2">
            <StyledText className="text-center text-lg font-medium">
              Something went wrong
            </StyledText>
            <StyledText className="max-w-[60%] text-center text-xs opacity-60">
              Could not load your cart. Please try again later.
            </StyledText>
          </StyledView>
        </StyledView>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageTitle>Cart</PageTitle>

      {basket.data && basket.data.items.length === 0 ? (
        <StyledView className="bg-white p-4 shadow-sm">
          <StyledView className="flex h-full w-full flex-col items-center justify-center gap-2">
            <StyledImage
              source={require("../../assets/cart.webp")}
              resizeMode="stretch"
              className="mb-8 w-[80px] h-[110px]"
            />
            <StyledText className="text-center text-lg font-medium">
              Your cart is empty
            </StyledText>
            <StyledText className="max-w-[60%] text-center text-xs opacity-60">
              Looks like you haven{"'"}t added any food to your cart yet.
            </StyledText>
          </StyledView>
        </StyledView>
      ) : (
        <StyledView className="bg-white p-4 shadow-sm">
          <StyledView className="flex h-full flex-col justify-between gap-4">
            <StyledView className="flex flex-col gap-2 overflow-y-auto">
              <StyledView className="flex flex-row justify-end">
                <StyledView className="mb-2 w-20">
                  <Button
                    title="Clear"
                    onPress={handleClearBasket}
                    className="bg-transparent border border-border"
                    textClassName="text-black"
                  />
                </StyledView>
              </StyledView>

              {basket.data.items.map((product) => (
                <StyledView
                  key={product.id}
                  className="flex flex-row justify-between"
                >
                  <StyledView className="flex flex-col gap-2">
                    <StyledText className="text-sm font-medium">
                      {product.label}
                    </StyledText>
                    <StyledText className="text-xs font-medium opacity-60">
                      {formatToPrice(product.price * product.quantity)} €
                    </StyledText>
                  </StyledView>
                  <StyledView className="flex flex-row items-center">
                    <Button
                      title="-"
                      className="bg-transparent border border-border"
                      textClassName="text-black"
                      onPress={() => handleDeleteFromBasket(product.id)}
                    />
                    <StyledText className="w-[50px] px-2 text-center font-medium">
                      {product.quantity}
                    </StyledText>
                    <Button
                      title="+"
                      className="bg-transparent border border-border"
                      textClassName="text-black"
                      onPress={() => handleAddToBasket(product.id)}
                    />
                  </StyledView>
                </StyledView>
              ))}
            </StyledView>
            <StyledView className="flex flex-col">
              <StyledView className="flex w-full flex-col bg-stone-50 p-4 mb-4">
                <StyledView className="flex flex-row items-center justify-between mb-2">
                  <StyledText className="text-xs font-medium">
                    Subtotal
                  </StyledText>
                  <StyledText className="text-xs">
                    {formatToPrice(subtotal)}€
                  </StyledText>
                </StyledView>
                <StyledView className="flex flex-row items-center justify-between mb-2">
                  <StyledText className="text-xs font-medium">
                    Shipping & Handling
                  </StyledText>
                  <StyledText className="text-xs">Free</StyledText>
                </StyledView>
                <StyledView className="w-full border-b border-black/5 mb-2"></StyledView>
                <StyledView className="flex flex-row items-center justify-between">
                  <StyledText className="text-sm font-medium">Total</StyledText>
                  <StyledText className="text-sm">
                    {formatToPrice(subtotal)}€
                  </StyledText>
                </StyledView>
              </StyledView>

              <Button
                title="Proceed to checkout"
                onPress={() => navigate("/checkout")}
              />
            </StyledView>
          </StyledView>
        </StyledView>
      )}
    </PageWrapper>
  );
}
