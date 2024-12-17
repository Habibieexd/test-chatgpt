import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Pengaturan default query (contoh: retry 1 kali jika gagal)
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
