import { useParams } from "react-router-native";
import { useFetchAddressById } from "../../../hooks/delivery/addresses/use_fetch_adress_by_id";
import { PageTitle } from "../../../components/page_title";
import { PageWrapper } from "../../../components/page_wrapper";
import { Text, View } from "react-native";
import { Loader } from "../../../components/loader";
import EditAddressForm from "../../../components/profile/edit_address_form";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function EditAddress() {
  const { addressId } = useParams();

  const address = useFetchAddressById(addressId);

  if (address.isLoading) {
    return (
      <PageWrapper>
        <StyledView className="bg-white shadow-sm p-4">
          <Loader />
        </StyledView>
      </PageWrapper>
    );
  }

  if (address.isError || !address.data) {
    return (
      <PageWrapper>
        <StyledView className="bg-white shadow-sm p-4">
          <StyledText>Something went wrong</StyledText>
        </StyledView>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageTitle>Create Address</PageTitle>
      <EditAddressForm
        address={{ ...address.data, zipCode: address.data?.zip_code || "" }}
      />
    </PageWrapper>
  );
}
