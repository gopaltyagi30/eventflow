import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import DiscoverEvents from "../pages/DiscoverEvents";
import EventDetails from "../pages/EventDetails";
import MyEvents from "../pages/MyEvents";
import CreateEvent from "../pages/CreateEvent";
import ManageEvents from "../pages/ManageEvents";
import Settings from "../pages/Settings";
import Help from "../pages/Help";
import Analytics from "../pages/Analytics";
import AuthLayout from "../components/layout/AuthLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
const AppRoutes = () => {
  const router = createBrowserRouter([
    
    
    {
      path:"/",
      element:<AuthLayout/>,
      children:[
        {
          path:"",
          element:<Login/>
        },
        {
          path:"register",
          element:<Register/>
        },
        {
          path:"terms",
          element:<Terms/>
        },
        {
          path:"privacy",
          element:<Privacy/>
        }
      ]
    },{
      path: "/main",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "discover",
          element: <DiscoverEvents />,
        },
        {
          path: "my-events",
          element: <MyEvents />,
        },
        {
          path: "events/:eventId",
          element: <EventDetails />,
        },
        {
          path: "create",
          element: <CreateEvent />,
        },
        {
          path: "manage-events",
          element: <ManageEvents />,
        },
        {
          path: "edit-event/:eventId",
          element: <CreateEvent />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "help",
          element: <Help />,
        },
        {
          path: "analytics",
          element: <Analytics/>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRoutes;
