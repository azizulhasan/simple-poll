import react, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { postData, deleteQuestion, addQuestion } from './block/utilities';
import { Button, Form, Row, Col } from 'react-bootstrap';
import notify from './block/Notify';

wp.blocks.registerBlockType('smpl/poll', {
	title: __('Smple poll'),
	description: __('This is simple poll discription.'),
	icon: 'businessperson',
	category: 'design',
	// attributes: {
	// 	companyName: { type: 'string' },
	// 	companyPhone: { type: 'string' },
	// 	companyContact: { type: 'string' },
	// 	companyAddress: { type: 'string' },
	// 	companyCity: { type: 'string' },
	// },
	attributes: {},

	edit: createPoll,

	save: function (props) {
		return <h1>Haaadfadf</h1>;
	},
});

function createPoll(props) {
	const [poll, setPoll] = useState({
		id: '',
		question: '',
		question_answer: '',
		question_answers: [{}],
	});

	// useEffect(() => {
	// 	if (updateBtn.display === true) {
	// 		if (updateBtn.data) {
	// 			setPoll(updateBtn.data);
	// 		} else {
	// 			setPoll({
	// 				id: '',
	// 				question: '',
	// 				question_answer: '',
	// 				question_answers: [{}],
	// 			});
	// 		}
	// 	}
	// }, [updateBtn]);

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

		if (!smpl_block.is_admin) {
			alert('please login as administrator.');
			return;
		}
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
		data.append('nonce', smpl_block.nonce);
		data.append('action', 'create_poll');

		/**
		 * Update data if "id" exists. else save form data.
		 */
		if (poll.id) {
			postData(smpl_block.ajax_url, data)
				.then((res) => {
					alert('Poll data is saved');
				})
				.catch((err) => {
					console.log(res.data);
				});
		} else {
			postData(smpl_block.ajax_url, data)
				.then((res) => {
					alert('Poll data is saved');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<div className='smpl_block'>
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
							bsPrefix='smpl_btn smpl_btn-primary'
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
													'poll.question_answer_' + i
												}>
												<Form.Label>
													{__('Answer ')}
												</Form.Label>
												<Form.Control
													type='text'
													name='question_answer'
													value={answer.smpl_answers}
													onChange={handleChange}
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
											value={poll.question_answer}
											onChange={handleChange}
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
						)}
					</Col>
				</Row>
				<button
					className='smpl_btn w-100'
					type='submit'
					id='poll.sumbit'>
					{__('Submit Poll')}
				</button>
			</Form>
		</div>
	);
}

function simplePoll(props) {
	const [poll, setPollData] = useState({
		id: '',
		question: 'Sample Question?',
		answers: [{ smpl_answers: 'yes' }, { smpl_answers: 'no' }],
		totalvotes: '0',
		current_answer_id: '',
	});
	useEffect(() => {
		let form = new FormData();
		form.append('nonce', smpl_block.nonce);
		form.append('action', 'get_last_poll');

		postData(smpl_block.ajax_url, form).then((res) => {
			if (res.data) {
				console.log(res.data);
				setPollData(res.data[0]);
			}
		});
	}, []);

	const submitVote = (e, answer, totalvotes) => {
		e.stopPropagation();
		e.target.checked = true;

		let form = new FormData();
		form.append('nonce', smpl_block.nonce);
		form.append('smpl_qid', answer.smpl_qid);
		form.append('smpl_aid', answer.smpl_aid);
		form.append('smpl_votes', answer.smpl_votes);
		form.append('totalvotes', totalvotes);
		form.append('action', 'give_vote');
		postData(smpl_block.ajax_url, form).then((res) => {
			if (res.data) {
				alert('Your vote is saved.');
			}
		});
	};

	return (
		<div className='sample_poll_block'>
			<h3>{poll.question}</h3>
			<div className='poll_answers'>
				{poll.answers.length &&
					poll.answers.map((answer) => {
						return (
							<>
								<input
									type='radio'
									name='smpl_answers'
									value={answer.smpl_answers}
									checked={
										answer.smpl_aid ===
										poll.current_answer_id
									}
									onChange={(e) =>
										submitVote(e, answer, poll.totalvotes)
									}
								/>
								<label htmlFor={answer.smpl_answers}>
									{__(answer.smpl_answers)}
								</label>
								<br></br>
							</>
						);
					})}
			</div>
		</div>
	);
}
