import React from 'react';
export default function DashboardFooterNav() {
	return (
		<nav className='sb-topnav navbar navbar-expand topnav_bg'>
			<button
				className='btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0'
				id='sidebarToggle'
				href='#!'>
				<i className='fas fa-bars text-white'></i>
			</button>
			<a
				className='navbar-nav ms-auto  me-2 text-decoration-none   order-2 order-lg-1'
				href='https://wordpress.org/support/plugin/text-to-audio/#new-topic-0'
				target='_blank'>
				Support
			</a>
			<a
				className='navbar-nav ms-auto  me-2 text-decoration-none   order-2 order-lg-1'
				href='https://wordpress.org/support/plugin/text-to-audio/reviews/#new-post'
				target='_blank'>
				Give A Review
			</a>
			<a
				className='navbar-nav ms-auto  me-2 text-decoration-none   order-2 order-lg-1'
				href='https://wp-speech.azizulhasan.com/contact/'
				target='_blank'>
				Rquest a feature
			</a>
		</nav>
	);
}
