import { API } from "aws-amplify";
import React, { useState } from "react";

export default function RecipePreview({ recipe, onClick }) {
  return (
    <div
      style={{
        backgroundColor: "#eee",
        width: "150px",
        height: "200px",
        padding: 20,
        margin: 10,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        boxShadow: "#888 -6px 6px 4px ",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img height={150} src={recipe.image} />
      <div>{recipe.name}</div>
      <div>{recipe.totalTime}</div>
    </div>
  );
}
