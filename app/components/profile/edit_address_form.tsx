import { useNavigate } from "react-router-native";
import { useCreateAddress } from "../../hooks/delivery/addresses/use_create_address";
import { View } from "react-native";
import { styled } from "nativewind";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { TextInput } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateAddress } from "../../hooks/delivery/addresses/use_update_addresss";

const StyledView = styled(View);

interface Props {
  address: {
    id: string;
    name: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
}

const formSchema = z.object({
  name: z.string(),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
});

export default function EditAddressForm({ address }: Props) {
  const navigate = useNavigate();
  const createAddress = useUpdateAddress();

  const { ...methods } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: address.name,
      street: address.street,
      city: address.city,
      country: address.country,
      zipCode: address.zipCode,
    },
  });

  const handleSubmit = (payload: z.infer<typeof formSchema>) => {
    createAddress.mutate(
      { id: address.id, data: { ...payload, zip_code: payload.zipCode } },
      {
        onSuccess: () => {
          console.log("success");
          Toast.show({
            type: "success",
            text1: "Address updated",
            visibilityTime: 3000,
            autoHide: true,
          });
          navigate("/profile");
        },
        onError: (e) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Something went wrong",
          });
        },
      }
    );
  };

  return (
    <StyledView>
      <FormProvider {...methods}>
        <StyledView>
          <TextInput
            name="name"
            label="Name"
            placeholder="Home"
            rules={{ required: "Name is required!" }}
          />

          <TextInput
            name="street"
            label="Street"
            placeholder="11 rue ..."
            rules={{ required: "Street is required!" }}
          />

          <TextInput
            name="zipCode"
            label="Zip Code"
            placeholder="75000"
            rules={{ required: "Zip Code is required!" }}
          />

          <TextInput
            name="city"
            label="City"
            placeholder="Paris"
            rules={{ required: "City is required!" }}
          />

          <TextInput
            name="country"
            label="Country"
            placeholder="France"
            rules={{ required: "Country is required!" }}
          />

          <StyledView className="flex justify-end mt-2">
            <Button
              title="Create"
              onPress={methods.handleSubmit(handleSubmit)}
            />
          </StyledView>
        </StyledView>
      </FormProvider>
    </StyledView>
  );
}
