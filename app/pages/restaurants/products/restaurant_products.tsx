import { Text, View } from "react-native";
import { useParams } from "react-router-native";
import { useFetchInStockProductsByRestaurant } from "../../../hooks/catalog/products/use_fetch_products_by_restaurant";
import { Loader } from "../../../components/loader";
import { PageWrapper } from "../../../components/page_wrapper";
import { PageTitle } from "../../../components/page_title";
import { styled } from "nativewind";
import Product from "../../../components/products/product";
import { useFetchRestaurantById } from "../../../hooks/restaurants/use_fetch_restaurant_by_id";

const StyledView = styled(View);

export default function RestaurantProducts() {
  const { restaurantId } = useParams();
  if (!restaurantId) {
    return;
  }

  const products = useFetchInStockProductsByRestaurant(restaurantId);
  const restaurant = useFetchRestaurantById(restaurantId);

  if (products.isLoading) {
    return <Loader />;
  }
  if (restaurant.isLoading) {
    return <Loader />;
  }

  return (
    <PageWrapper>
      <PageTitle>{restaurant.data?.name}</PageTitle>
      <StyledView className="flex flex-col">
        {products.data?.pages.map((page) =>
          page.data.map((product) => <Product product={product} />)
        )}
      </StyledView>
    </PageWrapper>
  );
}
