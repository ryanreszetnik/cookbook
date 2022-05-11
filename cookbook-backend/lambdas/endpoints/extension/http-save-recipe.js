const AWS = require("aws-sdk");
const Responses = require("../../common/API_Responses");
const Formatting = require("../../common/Formatting");
const Dynamo = require("../../common/dynamo");
const Socket = require("../../common/socket");
const Database = require("../../common/CommonDatabaseCalls");
const Tables = require("../../common/TableConstants");
// const recipeScraper = require("recipe-scraper");

const saveRecipe = async (recipe, sub) => {
  console.log("saving", sub, recipe);
  const user = await Dynamo.get(Tables.USERS, { sub: sub });
  console.log("got user", user);
  const newRecipes = [
    ...(user.hasOwnProperty("recipes")
      ? user.recipes.filter((r) => r && r.url !== recipe.url)
      : []),
    recipe,
  ];
  await Dynamo.update(Tables.USERS, "sub", { sub: sub, recipes: newRecipes });
};

exports.handler = async (event) => {
  const eventData = Formatting.ensureObject(event.body);
  const sub = Formatting.getSub(event);
  await saveRecipe(eventData, sub);
  return Responses._200();
};
