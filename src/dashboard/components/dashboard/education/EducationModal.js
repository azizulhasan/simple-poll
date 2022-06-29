import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { __ } from '@wordpress/i18n';

// components
import { getData, postData } from './EducationHooks';

export default function EducationModal({
	setEducationData,
	updateBtn,
	modalShow,
	lgShow,
}) {
	const [poll, setPolls] = useState({
		question: '',
		question_answer: '',
		question_answers: [{}],
	});

	useEffect(() => {
		// if (lgShow === true) {
		// 	if (updateBtn.id !== '') {
		// 		getEducationContent(updateBtn.id);
		// 	} else {
		// 		setPolls({
		// 			question: '',
		// 			question_answer: '',
		// 			question_answers: [{}],
		// 		});
		// 	}
		// }
	}, [lgShow]);

	/**
	 * get education content by id.
	 * @param {id} id
	 */
	const getEducationContent = (id) => {
		getData(process.env.REACT_APP_API_URL + '/api/education/' + id)
			.then((res) => {
				setPolls(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	/**
	 * Handle content change value.
	 * @param {event} e
	 */
	const handleChange = (e) => {
		setPolls({ ...poll, ...{ [e.target.name]: e.target.value } });
	};
	/**
	 * Handle education content form submission
	 * @param {event} e
	 * @returns
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		/**
		 * Get full form data and modify them for saving to database.
		 */
		let form = new FormData(e.target);
		let data = {};
		let answers = [];
		for (let [key, value] of form.entries()) {
			if (key === '' || value === '') {
				alert('Please fill the value of : ' + key);
				return;
			}

			if (key == 'question_answer') {
				answers.push(value);
			} else {
				data[key] = value;
			}
		}

		data['question_answers'] = answers;

		/**
		 * Update data if "nonce" exists. else save form data.
		 */
		if (data.nonce !== undefined) {
			postData(
				process.env.REACT_APP_API_URL + '/api/education/' + data.nonce,
				data,
			)
				.then((res) => {
					setEducationData(res.data);
					modalShow(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			postData(process.env.REACT_APP_API_URL + '/api/education', data)
				.then((res) => {
					console.log(res.data);
					setEducationData(res.data);
					modalShow(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

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
			e.target.parentElement.parentElement.parentElement.childNodes
				.length == 1
		) {
			let rowClone =
				e.target.parentElement.parentElement.parentElement.firstChild.cloneNode(
					true,
				);
			e.target.parentElement.parentElement.parentElement.appendChild(
				rowClone,
			);
			e.target.parentElement.parentElement.parentElement.removeChild(row);
			document.getElementById('poll.social_icon').value = '';
			document.getElementById('poll.question_answer').value = '';
		} else {
			e.target.parentElement.parentElement.parentElement.removeChild(row);
		}
	};

	return (
		<>
			<Button bsPrefix='wps_btn' onClick={(e) => modalShow(true)}>
				{__('Add Poll')}
			</Button>
			<Modal
				size='lg'
				show={lgShow}
				onHide={(e) => modalShow(false)}
				aria-labelledby='example-modal-sizes-title-lg'>
				<Modal.Header closeButton>
					<Modal.Title id='example-modal-sizes-title-lg'>
						{updateBtn.display
							? __('Update poll content')
							: __('Add poll content')}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						{updateBtn.display && (
							<Form.Control
								type='text'
								id='nonce'
								onChange={handleChange}
								value={poll.nonce}
								name='nonce'
								placeholder='nonce'
								hidden
							/>
						)}

						<Form.Group className='mb-4' controlId='poll.question'>
							<Form.Label>{__('Add Question')}</Form.Label>
							<Form.Control
								type='text'
								name='question'
								onChange={handleChange}
								value={poll.question}
								placeholder='question'
							/>
						</Form.Group>
						<Row id='poll.social_row' className='mb-4'>
							<Col
								xs={12}
								sm={12}
								lg={12}
								className='d-flex flex-col justify-content-start align-items-start mb-2'>
								<Button
									bsPrefix='wps_btn'
									onClick={addQuestion}
									id='poll.add_question'>
									{__('Add Answer')}
								</Button>
							</Col>
							<Col id='add_question_col'>
								{poll.question_answers ? (
									poll.question_answers.map((icon, i) => {
										return (
											<Row key={i} data-id={++i}>
												<Col
													xs={12}
													sm={12}
													lg={12}
													className='d-flex flex-col'>
													<Form.Group
														className='w-100'
														controlId={
															'poll.question_answer_' +
															i
														}>
														<Form.Label>
															{__('Answer ')}
														</Form.Label>
														<Form.Control
															type='text'
															name='question_answer'
															value={icon[i]}
															onChange={
																handleChange
															}
															placeholder='URL'
														/>
													</Form.Group>
													<button
														type='button'
														className='wps_btn'
														onClick={
															deleteQuestion
														}>
														{__('Delete')}
													</button>
												</Col>
											</Row>
										);
									})
								) : (
									<Row>
										<Col
											xs={12}
											sm={12}
											lg={12}
											className='d-flex flex-col'>
											<Form.Group
												className='w-100'
												controlId='poll.question_answer'>
												<Form.Label>
													{__('Answer ')}
												</Form.Label>
												<Form.Control
													type='text'
													name='question_answer'
													value={''}
													onChange={handleChange}
													placeholder='URL'
												/>
											</Form.Group>
											<button
												type='button'
												className='wps_btn'
												onClick={deleteQuestion}>
												{__('Delete')}
											</button>
										</Col>
									</Row>
								)}
							</Col>
						</Row>
						<button
							className='wps_btn w-100'
							type='submit'
							id='poll.sumbit'>
							{updateBtn.display
								? __('Update Poll')
								: __('Submit Poll')}
						</button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
