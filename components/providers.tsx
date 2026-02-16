import { queryClient } from "@/libs/api/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
