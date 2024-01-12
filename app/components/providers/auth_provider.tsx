"use client";

import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../hooks/auth/use_auth";
import { AuthStatus } from "../../types/auth/auth_status";
import { Loader } from "../loader";
import { View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { status, authenticate } = useAuth();

  useEffect(() => authenticate(), [authenticate]);

  if (status === AuthStatus.Unknown) {
    return (
      <StyledView className="flex h-screen w-full items-center justify-center">
        <Loader />
      </StyledView>
    );
  }

  return <>{children}</>;
};
