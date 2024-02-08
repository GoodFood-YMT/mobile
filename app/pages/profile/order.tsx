import { useParams } from "react-router-native";
import { PageTitle } from "../../components/page_title";
import { PageWrapper } from "../../components/page_wrapper";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { useFetchOrderById } from "../../hooks/ordering/use_fetch_order_by_id";
import { useFetchRestaurantById } from "../../hooks/restaurants/use_fetch_restaurant_by_id";
import { DateTime } from "luxon";
import { DeliveryInformation } from "../../components/delivery_information";

const StyledText = styled(Text);
const StyledView = styled(View);

export function Order() {
  const { orderId } = useParams();

  const order = useFetchOrderById(orderId ?? "");
  const restaurant = useFetchRestaurantById(order.data?.restaurant_id ?? "");

  return (
    <PageWrapper>
      <PageTitle>
        Order <StyledText className="text-xs">#{orderId}</StyledText>
      </PageTitle>

      <StyledView className="bg-white p-4 shadow-sm mb-2">
        <StyledView className="flex flex-row mb-1">
          <StyledText className="font-medium w-[100px]">Restaurant</StyledText>
          <StyledText>{restaurant.data?.name}</StyledText>
        </StyledView>

        <StyledView className="flex flex-row mb-1">
          <StyledText className="font-medium w-[100px]">Status</StyledText>
          <StyledText className="capitalize">{order.data?.status}</StyledText>
        </StyledView>

        <StyledView className="flex flex-row mb-1">
          <StyledText className="font-medium w-[100px]">Date</StyledText>
          <StyledText>
            {DateTime.fromISO(order.data?.created_at ?? "").toFormat("DDD")}
          </StyledText>
        </StyledView>

        <StyledView className="flex flex-row mb-1">
          <StyledText className="font-medium w-[100px]">Total Paid</StyledText>
          <StyledText>{order.data?.total_price}€</StyledText>
        </StyledView>
      </StyledView>

      {order.data?.delivery_id && (
        <DeliveryInformation deliveryId={order.data.delivery_id} />
      )}

      <StyledView className="bg-white p-4 shadow-sm">
        <StyledText className="text-lg font-medium tracking-tight mb-2">
          Products
        </StyledText>

        {order.data?.products.map((product) => (
          <StyledView
            key={product.product_id}
            className="flex flex-row justify-between"
          >
            <StyledText>
              {product.quantity} {product.label}
            </StyledText>
            <StyledText>{product.price}€</StyledText>
          </StyledView>
        ))}
      </StyledView>
    </PageWrapper>
  );
}
