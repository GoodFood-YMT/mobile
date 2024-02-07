import { styled } from "nativewind";
import { useAccountStore } from "../../stores/account_store";
import { Text, View } from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function PorfileInformation() {
  const accountStore = useAccountStore();

  return (
    <StyledView className="bg-white shadow-sm p-4 mb-2">
      <StyledText className="mb-2 text-lg font-medium tracking-tight">
        Information
      </StyledText>
      <StyledView className="flex flex-col text-sm">
        <StyledView className="flex flex-row mb-1">
          <StyledText className="font-medium w-[60px]">Name</StyledText>
          <StyledText>
            {accountStore.account?.firstname} {accountStore.account?.lastname}
          </StyledText>
        </StyledView>

        <StyledView className="flex flex-row mb-1">
          <StyledText className="font-medium w-[60px]">Email</StyledText>
          <StyledText>{accountStore.account?.email}</StyledText>
        </StyledView>

        <StyledView className="flex flex-row">
          <StyledText className="font-medium w-[60px]">Role</StyledText>
          <StyledText className="capitalize">
            {accountStore.account?.role_id}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
