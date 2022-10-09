import httpStatus from 'http-status-codes';

/**
 * Return a success message with status code 200
 * @param body
 * @param headers
 * @returns {{body: string, statusCode: *}}
 */
export function success(body, headers = {}) {
	return buildResponse(httpStatus.OK, body, headers);
}

/**
 * Return a failure message with status code 500
 * @param body
 * @returns {{body: string, statusCode: *}}
 */
export function failure(body) {
	return buildResponse(httpStatus.INTERNAL_SERVER_ERROR, body);
}

/**
 * Return 400 for bad request
 * @param body
 * @returns {{body: string, statusCode: *}}
 */
export function badRequest(body) {
	return buildResponse(httpStatus.BAD_REQUEST, body);
}

/**
 * Return 404 for resource not found
 * @param body
 * @returns {{body: string, statusCode: *}}
 */
export function resourceNotFound(body) {
	return buildResponse(httpStatus.NOT_FOUND, body);
}

/**
 * Return 204 for no content
 * @param body
 * @returns {{body: string, statusCode: *}}
 */
export function noContent(body) {
	return buildResponse(httpStatus.NO_CONTENT, body);
}

/**
 * Build the response
 * @param statusCode
 * @param body
 * @param headers
 * @returns {{body: string, statusCode: *}}
 */
function buildResponse(statusCode, body, headers = {}) {
	return {
		statusCode,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
			...headers
		},
		body: JSON.stringify(body)
	};
}
