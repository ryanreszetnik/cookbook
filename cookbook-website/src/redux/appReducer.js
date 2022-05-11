import { combineReducers } from "redux";
import recipeReducer from "./reducers/recipeReducer.js";
import userReducer from "./reducers/userReducer.js";

const rootReducer = combineReducers({
  user: userReducer,
  recipes: recipeReducer,
});
export default rootReducer;
