import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "../pages/authentication/Authentication";
import Main from "../pages/main/Main";
import MainLayout from "../pages/main/MainLayout";
import AuthenticationLayout from "../pages/authentication/AuthenticationLayout";
import SignIn from "../pages/authentication/signin/SignIn";
import Register from "../pages/authentication/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Page Not Found</div>,
    children: [{ index: true, element: <Main /> }]
  },
  {
    path: "/auth",
    element: <AuthenticationLayout />,
    errorElement: <div>Page Not Found</div>,
    children: [
      { index: true, element: <Authentication /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "register", element: <Register /> }
    ]
  }
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
