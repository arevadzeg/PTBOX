import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScanDetails from "./pages/ScanDetails/ScanDetails";
import Home from "./pages/Home/Home";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: ":scanId/",
      element: <ScanDetails />,
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
