import { DateTime } from "luxon";
import { styled } from "nativewind";
import { Pressable, Text, View } from "react-native";
import { useNavigate } from "react-router-native";

interface Props {
  order: {
    id: string;
    status: string;
    total_price: string;
    created_at: string;
  };
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export default function OrderCard({ order }: Props) {
  const navigate = useNavigate();

  return (
    <StyledPressable
      key={order.id}
      className="flex flex-row justify-between cursor-pointer items-center border border-border p-4 shadow-sm hover:bg-gray-50 mb-2 las:mb-0"
      onPress={() => navigate(`/profile/orders/${order.id}`)}
    >
      <StyledText className="mb-1 text-base font-medium tracking-tight">
        <StyledText className="text-sm">{order.id}</StyledText>
        {"\n"}
        <StyledText className="text-base">
          {DateTime.fromISO(order.created_at).toFormat("DDD")}
        </StyledText>
      </StyledText>

      <StyledView className="flex items-end gap-8">
        <StyledText className="mb-1 text-base font-medium tracking-tight">
          <StyledText className="text-xs italic">Status</StyledText>
          {"\n"}
          <StyledText className="rounded-full bg-orange-400 px-2 py-1 text-sm capitalize text-white">
            {order.status.toLocaleLowerCase()}
          </StyledText>
        </StyledText>

        <StyledText className="mb-1 w-[120px] text-base font-medium tracking-tight">
          <StyledText className="text-xs italic">Total</StyledText>
          {"\n"}
          <StyledText className="text-base">{order.total_price}€</StyledText>
        </StyledText>
      </StyledView>
    </StyledPressable>
  );
}
