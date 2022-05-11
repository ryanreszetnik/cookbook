import { SET_RECIPES, DELETE_RECIPE } from "../../constants/reducerEvents";
import { deleteRecipe } from "../../endpoints/endpoints";

const INITIAL_STATE = [];
export default function recipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_RECIPES:
      return action.payload;
    case DELETE_RECIPE:
      deleteRecipe(action.payload);
      return state.filter((r) => r.id !== action.payload.id);
    default:
      return state;
  }
}
