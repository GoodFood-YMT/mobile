import { styled } from "nativewind";
import { PropsWithChildren } from "react";
import { Text } from "react-native";

const StyledText = styled(Text);

export function PageTitle({ children }: PropsWithChildren) {
  return (
    <StyledText className="font-bold mb-4 text-2xl">{children}</StyledText>
  );
}
