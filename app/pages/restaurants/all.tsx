import { View, Text } from "react-native";
import { Loader } from "../../components/loader";
import { useFetchAllRestaurants } from "../../hooks/restaurants/use_fetch_all_restaurants";

export function RestaurantsPage() {
  const restaurants = useFetchAllRestaurants();

  if (restaurants.isLoading) {
    return <Loader />;
  }

  return (
    <View>
      {restaurants.data?.pages.map((page) =>
        page.data.map((restaurant) => (
          <Text key={restaurant.id}>{restaurant.name}</Text>
        ))
      )}
    </View>
  );
}
