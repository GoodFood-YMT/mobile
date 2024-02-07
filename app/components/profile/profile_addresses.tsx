import { styled } from "nativewind";
import { View, Text, Pressable } from "react-native";
import { useFetchAllAddresses } from "../../hooks/delivery/addresses/use_fetch_addresses";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { useDeleteAddress } from "../../hooks/delivery/addresses/use_delete_address";
import Toast from "react-native-toast-message";
import { useNavigate } from "react-router-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export default function ProfileAddresses() {
  const addresses = useFetchAllAddresses();
  const deleteAddress = useDeleteAddress();
  const navigate = useNavigate();

  if (addresses.isLoading) {
    return (
      <StyledView className="bg-white shadow-sm p-4">
        <Loader />
      </StyledView>
    );
  }

  const handleAddAddress = () => {
    navigate("/profile/address/add");
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddress.mutate(id, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Address deleted",
          visibilityTime: 3000,
          autoHide: true,
        });
        addresses.refetch();
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong",
        });
      },
    });
  };

  if (addresses.isError) {
    return (
      <StyledView className="bg-white shadow-sm p-4">
        <StyledText>Something went wrong</StyledText>
      </StyledView>
    );
  }
  return (
    <StyledView className="bg-white shadow-sm p-4 mb-2">
      <StyledView className="w-full flex flex-row justify-between mb-2">
        <StyledText className="text-lg font-medium tracking-tight">
          Addresses
        </StyledText>
        <Button
          title="Add"
          textClassName="text-xs"
          onPress={handleAddAddress}
        />
      </StyledView>
      <StyledView className="flex flex-col">
        {addresses.data?.addresses.map((address) => (
          <StyledPressable
            key={address.id}
            className={
              "flex flex-row cursor-pointer items-center justify-between border border-border p-4 shadow-sm mb-2 last:mb-0"
            }
            onPress={() => navigate(`/profile/addresses/edit/${address.id}`)}
          >
            <StyledView>
              <StyledText className="mb-1 text-base font-medium tracking-tight">
                {address.name}
              </StyledText>
              <StyledText className="text-sm">{address.street}</StyledText>
              <StyledText className="text-sm">
                {address.zip_code} {address.city}, {address.country}
              </StyledText>
            </StyledView>

            <StyledView>
              <Button
                onPress={() => handleDeleteAddress(address.id)}
                title="Delete"
              />
            </StyledView>
          </StyledPressable>
        ))}

        {addresses.data && addresses.data.addresses.length <= 0 ? (
          <StyledView className="border border-border p-4 shadow-sm">
            <StyledText className="mb-1 flex items-center justify-between text-base font-medium tracking-tight">
              No addresses
            </StyledText>
          </StyledView>
        ) : null}
      </StyledView>
    </StyledView>
  );
}
