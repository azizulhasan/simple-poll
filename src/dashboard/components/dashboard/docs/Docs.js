import React from 'react';
import { Accordion, Table } from 'react-bootstrap';
import toast from '../../context/Notify';
export default function Docs() {
	/**
	 * Copy Code
	 */
	const copyToClipBoard = (id) => {
		/* Get the text field */
		var copyText = document.getElementById(id);

		/* Copy the text inside the text field */
		navigator.clipboard.writeText(copyText.innerText);

		/* Alert the copied text */
		toast('Copied to clipboard');
	};
	/**
	 * hooks
	 */
	const hooks = [
		{
			name: 'pvs_before_question',
			argument: '$poll $question',
			type: 'action',
		},
		{
			name: 'pvs_after_question',
			argument: '$poll $question',
			type: 'action',
		},
		{
			name: 'pvs_before_answer',
			argument: '$poll $answers',
			type: 'action',
		},
		{
			name: 'pvs_after_answer',
			argument: '$poll $answers',
			type: 'action',
		},
		{
			name: 'pvse_poll_answers',
			argument: '$answers',
			type: 'filter',
		},
	];

	/**
	 * hooks
	 */
	const restApi = [
		{
			endpoint: '/pvs/v1"',
			description: 'Poll base endpoint',
		},
		{
			endpoint: '/pvs/v1/polls',
			description: 'Get all polls',
		},
		{
			endpoint: '/pvs/v1/poll/(?P<id>[\\d]+)',
			description: 'Get single poll by passing `id` as argument',
		},
		{
			endpoint: '/pvs/v1/poll/(?P<id>[\\d]+)/votes',
			description: 'Get single poll\'s all votes',
		},
		{
			endpoint: '/pvs/v1/votes',
			description: 'Get all poll\'s votes',
		},
	];
	return (
		<Accordion>
			<Accordion.Item eventKey='1'>
				<Accordion.Header>
					1. How to add id to shortcode?
				</Accordion.Header>
				<Accordion.Body>
					<code>[pvs_poll id="Your_Id"]</code>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey='2'>
				<Accordion.Header>
					2. Poll  System Hooks Reference.
				</Accordion.Header>
				<Accordion.Body>
					<Table striped bordered hover size='sm'>
						<thead>
							<tr>
								<th>Sr.</th>
								<th>Hook Name</th>
								<th>Arguments</th>
								<th>Type</th>
							</tr>
						</thead>
						<tbody>
							{hooks.length &&
								hooks.map((filter, index) => {
									return (
										<tr key={filter.name}>
											<td>{++index}</td>
											<td>
												<code>{filter.name}</code>
											</td>
											<td>
												<code>{filter.argument}</code>
											</td>
											<td>
												<code>{filter.type}</code>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey='3'>
				<Accordion.Header>4. How to apply hooks.</Accordion.Header>
				<Accordion.Body>
					<button
						className=''
						onClick={(e) => copyToClipBoard('action_hook')}>
						Copy action hook
					</button>
					<div>
						<pre>
							<code id='action_hook'>
{`
	add_action( 'pvs_before_question', 'pvs_before_question_callback', 10, 2 );
	function pvs_before_question_callback ($poll, $qeustion) {
		// Your code here.
	}
`}
							</code>
						</pre>
					</div>

										<button
						className=''
						onClick={(e) => copyToClipBoard('filter_hook')}>
						Copy filter hook
					</button>
					<div>
						<pre>
							<code id='filter_hook'>
{`
	apply_filters( 'pvse_poll_answers', 'pvse_poll_answers_callback' );
	function pvse_poll_answers_callback ($answers) {
		// Your code here.
	}
`}
							</code>
						</pre>
					</div>
				</Accordion.Body>
			</Accordion.Item>
					<Accordion.Item eventKey='4'>
				<Accordion.Header>4. RestApi Endpoints.</Accordion.Header>
				<Accordion.Body>
					<Table striped bordered hover size='sm'>
						<thead>
							<tr>
								<th>Sr.</th>
								<th>Endpoints</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{restApi.length &&
								restApi.map((api, index) => {
									return (
										<tr key={api.endpoint}>
											<td>{++index}</td>
											<td>
												<code>{api.endpoint}</code>
											</td>
											<td>
												{api.description}
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey='5'>
				<Accordion.Header>
					5. How to add custom class to shortcode?
				</Accordion.Header>
				<Accordion.Body>
					Add your custom class as space saperated. example : { ' ' }
					<code>[pvs_poll customclass="classA classB"]</code>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey='6'>
				<Accordion.Header>
					6. How to add custom css to shortcode?
				</Accordion.Header>
				<Accordion.Body>
					<code>[pvs_poll customcss="custom css"]</code>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}
