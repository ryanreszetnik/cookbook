import { API } from "aws-amplify";
import React, { useState } from "react";

export default function Recipe({ recipe }) {
  const [saved, setSaved] = useState(false);
  const saveRecipe = async () => {
    await API.put("GeneralEndpoint", "/", { body: recipe });
    setSaved(true);
  };
  return (
    <div>
      {saved && <div>SAVED</div>}
      <div>{recipe.name}</div>
      <div>{recipe.totalTime}</div>
      <button onClick={saveRecipe}>Save</button>
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
    </div>
  );
}
