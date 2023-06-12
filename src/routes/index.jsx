import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Instructors from "../pages/Instructors";
import Classes from "../pages/Classes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import ManageClassess from "../pages/Dashboard/admin/ManageClassess";
import Profile from "../pages/Dashboard/Profile";
import AdminRoute from "./AdminRoute";
import AddClass from "../pages/Dashboard/instructor/AddClass";
import InstructorRoute from "./InstructorRoute";
import MyClasses from "../pages/Dashboard/instructor/MyClasses";
import StudentRoute from "./StudentRoute";
import MySelectedClass from "../pages/Dashboard/student/MySelectedClass";
import Payment from "../pages/Dashboard/student/Payment";
import MyEnrolledClass from "../pages/Dashboard/student/MyEnrolledClass";
import Payments from "../pages/Dashboard/student/Payments";

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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      { path: "/dashboard/profile", element: <Profile /> },
      { path: "/dashboard/classes", element: <ManageClassess /> },
      {
        path: "/dashboard/my-classes",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/add-class",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/my-selted-classes",
        element: (
          <StudentRoute>
            <MySelectedClass />
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <StudentRoute>
            <Payment />
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/my-enrilled-classes",
        element: (
          <StudentRoute>
            <MyEnrolledClass />
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <StudentRoute>
            <Payments />
          </StudentRoute>
        ),
      },
    ],
  },
]);
