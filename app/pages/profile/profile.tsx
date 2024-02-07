import { styled } from "nativewind";
import { PageTitle } from "../../components/page_title";
import { PageWrapper } from "../../components/page_wrapper";
import { View } from "react-native";
import PorfileInformation from "../../components/profile/profile_information";
import ProfileAddresses from "../../components/profile/profile_addresses";
import ProfileOrders from "../../components/profile/profile_orders";

const StyledView = styled(View);

export default function Profile() {
  return (
    <PageWrapper>
      <PageTitle>Profile</PageTitle>
      <StyledView className="flex flex-col">
        <PorfileInformation />
        <ProfileAddresses />
        <ProfileOrders />
      </StyledView>
    </PageWrapper>
  );
}
