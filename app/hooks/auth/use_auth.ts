import { useCallback } from "react";
import { useAccountStore } from "../../stores/account_store";
import { AuthStatus } from "../../types/auth/auth_status";
import { apiFetch } from "../../utils/basic_fetch";
import { Account } from "../../types/auth/account";
import { Token } from "../../types/auth/token";

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
    (email: string, password: string) => {
      apiFetch<Token>("/auth/login", { json: { email, password } })
        .then((data) =>
          // setCookie("token", data.token, {
          //   expires: new Date(data.expires_at),
          // })
          console.log("TODO set cookie")
        )
        .then(authenticate)
        .then(() => window.location.assign("/"))
        .catch(() => console.log("TODO error"));
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
        .then((data) =>
          // setCookie("token", data.token, {
          //   expires: new Date(data.expires_at),
          // })
          console.log("TODO set cookie")
        )
        .then(authenticate)
        .then(() => window.location.assign("/"))
        .catch(() => console.log("TODO error"));
    },
    [authenticate]
  );

  const logout = useCallback(() => {
    apiFetch<Account>("/auth/logout", { method: "DELETE" })
      .then(() => console.log("TODO remove cookie"))
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
