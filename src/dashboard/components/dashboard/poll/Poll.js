import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import { __ } from '@wordpress/i18n';
/**
 * Hooks
 */
import { deletePost, STORY_HEADERS, postData } from './PollHooks';

/**
 * Components
 */
import PollModal from './PollModal';
import './poll.css';
import notify from '../../context/Notify';

// Then, use it in a component.
export default function Poll() {
	const [polls, setPollsData] = useState([]);
	const [updateBtn, setUpdateBtn] = useState({ display: false, data: '' });
	/**
	 * This method is called when education data is posted or updated by modal.
	 * @param {data} data
	 */
	const setPolls = (data) => {
		setPollsData(data);
	};
	/**
	 *
	 * @param {value} value true or false.
	 * @param {id} id get id if want to edit specific education.
	 */
	const modalShow = (value, data = null) => {
		if (value == true || data !== null) {
			setUpdateBtn({ display: true, data: data });
		} else {
			setUpdateBtn({ display: false, data: data });
		}
	};
	/**
	 *
	 * @param {id} id get the specific id which want to be deleted.
	 */
	const deleteEducation = (id) => {
		if (confirm('Are you sure? It will be permanently deleted.')) {
			let data = new FormData();
			data.append('id', id);
			data.append('nonce', smpl.nonce);
			data.append('action', 'delete_poll');
			deletePost(smpl.ajax_url, data)
				.then((res) => {
					if (res.data) {
						setPollsData(res.data);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		let form = new FormData();
		form.append('nonce', smpl.nonce);
		form.append('action', 'get_polls');
		postData(smpl.ajax_url, form).then((res) => {
			if (res.data) {
				setPollsData(res.data);
			}
		});
	}, []);

	//Copy short Code
	function copyshortcode(id) {
		/* Get the text field */
		var copyText = document.getElementById('smpl_btn_shortcode_' + id);

		/* Copy the text inside the text field */
		navigator.clipboard.writeText(copyText.value);

		/* Alert the copied text */
		notify('Copied the text: ' + copyText.value);
	}

	return (
		<React.Fragment>
			<Row className='mb-4 p-2'>
				<Col
					xs={12}
					lg={12}
					className='d-flex flex-col justify-content-start align-items-start'>
					<PollModal
						updateBtn={updateBtn}
						modalShow={modalShow}
						setPollsData={setPolls}
					/>
				</Col>
			</Row>
			<Table bordered>
				<thead>
					<tr>
						{STORY_HEADERS.map((hearder) => (
							<th key={hearder.prop}>{hearder.title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{polls.length &&
						polls.map((poll, index) => (
							<tr key={index}>
								{Object.keys(poll).map((key) => {
									if (
										key === 'question' ||
										key === 'totalvotes'
									) {
										return (
											<td
												key={key}
												dangerouslySetInnerHTML={{
													__html: poll[key],
												}}></td>
										);
									}
								})}
								<td>
									<input
										type='text'
										name='smpl_btn_shortcode'
										id={
											'smpl_btn_shortcode_' +
											polls[index].id
										}
										value={
											'[smpl_poll id="' +
											polls[index].id +
											'"]'
										}
										readOnly
										title={__('Short code')}
									/>
									<button
										type='button'
										className='smpl_btn'
										onClick={(e) =>
											copyshortcode(polls[index].id)
										}>
										{__('Copy')}
									</button>
								</td>
								<td>
									<Button
										className='mr-2'
										bsPrefix='smpl_btn smpl_btn_edit'
										onClick={(e) =>
											modalShow(true, polls[index])
										}>
										{__('Edit')}
									</Button>
									<Button
										bsPrefix='smpl_btn'
										onClick={(e) =>
											deleteEducation(polls[index].id)
										}>
										{__('Delete')}
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</React.Fragment>
	);
}
