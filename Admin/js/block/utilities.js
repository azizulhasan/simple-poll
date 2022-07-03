/**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @returns
 */
export const postData = async (url = '', data = {}) => {
	// Default options are marked with *
	const response = await fetch(url, {
		headers: {
			// 'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		credentials: 'same-origin',
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		body: data, // body data type must match "Content-Type" header
	});
	const responseData = await response.json(); // parses JSON response into native JavaScript objects

	return responseData;
};
