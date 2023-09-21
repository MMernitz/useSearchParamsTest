import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import ErrorPage from "./ErrorPage";
import Example from "./Example";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  { path: "/example", element: <Example />, errorElement: <ErrorPage /> }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
