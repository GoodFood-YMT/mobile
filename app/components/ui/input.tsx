import { styled } from "nativewind";
import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import {
  Text,
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(RNTextInput);

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
}

export const TextInput = (props: TextInputProps) => {
  const { name } = props;

  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  return <ControlledInput {...props} />;
};

const ControlledInput = (props: TextInputProps) => {
  const formContext = useFormContext();
  const { name, label, rules, defaultValue, ...inputProps } = props;
  const { field } = useController({ name, rules, defaultValue });

  return (
    <StyledView className="w-full mb-4">
      {label && (
        <StyledText className="mb-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </StyledText>
      )}
      <StyledView className="w-full">
        <StyledTextInput
          className="flex border border-input bg-background h-10 px-3 py-2 text-sm placeholder:text-muted-foreground"
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        />
      </StyledView>
    </StyledView>
  );
};
