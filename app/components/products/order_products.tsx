import { styled } from "nativewind";
import { View, Text } from "react-native";
import { formatToPrice } from "../../utils/format_to_price";

interface OrderProductsProps {
  order: {
    id: string;
    status: string;
    previous_status: string;
    total_price: string;
    user_id: string;
    address_id: string;
    restaurant_id: string;
    delivery_id: string;
    created_at: string;
    updated_at: string;
    products: Array<{
      product_id: string;
      quantity: number;
      price: string;
      label: string;
    }>;
  };
}

const StyledView = styled(View);
const StyledText = styled(Text);

export function OrderProducts({ order }: OrderProductsProps) {
  return (
    <StyledView className="bg-white shadow-sm p-4">
      <StyledText className="font-bold text-lg mb-2">Products</StyledText>

      <StyledView>
        {order.products.map((product) => (
          <StyledView key={product.product_id} className="flex flex-col gap-2">
            <StyledText className="text-sm font-medium">
              {product.quantity} {product.label}
            </StyledText>
          </StyledView>
        ))}
      </StyledView>
    </StyledView>
  );
}
