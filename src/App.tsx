import { BrowserRouter } from "react-router";
import { Router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner';

import "./app.css";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Toaster position="bottom-left" richColors />
    </QueryClientProvider>
  );
}
