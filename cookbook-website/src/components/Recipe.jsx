import { Button } from "@mui/material";
import { API } from "aws-amplify";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_RECIPE } from "../constants/reducerEvents";

export default function Recipe({ recipe }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteRecipe = () => {
    navigate("/");
    dispatch({ type: DELETE_RECIPE, payload: recipe });
  };
  return (
    <div>
      <div>{recipe.name}</div>
      <div>{recipe.totalTime}</div>
      <Button variant="contained" color="error" onClick={deleteRecipe}>
        Delete
      </Button>
      <div style={{ display: "flex" }}>
        <img height={100} src={recipe.image} />
        <div>
          <div>Ingredients:</div>
          <ul>
            {recipe.recipeIngredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          <div>Instructions:</div>
          <ul>
            {recipe.recipeInstructions.map((ins, i) => (
              <li key={i}>{ins}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>{JSON.stringify(recipe, null, 2)}</div>
    </div>
  );
}
