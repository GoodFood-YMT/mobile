import { View, Text, Button, Pressable } from "react-native";
import { Loader } from "../../components/loader";
import { PageTitle } from "../../components/page_title";
import { PageWrapper } from "../../components/page_wrapper";
import { useFetchAllDeliveries } from "../../hooks/delivery/use_fetch_all_deliveries";
import { styled } from "nativewind";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export function DeliveriesPage() {
  const navigate = useNavigate();
  const deliveries = useFetchAllDeliveries();

  if (deliveries.isLoading) {
    return (
      <PageWrapper>
        <PageTitle>Deliveries</PageTitle>

        <Loader />
      </PageWrapper>
    );
  }

  if (deliveries.isError) {
    return (
      <PageWrapper>
        <PageTitle>Deliveries</PageTitle>

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
      <PageTitle>Deliveries</PageTitle>

      <StyledView className="flex flex-col">
        {deliveries.data.pages.map((page) =>
          page.data.map((delivery) => (
            <StyledPressable
              key={delivery.id}
              onPress={() => {
                navigate(`/deliveries/${delivery.id}`);
              }}
              className="flex flex-row justify-between mb-2 bg-white shadow-sm p-4"
            >
              <StyledText className="mb-1 text-base font-medium tracking-tight">
                <StyledText className="text-sm">{delivery.id}</StyledText>
                {"\n"}
                <StyledText className="text-base">
                  {DateTime.fromISO(delivery.created_at).toFormat("DDD HH:mm")}
                </StyledText>
              </StyledText>
              <StyledText className="mb-1 text-base font-medium tracking-tight">
                <StyledText className="text-xs italic">Status</StyledText>
                {"\n"}
                <StyledText className="text-sm capitalize text-black">
                  {delivery.status.toLocaleLowerCase()}
                </StyledText>
              </StyledText>
            </StyledPressable>
          ))
        )}

        {deliveries.hasNextPage && (
          <div className="mt-4 flex justify-center">
            <Button
              onPress={() => deliveries.fetchNextPage()}
              title="Load more"
            />
          </div>
        )}
      </StyledView>
    </PageWrapper>
  );
}
1;
