import { StatusBar, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import { LoginPage } from "./app/pages/auth/login";

export default function App() {
  return (
    <NativeRouter>
      <View>
        <Routes>
          <Route path="/" Component={LoginPage} />
        </Routes>

        <StatusBar />
      </View>
    </NativeRouter>
  );
}
