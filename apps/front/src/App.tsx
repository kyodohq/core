import { ThemeProvider } from "./stores/theme-provider";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <RouterProvider router={routes} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
