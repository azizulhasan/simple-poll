const getData = async (url = '', data = {}) => {
	// Default options are marked with *
	const response = await fetch(url, {
		// headers: {
		//   "Content-Type": "application/json",
		// },
		credentials: 'same-origin',
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		body: data, // body data type must match "Content-Type" header
	});
	const responseData = await response.json(); // parses JSON response into native JavaScript objects

	return responseData;
};

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

function submitVote(answer, totalvotes) {
	// e.stopPropagation();
	let form = new FormData();
	form.append('nonce', smpl.nonce);
	form.append('smpl_qid', answer.smpl_qid);
	form.append('smpl_aid', answer.smpl_aid);
	form.append('smpl_votes', answer.smpl_votes);
	form.append('totalvotes', totalvotes);
	form.append('action', 'give_vote');
	postData(smpl.ajax_url, form).then((res) => {
		console.log(res.data);
		if (res.data) {
			alert('Your vote is saved.');
		}
	});
}

function submitBlockVote(data) {
	let form = new FormData();
	form.append('nonce', smpl.nonce);
	form.append('data', JSON.stringify(data));
	form.append('action', 'give_block_vote');

	postData(smpl.ajax_url, form).then((res) => {
		console.log(res.data);
		// if (res.data) {
		// 	alert('Your vote is saved.');
		// }
	});
}
