import React, { useEffect } from 'react';
import { postData, addQuestion, deleteQuestion } from './block/utilities';
import { Form, Row } from 'react-bootstrap';
const { InspectorControls  } = wp.blockEditor;
const { PanelBody  } = wp.components;

import { __ } from '@wordpress/i18n'


wp.blocks.registerBlockType('smpl/poll', {
	title: __('Smple poll'),
	description: __('This is simple poll discription.'),
	icon: 'chart-bar',
	category: 'design',
	keywords: ['poll'],

	attributes: {
		question: { type: 'string' },
		answers: { 
			type: 'array',
			default: []
		 },
		 id: {type: 'string'},
		polls: { 
			type: 'array',
			default: []
		 },
	},

	edit: createPoll,

	save: function (props) {
		return null;
	},
});

function createPoll(props) {

	useEffect(() => {
		let form = new FormData();
		form.append('nonce', smpl.nonce);
		form.append('action', 'get_polls');
		postData(smpl_block.ajax_url, form).then((res) => {
			if (res.data) {
				props.setAttributes({ polls: res.data });
			}
		});

	}, [] )
	const setQuestion = (e) => {
		props.setAttributes({ question: e.target.value });
		props.setAttributes({ answers: ['Yes', 'No'] });
	};

	const selectPoll = (e) => {
		let question = props.attributes.polls.filter(poll=> poll.id === e.target.value ); 
		props.setAttributes({ question: question[0].question });
		let answers = []
		question[0].answers.map(answer=> {
			answers.push( answer.smpl_answers )
		} );
		props.setAttributes({ id: e.target.value });
		props.setAttributes({ answers: answers });

	}
	return (
		[
			<InspectorControls >
				<PanelBody >
					<Form.Select defaultValue={props.attributes.question} onChange={selectPoll} aria-label="Default select example">
					<option disabled >Select question</option>
					{props.attributes.polls.length && props.attributes.polls.map( poll => {
						return  <option value={poll.id}> {poll.question} </option>
					}) }
					</Form.Select>
					
				</PanelBody >
			</InspectorControls >,
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
					<div>
						{props.attributes.answers.length && <Form>
							{props.attributes.answers.map((answer) => (
								<div key={`${answer}`} className="mb-3">
								<Form.Check 
									type={'radio'}
									id={`${answer}`}
									label={answer}
									value={answer}
								/>
								</div>
							))}
							</Form>}
					</div>
				</Form.Group>
			</Form>
		</div>
		]
	);
}
