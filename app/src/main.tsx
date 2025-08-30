import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import AppRouter from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { AppStore } from "@/store/AppStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*Redux Store Provider*/}
    <Provider store={AppStore}>
      {/*Router Provider*/}
      <RouterProvider router={AppRouter} />
    </Provider>
  </StrictMode>
);
