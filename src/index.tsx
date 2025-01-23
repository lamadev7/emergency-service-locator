import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import store from "./redux/store.ts";
import "./index.css";

// Create a QueryClient instance
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
        <ToastContainer aria-label={undefined} />
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>
);
