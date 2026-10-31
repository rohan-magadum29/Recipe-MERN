import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeInfo from "./components/RecipeInfo";
const queryClient = new QueryClient();

function App() {
  const routes = [
    {
      path: "/",
      element: <RecipeList />,
    },
    {
      path: "/recipe/:id",
      element: <RecipeInfo />,
    },
    {
      path: "/recipe/create",
      element: <RecipeForm />,
    },
    {
      path: "/recipe/update/:id",
      element: <RecipeForm isUpdate={true} />,
    },
  ];
  const router = createBrowserRouter(routes);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
