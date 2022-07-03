/**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @returns
 */
const postData = async (url = '', data = {}) => {
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

/**
 * Delete post
 */
const deletePost = async (url = '', data = {}) => {
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

// Create table headers consisting of 4 columns.
const STORY_HEADERS = [
	{
		prop: 'question',
		title: 'Question',
	},
	{
		prop: 'totalvotes',
		title: 'Total Votes',
	},
	{
		prop: 'shortcode',
		title: 'Short Code',
	},
	{
		prop: 'action',
		title: 'Action',
	},
];

/**
 * Add another question
 */
const addQuestion = () => {
	const icon_col = document.getElementById('add_question_col');
	const icon_row = document
		.getElementById('add_question_col')
		.firstChild.cloneNode(true);
	icon_col.appendChild(icon_row);
};

/**
 * Delete question row. If question row length is 1 then before deleting first row clone if
 * and append it to parrent row.
 */
const deleteQuestion = (e) => {
	let row = e.target.parentElement.parentElement; // get clicked row
	if (
		e.target.parentElement.parentElement.parentElement.childNodes.length ==
		1
	) {
		let rowClone =
			e.target.parentElement.parentElement.parentElement.firstChild.cloneNode(
				true,
			);
		e.target.parentElement.parentElement.parentElement.appendChild(
			rowClone,
		);
		e.target.parentElement.parentElement.parentElement.removeChild(row);
		document.getElementById('poll.question_answer').value = '';
	} else {
		e.target.parentElement.parentElement.parentElement.removeChild(row);
	}
};

export { postData, deletePost, addQuestion, deleteQuestion, STORY_HEADERS };
