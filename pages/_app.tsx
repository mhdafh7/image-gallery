import { ModalProvider } from "@/context/ModalContext";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </QueryClientProvider>
  );
}
