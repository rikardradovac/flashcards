import React from "react";
import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import Sidebar from "../../components/sidebar";
import List from "../../components/list";

const MainPage = loadable(() => import("../main/main"));
const CardContainer = loadable(() => import("../card/cardcontainer"));

const AppRoutes = () => {
    return (
        <Sidebar>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/flashcards" element={<CardContainer />} />
                <Route path="/flashcards-list" element={<List />} />
            </Routes>
        </Sidebar>
    );
};

export default AppRoutes;
