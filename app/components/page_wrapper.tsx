import { styled } from "nativewind";
import { PropsWithChildren } from "react";
import { SafeAreaView, View } from "react-native";

const StyledView = styled(View);

export function PageWrapper({ children }: PropsWithChildren) {
  return (
    <SafeAreaView>
      <StyledView className="px-6 py-4">{children}</StyledView>
    </SafeAreaView>
  );
}
