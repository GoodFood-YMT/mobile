import { Loader } from "../../components/loader";
import { useFetchAllRestaurants } from "../../hooks/restaurants/use_fetch_all_restaurants";
import { Restaurant } from "../../components/restaurants/restaurant";
import { PageTitle } from "../../components/page_title";
import { PageWrapper } from "../../components/page_wrapper";
import { styled } from "nativewind";
import { ScrollView, View } from "react-native";

const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);

export function RestaurantsPage() {
  const restaurants = useFetchAllRestaurants();

  if (restaurants.isLoading) {
    return <Loader />;
  }

  return (
    <PageWrapper>
      <PageTitle>Restaurants</PageTitle>
      <StyledView className="h-full">
        <StyledScrollView
          contentContainerStyle={{ paddingBottom: 170 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <StyledView className="flex flex-col">
            {restaurants.data?.pages.map((page) =>
              page.data.map((restaurant) => (
                <Restaurant key={restaurant.id} restaurant={restaurant} />
              ))
            )}
          </StyledView>
        </StyledScrollView>
      </StyledView>
    </PageWrapper>
  );
}
