import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import AppRoutes from "../pages/main/routes";
import "./index.css";


const container = document.getElementById("target");
const root = createRoot(container);

root.render(
    <HashRouter>
        <AppRoutes />
    </HashRouter>
);
