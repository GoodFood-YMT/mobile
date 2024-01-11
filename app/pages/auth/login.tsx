import { SafeAreaView, Text } from "react-native";
import { styled } from "nativewind";

const StyledSafeArea = styled(SafeAreaView);
const StyledText = styled(Text);

export function LoginPage() {
  return (
    <StyledSafeArea className="flex bg-[#fff] items-center justify-center">
      <StyledText className="text-purple-600 text-4xl text-center p-5">
        Welcome to the login page
      </StyledText>
    </StyledSafeArea>
  );
}
