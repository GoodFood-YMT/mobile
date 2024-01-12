import { StatusBar, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import { LoginPage } from "./app/pages/auth/login";
import { Providers } from "./app/components/providers/providers";
import { RestaurantsPage } from "./app/pages/restaurants/all";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Providers>
      <NativeRouter>
        <View>
          <Routes>
            <Route path="/" Component={LoginPage} />
            <Route path="/restaurants" Component={RestaurantsPage} />
          </Routes>

          <StatusBar />
        </View>
      </NativeRouter>

      <Toast />
    </Providers>
  );
}
