import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import RecipePage from "./recipe/RecipePage";

export default function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
    </Routes>
  );
}
