import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Rootes from "../Roots/Rootes";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Rootes/>,
      children: [
        {
          path: "/",
          element: <Home/>,
          loader : () => fetch('http://localhost:5000/ProductsCounts')
        },
      ],
    },
  ]);

export default router