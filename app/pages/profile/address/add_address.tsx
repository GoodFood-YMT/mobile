import { PageTitle } from "../../../components/page_title";
import { PageWrapper } from "../../../components/page_wrapper";
import AddAddressForm from "../../../components/profile/add_address_form";

export default function AddAddress() {
  return (
    <PageWrapper>
      <PageTitle>Create Address</PageTitle>
      <AddAddressForm />
    </PageWrapper>
  );
}
