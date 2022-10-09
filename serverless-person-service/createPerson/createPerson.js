import dynamoDbLib from '../libs/dynamodb-lib';
import { success } from '../libs/response-lib';

export const main = async event => {
    const tableName = process.env.PERSON_TABLE;

    const params = {
        TableName: tableName,
        Select: 'ALL_ATTRIBUTES'
    };

    try {
        const results = await dynamoDbLib.scan(params);
        return success(results);
    } catch (e) {
        throw new Error(e);
    }
};
