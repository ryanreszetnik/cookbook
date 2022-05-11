import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Recipe from "../../components/Recipe";
import RecipePreview from "../../components/RecipePreview";

export default function Home() {
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.recipes);
  const clickRecipe = (r) => {
    navigate(`/recipe/${r.id}`);
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {recipes.map((r) => (
        <RecipePreview key={r.url} recipe={r} onClick={() => clickRecipe(r)} />
      ))}
    </div>
  );
}
