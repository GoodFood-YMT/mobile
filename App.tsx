import { StatusBar, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import { LoginPage } from "./app/pages/auth/login";
import { Providers } from "./app/components/providers/providers";
import { RestaurantsPage } from "./app/pages/restaurants/all";
import Toast from "react-native-toast-message";
import { CartPage } from "./app/pages/cart";
import RestaurantProducts from "./app/pages/restaurants/products/restaurant_products";
import ProductPage from "./app/pages/restaurants/products/product";

export default function App() {
  return (
    <Providers>
      <NativeRouter>
        <View>
          <Routes>
            <Route path="/" Component={LoginPage} />
            <Route path="/restaurants" Component={RestaurantsPage} />
            <Route path="/cart" Component={CartPage} />
            <Route
              path="/restaurants/:restaurantId/products"
              Component={RestaurantProducts}
            />
            <Route
              path="/restaurants/:restaurantId/products/:productId"
              Component={ProductPage}
            />
          </Routes>

          <StatusBar />
        </View>
      </NativeRouter>

      <Toast />
    </Providers>
  );
}
