import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { postData, addQuestion, deleteQuestion } from './block/utilities';
import { Form, Row } from 'react-bootstrap';

wp.blocks.registerBlockType('smpl/poll', {
	title: __('Smple poll'),
	description: __('This is simple poll discription.'),
	icon: 'chart-bar',
	category: 'design',
	keywords: ['poll'],

	attributes: {
		question: { type: 'string' },
		answers: { type: 'array' },
	},

	edit: createPoll,

	save: function (props) {
		return null;
	},
});

function createPoll(props) {
	const setQuestion = (e) => {
		props.setAttributes({ question: e.target.value });
		props.setAttributes({ answers: ['Yes', 'No'] });
	};
	return (
		<div className='smpl_block'>
			<Form id='poll_form'>
				{props.attributes.post_id && (
					<Form.Control
						type='text'
						id='id'
						value={props.attributes.post_id}
						name='post_id'
						placeholder='id'
						hidden
					/>
				)}
				<Form.Group className='mb-4' controlId='poll.question'>
					<div>
						<Form.Label>{__('Add Question')}</Form.Label>
					</div>
					<div>
						<Form.Control
							type='text'
							name='question'
							style={{ width: '100%' }}
							onChange={setQuestion}
							value={props.attributes.question}
							placeholder='question'
						/>
					</div>
				</Form.Group>
			</Form>
		</div>
	);
}
