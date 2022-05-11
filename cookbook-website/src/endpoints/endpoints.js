import { API } from "aws-amplify";

export const appLoad = () => {};
export const deleteRecipe = async (recipe) => {
  await API.del("GeneralEndpoint", "/", { body: { url: recipe.url } });
};
