import React from 'react';
export default function DashboardFooterNav() {
	return (
		<nav className='navbar navbar-expand topnav_bg fixed-bottom' style={{"zIndex": '1', 'left': '34%'}}>
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
