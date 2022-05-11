import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Recipe from "../../components/Recipe";

export default function RecipePage() {
  const { id } = useParams();
  const recipe = useSelector((state) =>
    state.recipes.find((r) => `${r.id}` === id)
  );
  return (
    <div>{recipe ? <Recipe recipe={recipe} /> : <div>Not found</div>}</div>
  );
}
