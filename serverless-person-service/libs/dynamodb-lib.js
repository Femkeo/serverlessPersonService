import AWS from 'aws-sdk';

const client = new AWS.DynamoDB.DocumentClient();

export function call(action, params) {
	AWS.config.update({ region: process.env.REGION });

	const dynamoDb = new AWS.DynamoDB.DocumentClient();

	return dynamoDb[action](params).promise();
}

export default {
	get: async params => await client.get(params).promise(),
	put: async params => await client.put(params).promise(),
	query: async params => await client.query(params).promise(),
	update: async params => await client.update(params).promise(),
	delete: async params => await client.delete(params).promise(),
	scan: async params => await client.scan(params).promise()
};
