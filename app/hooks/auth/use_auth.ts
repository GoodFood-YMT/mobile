import { useCallback } from "react";
import { useAccountStore } from "../../stores/account_store";
import { AuthStatus } from "../../types/auth/auth_status";
import { apiFetch } from "../../utils/basic_fetch";
import { Account } from "../../types/auth/account";
import { Token } from "../../types/auth/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigateFunction } from "react-router-native";
import Toast from "react-native-toast-message";

export function useAuth() {
  const { account, setAccount } = useAccountStore();

  let status;
  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const authenticate = useCallback(() => {
    apiFetch<Account>("/auth/me")
      .then(setAccount)
      .catch(() => setAccount(null));
  }, [setAccount]);

  const login = useCallback(
    (email: string, password: string, navigate: NavigateFunction) => {
      apiFetch<Token>("/auth/login", { json: { email, password } })
        .then(async (data) => {
          await AsyncStorage.setItem("token", data.token);
        })
        .then(authenticate)
        .then(() => {
          navigate("/restaurants");
        })
        .catch((e) => {
          console.log(e);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Invalid credentials",
          });
        });
    },
    [authenticate]
  );

  const register = useCallback(
    (
      email: string,
      firstname: string,
      lastname: string,
      password: string,
      passwordConfirmation: string
    ) => {
      apiFetch<Token>("/auth/register", {
        json: {
          email,
          firstname,
          lastname,
          password,
          password_confirmation: passwordConfirmation,
        },
      })
        .then(
          async (data) =>
            // setCookie("token", data.token, {
            //   expires: new Date(data.expires_at),
            // })
            await AsyncStorage.setItem("token", data.token)
        )
        .then(authenticate)
        .then(() => window.location.assign("/"))
        .catch(() =>
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Something went wrong",
          })
        );
    },
    [authenticate]
  );

  const logout = useCallback(() => {
    apiFetch<Account>("/auth/logout", { method: "DELETE" })
      .then(async () => await AsyncStorage.setItem("token", ""))
      .then(() => setAccount(null))
      .then(() => window.location.assign("/"));
  }, [setAccount]);

  return {
    status,
    authenticate,
    login,
    register,
    logout,
  };
}
