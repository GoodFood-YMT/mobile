import { StatusBar, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import { LoginPage } from "./app/pages/auth/login";
import { Providers } from "./app/components/providers/providers";
import { RestaurantsPage } from "./app/pages/restaurants/all";
import Toast from "react-native-toast-message";
import { CartPage } from "./app/pages/cart";
import RestaurantProducts from "./app/pages/restaurants/products/restaurant_products";
import ProductPage from "./app/pages/restaurants/products/product";
import { DeliveriesPage } from "./app/pages/deliveries";
import { OneDelivery } from "./app/pages/deliveries/one";
import OpenCameraView from "./app/pages/deliveries/camera";
import { ItinareryPage } from "./app/pages/deliveries/itinarery";

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

            <Route path="/deliveries" Component={DeliveriesPage} />
            <Route path="/deliveries/:deliveryId" Component={OneDelivery} />
            <Route
              path="/deliveries/:deliveryId/camera"
              Component={OpenCameraView} />
            <Route path="/deliveries/:deliveryId/itinarery"
              Component={ItinareryPage} />
          </Routes>

          <StatusBar />
        </View>
      </NativeRouter>

      <Toast />
    </Providers>
  );
}
