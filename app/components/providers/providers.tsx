import { PropsWithChildren } from "react";
import { ReactQueryProvider } from "../react_query_provider";

export function Providers({ children }: PropsWithChildren) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
