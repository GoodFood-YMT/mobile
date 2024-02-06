import { styled } from "nativewind";
import { Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useNavigate } from "react-router-native";

interface NavigationButtonProps {
  text: string;
  route: string;
  icon: string;
}

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export function NavigationButton({ text, route, icon }: NavigationButtonProps) {
  const navigate = useNavigate();

  function handlePress() {
    navigate(route);
  }

  return (
    <StyledPressable
      onPress={handlePress}
      className="flex items-center justify-center h-10 px-4 py-2 bg-transparent text-black"
    >
      <Icon name={icon} size={20} color="black" />
      <StyledText className="text-black text-xs mt-1">{text}</StyledText>
    </StyledPressable>
  );
}
