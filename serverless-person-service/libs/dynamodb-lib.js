import AWS from 'aws-sdk';

const client = new AWS.DynamoDB.DocumentClient();

/**
 * Call to dynamodb library
 * @param action
 * @param params
 * @returns {*}
 */
export function call(action, params) {
	AWS.config.update({ region: process.env.REGION });

	const dynamoDb = new AWS.DynamoDB.DocumentClient();

	return dynamoDb[action](params).promise();
}

export default {
	get: params => client.get(params).promise(),
	put: params => client.put(params).promise(),
	query: params => client.query(params).promise(),
	update: params => client.update(params).promise(),
	delete: params => client.delete(params).promise(),
	scan: params => client.scan(params).promise()
};
