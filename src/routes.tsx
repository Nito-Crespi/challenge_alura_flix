import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Home from "./pages/Home/Home";
import NewVideo from "./pages/NewVideo/NewVideo";
import NotFound from "./pages/NotFound/NotFound";
import Player from "./pages/Player/Player";
import NewCategory from "./pages/NewCategory/NewCategory";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Home />} />
          <Route path="nuevo-video" element={<NewVideo />} />
          <Route path="nueva-categoria" element={<NewCategory />} />
          <Route path=":id" element={<Player />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
