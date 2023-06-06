import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Instructors from "../pages/Instructors";
import Classes from "../pages/Classes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

//Creating routs array
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/instructors", element: <Instructors /> },
      { path: "/classes", element: <Classes /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  //   {
  //     path: "/",
  //     element: <RootLayout />,
  //     children: [
  //       { path: "/", element: <Home /> },
  //       { path: "/instructors", element: <Instructors /> },
  //       { path: "/classes", element: <Classes /> },
  //     ],
  //   },
]);
