"use strict";

const AWS = require("aws-sdk")

/** @type {import('aws-lambda').APIGatewayProxyHandler} */
module.exports.handler = async (event) => {

  const { itemStatus } = JSON.parse(event.body);
  const { id } = event.pathParameters

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb.update({
    TableName: "ItemTable",
    Key: { id },
    UpdateExpression: 'set itemStatus = :itemStatus',
    ExpressionAttributeValues: {
      ':itemStatus': itemStatus
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      { msg: 'Item updated' }
    ),
  };
};
