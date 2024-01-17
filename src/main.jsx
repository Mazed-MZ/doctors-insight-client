import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Home from './components/Home/Home.jsx';
import Appointment from './components/Appointment/Appointment.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import AuthProvider from './components/providers/AuthProviders.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import Profile from './components/ProfileManagement/Profile.jsx';
import MyAppointment from './components/ProfileManagement/MyAppointment/MyAppointment.jsx';
import Admin from './components/ProfileManagement/AdminPanal/Admin.jsx';
import AvailableDoctors from './components/Home/Doctors/AvailableDoctors.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "appointment",
        element: <PrivateRoute><Appointment></Appointment></PrivateRoute>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "signup",
        element: <SignUp></SignUp>
      },
      {
        path: "profile",
        element: <Profile></Profile>
      },
      {
        path: "myappointment",
        element: <MyAppointment></MyAppointment>
      },
      {
        path: "admin",
        element: <Admin></Admin>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
