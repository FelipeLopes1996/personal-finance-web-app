import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/authContext";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />;
      </AuthProvider>
    </QueryClientProvider>
  );
}
//teste
export default App;
