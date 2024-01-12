import { ImageBackground, View } from "react-native";
import { styled } from "nativewind";
import { z } from "zod";
import { useAuth } from "../../hooks/auth/use_auth";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "../../components/identity/logo";
import { TextInput } from "../../components/ui/input";
import { useNavigate } from "react-router-native";
import { Button } from "../../components/ui/button";

const StyledLogo = styled(Logo);
const StyledView = styled(View);
const StyledImageBackground = styled(ImageBackground);

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { ...methods } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (payload: z.infer<typeof formSchema>) => {
    login(payload.email, payload.password, navigate);
  };

  return (
    <StyledImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      resizeMode="cover"
      className="h-screen w-screen"
    >
      <StyledView className="flex flex-col h-screen w-screen items-center justify-center bg-black/40">
        <StyledLogo size={200} color="white" />

        <StyledView className="px-8 w-full mt-10">
          <StyledView className="bg-white p-4">
            <FormProvider {...methods}>
              <StyledView>
                <TextInput
                  name="email"
                  label="Email"
                  placeholder="example@goodfood.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  rules={{ required: "Email is required!" }}
                />

                <TextInput
                  name="password"
                  label="Password"
                  placeholder="**********"
                  keyboardType="default"
                  rules={{ required: "Password is required!" }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                />

                <StyledView className="flex justify-end">
                  <Button
                    title="Login"
                    onPress={methods.handleSubmit(handleSubmit)}
                  />
                </StyledView>
              </StyledView>
            </FormProvider>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledImageBackground>
  );
}
