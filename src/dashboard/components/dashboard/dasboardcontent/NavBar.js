import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<div id='layoutSidenav_nav'>
			<nav
				className='sb-sidenav accordion sb-sidenav-dark text-white'
				id='sidenavAccordion'>
				<div className='sb-sidenav-menu'>
					<div className='nav'>
						<Link className='nav-link active' to={'/'}>
							Manage Polls
						</Link>
						<Link className='nav-link' to={'/statistics'}>
							Polls Statistics
						</Link>

						{/* <Link className='nav-link' to={'/customize'}>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-edit'></i>
							</div>
							Customization
						</Link> */}
						{/* Settings menu */}
						{/* <Link className='nav-link' to={'/settings'}>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-wrench'></i>
							</div>
							Settings
						</Link> */}
						<Link className='nav-link' to={'/docs'}>
							<div className='sb-nav-link-icon'>
								<i className='fas fa-book'></i>
							</div>
							Docs
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
}
