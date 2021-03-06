import React from "react";

import DashboardPage from "./pages/Dashboard";
import Datatable from "./pages/Datatable";
import Animation from "./pages/Animation/Animation";

import { Dashboard, TableChart, GraphicEq } from "@material-ui/icons";

export default [
  {
    title: "Dashboard",
    path: "/",
    icon: <Dashboard />,
    component: DashboardPage,
  },
  {
    title: "Data Table",
    path: "/datatable",
    icon: <TableChart />,
    component: Datatable,
  },
  {
    title: "Animation",
    path: "/animation",
    icon: <GraphicEq />,
    component: Animation,
  },
];
