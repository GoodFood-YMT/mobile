import { styled } from "nativewind";
import { PageWrapper } from "../components/page_wrapper";
import { View, Text, Pressable } from "react-native";
import { PageTitle } from "../components/page_title";
import { z } from "zod";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { useFetchAllAddresses } from "../hooks/delivery/addresses/use_fetch_addresses";
import { useFetchBasket } from "../hooks/basket/use_fetch_basket";
import { useCreateOrder } from "../hooks/ordering/use_create_order";
import { useClearBasket } from "../hooks/basket/use_clear_basket";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import clsx from "clsx";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { Button } from "../components/ui/button";
import { TextInput } from "../components/ui/input";
import { formatToPrice } from "../utils/format_to_price";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  addressId: z.string(),
  creditCardNumber: z.string(),
  creditCardExpiry: z.string(),
  creditCardCvv: z.string(),
});

export function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);

  const addresses = useFetchAllAddresses();
  const basket = useFetchBasket();
  const createOrder = useCreateOrder();
  const clearBasket = useClearBasket();

  const subtotal =
    basket.data?.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) ?? 0;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { ...methods } = form;

  const handleSubmit = (payload: z.infer<typeof formSchema>) => {
    if (payload.addressId && basket.data) {
      createOrder.mutate(
        {
          addressId: payload.addressId,
          products: basket.data.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
        {
          onSuccess: async (data) => {
            await clearBasket.mutateAsync();
            await basket.refetch();
            Toast.show({
              type: "success",
              text1: "Order placed",
              visibilityTime: 3000,
              autoHide: true,
            });
            navigate(`/profile/orders/${data.id}`);
          },
          onError: () => {
            Toast.show({
              type: "error",
              text1: "An error occured",
              visibilityTime: 3000,
              autoHide: true,
            });
          },
        }
      );
    }
  };

  if (basket.isLoading) {
    return null;
  }

  if (!basket.data?.items.length || basket.data?.items.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <PageWrapper>
      <PageTitle>Checkout</PageTitle>

      <FormProvider {...methods}>
        {step === 1 && (
          <StyledView className="bg-white p-4 shadow-sm">
            <StyledView className="flex h-full flex-col justify-between gap-4">
              <StyledView className="flex flex-col overflow-y-auto">
                <StyledText className="mb-2 text-xl font-medium tracking-tight">
                  Information
                </StyledText>

                <StyledView className="flex w-full">
                  <TextInput
                    name="firstName"
                    label="Firstname"
                    placeholder="John"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    rules={{ required: "Firstname is required!" }}
                  />

                  <TextInput
                    name="lastName"
                    label="Lastname"
                    placeholder="Doe"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    rules={{ required: "Lastname is required!" }}
                  />
                </StyledView>

                <StyledText className="mb-2 text-xl font-medium tracking-tight">
                  Shipping Address
                </StyledText>

                {addresses.data?.addresses.map((address) => (
                  <StyledPressable
                    key={address.id}
                    className={clsx(
                      "cursor-pointer mb-2 border border-border p-4 shadow-sm hover:bg-gray-50",
                      {
                        "bg-gray-50 border-gray-400":
                          form.watch("addressId") === address.id,
                      }
                    )}
                    onPress={() => {
                      form.setValue("addressId", address.id);
                    }}
                  >
                    <StyledText className="mb-1 text-base font-medium tracking-tight">
                      {address.name}
                    </StyledText>

                    <StyledText className="text-sm">
                      {address.street}
                    </StyledText>
                    <StyledText className="text-sm">
                      {address.zip_code} {address.city}, {address.country}
                    </StyledText>
                  </StyledPressable>
                ))}

                {addresses.data && addresses.data.addresses.length <= 0 ? (
                  <StyledView className="border p-4 shadow-sm">
                    <StyledText className="mb-1 flex items-center justify-between text-base font-medium tracking-tight">
                      No addresses
                      <Button
                        onPress={() => navigate("/profile/address/add")}
                        title="Add one"
                      />
                    </StyledText>
                  </StyledView>
                ) : null}
                <StyledView className="mt-2 flex justify-end">
                  <Button
                    onPress={() => {
                      setStep(2);
                    }}
                    title="Next"
                    disabled={
                      !form.watch("addressId") ||
                      !form.watch("firstName") ||
                      !form.watch("lastName")
                    }
                  />
                </StyledView>
              </StyledView>
            </StyledView>
          </StyledView>
        )}

        {step === 2 && (
          <>
            <StyledView className="bg-white p-4 shadow-sm">
              <StyledView className="flex h-full flex-col justify-between gap-4">
                <StyledView className="flex flex-col overflow-y-auto">
                  <StyledText className="mb-4 text-xl font-medium tracking-tight">
                    Payment
                  </StyledText>

                  <StyledView className="flex w-full">
                    <TextInput
                      name="creditCardNumber"
                      label="Credit Card Number"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                      rules={{ required: "Credit card number is required!" }}
                    />

                    <TextInput
                      name="creditCardCvv"
                      label="CVV Code"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                      rules={{ required: "CVV Code is required!" }}
                    />
                    <TextInput
                      name="creditCardExpiry"
                      label="Expiry Date"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                      rules={{ required: "Expiry date is required!" }}
                    />
                  </StyledView>

                  <StyledView className="flex w-full flex-col bg-stone-50 p-4 mb-4">
                    <StyledView className="flex flex-row items-center justify-between mb-2">
                      <StyledText className="text-xs font-medium">
                        Subtotal
                      </StyledText>
                      <StyledText className="text-xs">
                        {formatToPrice(subtotal)}€
                      </StyledText>
                    </StyledView>
                    <StyledView className="flex flex-row items-center justify-between mb-2">
                      <StyledText className="text-xs font-medium">
                        Shipping & Handling
                      </StyledText>
                      <StyledText className="text-xs">Free</StyledText>
                    </StyledView>
                    <StyledView className="w-full border-b border-black/5 mb-2"></StyledView>
                    <StyledView className="flex flex-row items-center justify-between">
                      <StyledText className="text-sm font-medium">
                        Total
                      </StyledText>
                      <StyledText className="text-sm">
                        {formatToPrice(subtotal)}€
                      </StyledText>
                    </StyledView>
                  </StyledView>

                  <StyledView className="mt-2 flex flex-row justify-between">
                    <Button
                      title="Previous"
                      onPress={() => {
                        setStep(1);
                      }}
                    />
                    <Button
                      onPress={methods.handleSubmit(handleSubmit)}
                      disabled={
                        !form.watch("addressId") ||
                        !form.watch("firstName") ||
                        !form.watch("lastName") ||
                        !form.watch("creditCardNumber") ||
                        !form.watch("creditCardExpiry") ||
                        !form.watch("creditCardCvv")
                      }
                      title="Proceed to payment"
                    />
                  </StyledView>
                </StyledView>
              </StyledView>
            </StyledView>
          </>
        )}
      </FormProvider>
    </PageWrapper>
  );
}
