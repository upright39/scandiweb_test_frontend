import React from "react";
import ReactDOM from "react-dom/client";
//import reportWebVitals from './reportWebVitals';
import App from './App';
import ProductForm from './pages/ProductForm'
import "./styles/index.css";
import "./styles/styles.css"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/add_page",
    element: <ProductForm/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();