import { styled } from "nativewind";
import { useFetchMyOrders } from "../../hooks/ordering/use_fetch_my_orders";
import { Pressable, Text, View } from "react-native";
import { Loader } from "../loader";
import OrderCard from "../orders/order_card";
import { Button } from "../ui/button";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export default function ProfileOrders() {
  const orders = useFetchMyOrders();

  if (orders.isLoading) {
    return (
      <StyledView className="bg-white shadow-sm p-4">
        <Loader />
      </StyledView>
    );
  }

  return (
    <StyledView className="bg-white p-4 shadow-sm">
      <StyledView className="flex w-full flex-col">
        <StyledView className="mb-2 flex justify-between">
          <StyledText className="text-lg font-medium tracking-tight">
            Orders
          </StyledText>
        </StyledView>
        <StyledView className="flex flex-col">
          {orders.data?.pages.map((page) =>
            page.data.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </StyledView>

        {orders.data?.pages[0].meta.total === 0 ? (
          <StyledView className="border border-border p-4 shadow-sm">
            <StyledText className="mb-1 flex items-center justify-between text-base font-medium tracking-tight">
              No orders
            </StyledText>
          </StyledView>
        ) : null}

        {orders.hasNextPage ? (
          <StyledView className="mt-4 flex items-center justify-center">
            <Button
              title="Load more"
              onPress={() => orders.fetchNextPage()}
              textClassName="text-xs"
            ></Button>
          </StyledView>
        ) : null}
      </StyledView>
    </StyledView>
  );
}
