import {failure, success} from "../libs/response-lib";
import { v4 as uuidv4 } from 'uuid';
import dynamoDbLib from "../libs/dynamodb-lib";
import AWS from "aws-sdk";

export const main = async event => {
    try {
        const params = setupParams(process.env.PERSON_TABLE, JSON.parse(event.body));
        await dynamoDbLib.put(params);
        await publishResult(`successfully stored a new person with id ${params.Item.id.toString()}`);
        return success();
    } catch (error) {
        await publishResult(`failed to store new person`, error.message);
        return failure({ error: error.message });
    }
};

const setupParams = (table, data) => {
    try {
        return {
            TableName: table,
            Item: fetchPersonFromData(data),
        };
    }
    catch(error) {
        throw new Error(error.message);
    }
};

const fetchPersonFromData = (data) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const phoneNumber = data.phoneNumber;
    const address = data.address;
    if ((firstName && lastName && phoneNumber && address) !== undefined) {
        return {
            "id": uuidv4(),
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": phoneNumber,
            "address": address
        };
    } else {
        throw new Error("All required fields should be provided");
    }
};

const publishResult = async (message) => {
    const sqsQueue = new AWS.SQS({
        apiVersion: 'latest',
        region: process.env.AWS_REGION,
    });

    await sqsQueue.sendMessage({
        QueueUrl: process.env.QUEUE_URL,
        // Any message data we want to send
        MessageBody: JSON.stringify({
            message: message
        }),
    }).promise();
};

