import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.jsx";
import { ThemeProvider } from "./contexts/ThemeProvider";
import AuthProvider from "./contexts/AuthProvider";
import { CartProvider } from "./contexts/CartProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </CartProvider>
  </QueryClientProvider>
);
