import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider, } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

// Imports Componentes
import Login from './pages/Login';
import CriacaoUsuario from './pages/CriacaoUsuario';
import Menu from './pages/Menu';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <CriacaoUsuario />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  // {
  //   path: "/",
  //   element: <Login />,
  // },
  // {
  //   path: "/",
  //   element: <Login />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
