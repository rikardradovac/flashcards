import React from "react";
import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import Sidebar from "../../components/sidebar";
import List from "../list/list"
import Options from "../options/options"
import "./routes.css"

const MainPage = loadable(() => import("../main/main"));
const CardContainer = loadable(() => import("../card/cardcontainer"));
const TextGeneration = loadable(() => import("../text-generation/text-generation"))

const AppRoutes = () => {
    return (
        <Sidebar>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/flashcards" element={<CardContainer />} />
                <Route path="/flashcards-list" element={<List />} />
                <Route path="/text-generation" element={<TextGeneration />} />
                <Route path="/options" element={<Options />} />
            </Routes>
        </Sidebar>
    );
};

export default AppRoutes;
