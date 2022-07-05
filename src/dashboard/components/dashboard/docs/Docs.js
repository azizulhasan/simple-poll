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
	 * Filters
	 */
	const filters = [
		{
			name: 'smpl_before_question_answer',
			argument: '$question',
		},
		{
			name: 'smpl_after_question_answer',
			argument: '$question',
		},
	];
	return (
		<Accordion>
			<Accordion.Item eventKey='0'>
				<Accordion.Header>
					1. How to add id to shortcode?
				</Accordion.Header>
				<Accordion.Body>
					Add button text on shortcode as an attribute. Example :{' '}
					<code>[smpl_poll id="Your_Id"]</code>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey='1'>
				<Accordion.Header>
					3. Simple Poll Filter Hooks Reference.
				</Accordion.Header>
				<Accordion.Body>
					<Table striped bordered hover size='sm'>
						<thead>
							<tr>
								<th>Sr.</th>
								<th>Filter Name</th>
								<th>Arguments</th>
							</tr>
						</thead>
						<tbody>
							{filters.length &&
								filters.map((filter, index) => {
									return (
										<tr key={filter.name}>
											<td>{++index}</td>
											<td>
												<code>{filter.name}</code>
											</td>
											<td>
												<code>{filter.argument}</code>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey='3'>
				<Accordion.Header>4. How to apply filters.</Accordion.Header>
				<Accordion.Body>
					<button
						className=''
						onClick={(e) => copyToClipBoard('filter_hook')}>
						Copy short code to clipboard
					</button>
					<div>
						<pre>
							<code id='filter_hook'>
								{`
              add_filter( 'smpl_before_question_answer', 'smpl_before_question_answer_callback' );
              function smpl_before_question_answer_callback ($description) {
                  // Your code here.
              }
              `}
							</code>
						</pre>
					</div>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}
