import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "react-query/devtools";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
);
