import { styled } from "nativewind";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useDrawerStore } from "../stores/drawer_store";
import { useNavigate } from "react-router-native";
import { useAccountStore } from "../stores/account_store";

const StyledPressable = styled(Pressable);
const StyledView = styled(View);
const StyledText = styled(Text);

export function Drawer() {
  const navigate = useNavigate();
  const accountStore = useAccountStore();
  const drawerStore = useDrawerStore();

  function handleBack() {
    drawerStore.toggle();
  }

  return drawerStore.open ? (
    <StyledView className="absolute top-0 left-0 h-screen w-screen bg-black/40 z-50">
      <StyledView className="absolute top-0 right-0 py-24 px-8 h-full w-[75%] bg-white">
        <StyledPressable
          onPress={handleBack}
          className="flex flex-row items-center mb-12"
        >
          <Icon name="arrow-left" size={20} color="black" />
          <StyledText className="text-black text-base ml-2">Back</StyledText>
        </StyledPressable>

        <StyledView className="flex flex-col">
          <DrawerItem
            text="Profile"
            icon="user"
            action={() => {
              navigate("/profile");
              drawerStore.setOpen(false);
            }}
          />
          <DrawerItem
            text="Logout"
            icon="logout"
            action={() => {
              accountStore.setAccount(null);
              navigate("/");
              drawerStore.setOpen(false);
            }}
          />
        </StyledView>
      </StyledView>
    </StyledView>
  ) : null;
}

interface DrawerItemProps {
  text: string;
  icon: string;
  action: () => void;
}

export function DrawerItem({ text, icon, action }: DrawerItemProps) {
  return (
    <StyledPressable
      onPress={action}
      className="flex flex-row items-center mb-6"
    >
      <Icon name={icon} size={16} color="black" />
      <StyledText className="text-black text-sm ml-3">{text}</StyledText>
    </StyledPressable>
  );
}
