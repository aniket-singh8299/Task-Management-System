import { createBrowserRouter } from "react-router-dom";
import SignUp from "../SignUp";
import Login from "../Login";
import Admin from "../Component/Admin";
import User from "../Component/User";
import TaskAdd from "../Component/TaskAdd";
import Update from "../Component/Update";
import Layout from "../Component/Layout";
import UserDetails from "../Component/UserDetails";
import DeleteTask from "../Component/DeleteTask";
import TaskAddU from "../Component/TaskAddU";
import ViewTasks from "../Component/ViewTasks";

export let Projectrouting = createBrowserRouter([
  { 
    path: "/",
    element: <Layout />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/user/addtaskU/:id",  
    element: <TaskAddU />,
  },
  {
    path: "/user/details/:id",
    element: <UserDetails />,
  },
  {
    path: "/addtask/:id",
    element: <TaskAdd />,

  },
  {
    path: "/user/viewtask/:id",
    element: <ViewTasks/>,

  },

  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/delete/:id",
    element: <DeleteTask />,
  },
]);
