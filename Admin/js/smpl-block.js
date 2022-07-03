import { __ } from '@wordpress/i18n';
import react, { useCallback, useEffect, useState } from 'react';
import { postData } from './block/utilities';
import notify from './block/Notify';

wp.blocks.registerBlockType('smpl/shortcode', {
	title: __('Smple poll'),
	description: __('This is simple poll discription.'),
	icon: 'businessperson',
	category: 'design',
	attributes: {
		companyName: { type: 'string' },
		companyPhone: { type: 'string' },
		companyContact: { type: 'string' },
		companyAddress: { type: 'string' },
		companyCity: { type: 'string' },
	},

	edit: simplePoll,

	save: function (props) {
		return null;
	},
});

function simplePoll(props) {
	const [poll, setPollData] = useState({
		id: '',
		question: 'Sample Question?',
		answers: [{ smpl_answers: 'yes' }, { smpl_answers: 'no' }],
		totalvotes: '0',
	});
	useEffect(() => {
		let form = new FormData();
		form.append('nonce', smpl_block.nonce);
		form.append('action', 'get_last_poll');

		postData(smpl_block.ajax_url, form).then((res) => {
			if (res.data) {
				console.log(res.data[0]);
				setPollData(res.data[0]);
			}
		});
	}, []);

	const submitVote = (e, answer, totalvotes) => {
		let form = new FormData();
		form.append('nonce', smpl_block.nonce);
		form.append('smpl_qid', answer.smpl_qid);
		form.append('smpl_aid', answer.smpl_aid);
		form.append('smpl_votes', answer.smpl_votes);
		form.append('totalvotes', totalvotes);
		form.append('action', 'give_vote');
		postData(smpl_block.ajax_url, form).then((res) => {
			if (res.data) {
				notify('Your vote is recorded.');
			}
		});
	};

	function updateCompanyPhone(e) {
		props.setAttributes({ companyPhone: e.target.value });
	}

	return (
		<div className='makeUpYourBlockTypeName'>
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
									onClick={(e) =>
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

			{/* <input
				type='text'
				value={props.attributes.companyName}
				onChange={updateCompanyName}
				placeholder='company name'
			/>
			<input
				type='text'
				value={props.attributes.companyPhone}
				onChange={updateCompanyPhone}
				placeholder='company phone'
			/> */}
		</div>
	);
}
