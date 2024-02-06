import { styled } from "nativewind";
import { Pressable, PressableProps, Text } from "react-native";
import clsx from "clsx";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

interface ButtonProps extends PressableProps {
  title: string;
  className?: string;
  textClassName?: string;
}

export function Button(props: ButtonProps) {
  return (
    <StyledPressable
      className={clsx(
        "flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90",
        props.className
      )}
      {...props}
    >
      <StyledText
        className={clsx(
          "text-primary-foreground font-medium",
          props.textClassName
        )}
      >
        {props.title}
      </StyledText>
    </StyledPressable>
  );
}
