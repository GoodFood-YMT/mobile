import { PropsWithChildren } from "react";
import { ReactQueryProvider } from "../react_query_provider";
import { AuthProvider } from "./auth_provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
}
