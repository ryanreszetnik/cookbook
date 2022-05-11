const AWS = require("aws-sdk");
const Responses = require("../../common/API_Responses");
const Formatting = require("../../common/Formatting");
const Dynamo = require("../../common/dynamo");
const Socket = require("../../common/socket");
const Database = require("../../common/CommonDatabaseCalls");
const Tables = require("../../common/TableConstants");

const getUserData = async (sub) => {
  return await Dynamo.get(Tables.USERS, { sub: sub });
};
exports.handler = async (event) => {
  const sub = Formatting.getSub(event);
  return Responses._200(await getUserData(sub));
};
