import { styled } from "nativewind";
import { PageTitle } from "../../components/page_title";
import { PageWrapper } from "../../components/page_wrapper";
import { View } from "react-native";
import PorfileInformation from "../../components/profile/profile_information";

const StyledView = styled(View);

export default function Profile() {
  return (
    <PageWrapper>
      <PageTitle>Profile</PageTitle>
      <StyledView className="flex flex-col">
        <PorfileInformation />
      </StyledView>
    </PageWrapper>
  );
}
