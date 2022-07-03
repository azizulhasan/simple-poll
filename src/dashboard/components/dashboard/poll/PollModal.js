import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { __ } from '@wordpress/i18n';

// components
import { postData, deleteQuestion, addQuestion } from './PollHooks';
import notify from '../../context/Notify';

export default function PollModal({ setPollsData, updateBtn, modalShow }) {
	const [poll, setPoll] = useState({
		id: '',
		question: '',
		question_answer: '',
		question_answers: [{}],
	});

	useEffect(() => {
		if (updateBtn.display === true) {
			if (updateBtn.data) {
				setPoll(updateBtn.data);
			} else {
				setPoll({
					id: '',
					question: '',
					question_answer: '',
					question_answers: [{}],
				});
			}
		}
	}, [updateBtn]);

	/**
	 * Handle content change value.
	 * @param {event} e
	 */
	const handleChange = (e) => {
		setPoll({ ...poll, ...{ [e.target.name]: e.target.value } });
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
		let data = new FormData();
		let answers = [];
		for (let [key, value] of form.entries()) {
			if (key === '' || value === '') {
				alert('Please fill the value of : ' + key);
				return;
			}

			if (key == 'question_answer') {
				answers.push(value);
			} else {
				data.append(key, value);
			}
		}

		data.append('question_answers', answers);
		data.append('nonce', smpl.nonce);
		data.append('action', 'create_poll');

		/**
		 * Update data if "id" exists. else save form data.
		 */
		if (poll.id) {
			postData(smpl.ajax_url, data)
				.then((res) => {
					setPollsData(res.data);
					modalShow(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			postData(smpl.ajax_url, data)
				.then((res) => {
					setPollsData(res.data);
					modalShow(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	// Check if user admin.
	const openModal = (e) => {
		e.preventDefault();
		if (smpl.is_admin) {
			modalShow(true);
			return;
		}

		notify('Please login as aministrator', 'warn');
	};

	return (
		<>
			<Button bsPrefix='smpl_btn' onClick={(e) => openModal(e)}>
				{__('Add Poll')}
			</Button>
			<Modal
				size='lg'
				show={updateBtn.display}
				onHide={(e) => modalShow(false)}
				aria-labelledby='example-modal-sizes-title-lg'>
				<Modal.Header closeButton>
					<Modal.Title id='example-modal-sizes-title-lg'>
						{updateBtn.data
							? __('Update poll content')
							: __('Add poll content')}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						{poll.id && (
							<Form.Control
								type='text'
								id='id'
								onChange={handleChange}
								value={poll.id}
								name='id'
								placeholder='id'
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
									bsPrefix='smpl_btn'
									onClick={addQuestion}
									id='poll.add_question'>
									{__('Add Answer')}
								</Button>
							</Col>
							<Col id='add_question_col'>
								{poll.answers ? (
									poll.answers.map((answer, i) => {
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
															value={
																answer.smpl_answers
															}
															onChange={
																handleChange
															}
															placeholder='Answer'
														/>
													</Form.Group>
													<button
														type='button'
														className='smpl_btn'
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
													value={poll.question_answer}
													onChange={handleChange}
													placeholder='Answer'
												/>
											</Form.Group>
											<button
												type='button'
												className='smpl_btn'
												onClick={deleteQuestion}>
												{__('Delete')}
											</button>
										</Col>
									</Row>
								)}
							</Col>
						</Row>
						<button
							className='smpl_btn w-100'
							type='submit'
							id='poll.sumbit'>
							{updateBtn.data
								? __('Update Poll')
								: __('Submit Poll')}
						</button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
