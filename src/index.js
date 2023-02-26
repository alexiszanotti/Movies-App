import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./redux/api/apiSlice";

import "../src/css/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApiProvider api={apiSlice}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiProvider>
);
