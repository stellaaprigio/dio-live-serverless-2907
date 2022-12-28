"use strict";
const AWS = require("aws-sdk");

/** @type {import('aws-lambda').APIGatewayProxyHandler} */
module.exports.handler = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    let items;

    try {
        const results = await dynamodb.scan({
            TableName: "ItemTable"
        }).promise();

        items = results.Items;

    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items),
    };
};
