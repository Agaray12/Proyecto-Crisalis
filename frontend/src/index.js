import React from "react";
import ReactDOM from "react-dom/client";
import SignIn from './components/pages/SignIn';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);