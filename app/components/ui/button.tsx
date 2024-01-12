import { styled } from "nativewind";
import { Pressable, PressableProps, Text } from "react-native";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

interface ButtonProps extends PressableProps {
  title: string;
}

export function Button(props: ButtonProps) {
  return (
    <StyledPressable
      className="flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
      {...props}
    >
      <StyledText className="text-primary-foreground">{props.title}</StyledText>
    </StyledPressable>
  );
}
