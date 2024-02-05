import { styled } from "nativewind";
import { PropsWithChildren } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Logo } from "./identity/logo";
import { useAccountStore } from "../stores/account_store";
import { NavigationButton } from "./ui/navigation_button";

const StyledView = styled(View);
const StyledImageBackground = styled(ImageBackground);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

export function PageWrapper({ children }: PropsWithChildren) {
  const accountStore = useAccountStore();
  const windowHeight = Dimensions.get("window").height;

  return (
    <StyledView className="bg-[#F5F7F9]">
      <StyledImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1589010588553-46e8e7c21788?q=80&w=3060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        resizeMode="cover"
        className="aspect-video h-[140px] w-screen"
      >
        <StyledView className="h-full w-screen bg-black/30 flex flex-row justify-between items-center pt-10 px-4">
          <Logo size={150} color="white" />
          <StyledView className="flex items-center flex-row bg-white p-3">
            <TouchableHighlight style={styles.profileImgContainer}>
              <Image
                source={{
                  uri: "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
                }}
                style={styles.profileImg}
              />
            </TouchableHighlight>
            <StyledView className="flex">
              <StyledText className="text-black font-medium text-sm">
                {accountStore.account?.firstname}{" "}
                {accountStore.account?.lastname}
              </StyledText>
              <StyledText className="capitalize text-xs opacity-60">
                {accountStore.account?.role_id}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledImageBackground>
      <StyledView
        className="px-6 py-4"
        style={{ height: windowHeight - 140 - 100 }}
      >
        <StyledScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </StyledScrollView>
      </StyledView>
      <StyledView className="h-[100px] bg-white w-screen border-t border-border flex flex-row justify-center items-center pb-2">
        <NavigationButton text="Catalog" icon="grid" route="/" />
        <NavigationButton text="Cart" icon="basket" route="/" />
      </StyledView>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  profileImgContainer: {
    marginRight: 8,
    height: 40,
    width: 40,
    borderRadius: 40,
    overflow: "hidden",
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
});
