import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { postData, deleteQuestion, addQuestion } from './block/utilities';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

wp.blocks.registerBlockType('smpl/poll', {
	title: __('Smple poll'),
	description: __('This is simple poll discription.'),
	icon: 'chart-bar',
	category: 'design',

	attributes: {
		clientId: { type: 'string' },
		question: { type: 'string' },
		answer: { type: 'array' },
	},

	edit: createPoll,

	save: function (props) {
		return null;
	},
});

function createPoll(props) {
	const [poll, setPoll] = useState({
		id: '',
		question: '',
		question_answer: '',
		question_answers: [],
	});

	useEffect(() => {
		document.querySelectorAll('.answer').forEach((item) => {
			item.addEventListener('keyup', function (e) {
				setPoll((prev) => {
					return {
						...prev,
						question_answers: [
							prev.question_answers.push(e.target.value),
						],
					};
				});

				console.log(poll);
			});
		});
		document
			.querySelector('.editor-post-publish-button__button')
			.addEventListener('click', function () {
				let form = new FormData(document.getElementById('poll_form'));
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
				data.append('nonce', smpl_block.nonce);
				data.append('action', 'create_poll');
				console.log(poll);
				return;
				/**
				 * Update data if "id" exists. else save form data.
				 */
				if (poll.id) {
					postData(smpl_block.ajax_url, data)
						.then((res) => {
							if (res.data) {
								alert('Poll data is saved');
							}
						})
						.catch((err) => {
							console.log(res.data);
						});
				} else {
					postData(smpl_block.ajax_url, data)
						.then((res) => {
							if (res.data) {
								alert('Poll data is saved');
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
			});
	}, []);

	/**
	 * Handle content change value.
	 * @param {event} e
	 */
	const handleChange = (e) => {
		setPoll({ ...poll, ...{ [e.target.name]: e.target.value } });
	};

	return (
		<div className='smpl_block'>
			<Form id='poll_form'>
				<Form.Control
					type='text'
					id='clientId'
					value={props.clientId}
					name='clientId'
					placeholder='clientId'
					hidden
				/>
				{poll.id && (
					<Form.Control
						type='text'
						id='id'
						value={props.id}
						name='client_id'
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
							bsPrefix='smpl_btn smpl_btn-primary'
							onClick={addQuestion}
							id='poll.add_question'>
							{__('Add Answer')}
						</Button>
					</Col>
					<Col id='add_question_col'>
						{poll.question_answers.length ? (
							poll.question_answers.map((answer, i) => {
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
													'poll.question_answer_' + i
												}>
												<Form.Label>
													{__('Answer ')}
												</Form.Label>
												<Form.Control
													type='text'
													name='question_answer'
													value={answer.smpl_answers}
													placeholder='Answer'
												/>
											</Form.Group>
											<button
												type='button'
												className='smpl_btn smpl_btn-primary'
												onClick={deleteQuestion}>
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
										<Form.Label>{__('Answer ')}</Form.Label>
										<Form.Control
											type='text'
											name='question_answer'
											placeholder='Answer'
											className='answer'
										/>
									</Form.Group>
									<button
										type='button'
										className='smpl_btn smpl_btn-primary'
										onClick={deleteQuestion}>
										{__('Delete')}
									</button>
								</Col>
							</Row>
						)}
					</Col>
				</Row>
			</Form>
		</div>
	);
}
