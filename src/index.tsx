import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import App from "./App.tsx";
import store from "./redux/store.ts";

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
