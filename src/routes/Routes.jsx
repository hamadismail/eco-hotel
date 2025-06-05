import { createBrowserRouter } from "react-router";
import App from "../App";
import Template from "../pages/Template";

export const Routes = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/template", Component: Template },
]);
