import { StatusBar, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import { LoginPage } from "./app/pages/auth/login";
import { Providers } from "./app/components/providers/providers";

export default function App() {
  return (
    <Providers>
      <NativeRouter>
        <View>
          <Routes>
            <Route path="/" Component={LoginPage} />
          </Routes>

          <StatusBar />
        </View>
      </NativeRouter>
    </Providers>
  );
}
