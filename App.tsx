import { SafeAreaView, Text } from "react-native";
import { styled } from "nativewind";

const StyledSafeArea = styled(SafeAreaView);
const StyledText = styled(Text);

export default function App() {
  return (
    <StyledSafeArea className="flex bg-[#fff] items-center justify-center">
      <StyledText className="text-purple-600 text-4xl text-center p-5">
        Expo With TypeScript and Tailwind CSS
      </StyledText>
    </StyledSafeArea>
  );
}
