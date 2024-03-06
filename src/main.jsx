import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Home from "./components/Home/Home.jsx";
import Appointment from "./components/Appointment/Appointment.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import AuthProvider from "./components/providers/AuthProviders.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Profile from "./components/UserManagement/Profile.jsx";
import AddDoctor from "./components/UserManagement/AddDoctor/AddDoctor.jsx";
import MyAppointment from "./components/UserManagement/MyAppointment/MyAppointment.jsx";
import { HelmetProvider } from "react-helmet-async";
import ManageServices from "./components/UserManagement/ManageServices/ManageServices.jsx";
import UpdateService from "./components/UserManagement/UpdateService/UpdateService.jsx";
import ManageDoctor from "./components/UserManagement/ManageDoctor/ManageDoctor.jsx";
import UpdateDoctor from "./components/UserManagement/UpdateDoctor/UpdateDoctor.jsx";
import AllUser from "./components/UserManagement/AllUser/AllUser.jsx";
import AdminRoute from "./components/PrivateRoute/AdminRoute.jsx";
import Payment from "./components/UserManagement/Payment/Payment.jsx";
import PaymentHistory from "./components/UserManagement/PaymentHistory/PaymentHistory.jsx";
import Feedback from "./components/UserManagement/Feedback/Feedback.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "appointment",
        element: (
          <PrivateRoute>
            <Appointment></Appointment>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "myappointment",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "addDoctor",
        element: <AddDoctor></AddDoctor>,
      },
      {
        path: "manage-doctor",
        element: <ManageDoctor></ManageDoctor>,
      },
      {
        path: "manage-services",
        element: <ManageServices></ManageServices>,
      },
      {
        path: "/updateService/:id",
        element: <UpdateService></UpdateService>,
        loader: ({ params }) =>
          fetch(`https://doctors-insight-server.onrender.com/services/${params.id}`),
      },
      {
        path: "/updateDoctor/:id",
        element: <UpdateDoctor></UpdateDoctor>,
        loader: ({ params }) =>
          fetch(`https://doctors-insight-server.onrender.com/docInfo/${params.id}`),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`https://doctors-insight-server.onrender.com/appointment-payment/${params.id}`),
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "feedback",
        element: <Feedback></Feedback>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
