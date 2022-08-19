import React from 'react';
import {
	BrowserRouter as Router,
	HashRouter,
	Routes,
	Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Scripts
 */
import './assets/css/bootstrap.css';
import './assets/css/simple-poll.css';
import DashboardFooterNav from './dasboardcontent/DashboardFooterNav';

/**
 * Dashboard Components
 */
import NavBar from './dasboardcontent/NavBar';
import Docs from './docs/Docs';
import Poll from './poll/Poll';

function Dashboard() {
	return (
		<HashRouter hashType='noslash'>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{/* <DashboardTopNav /> */}
			<div id='layoutSidenav'>
				<NavBar />
				<div id='layoutSidenav_content'>
					<main>
						<div className='container-fluid'>
							<Routes>
								<Route path='/' element={<Poll />} />
								<Route path='/docs' element={<Docs />} />
							</Routes>
						</div>
					</main>
					<DashboardFooterNav/>
				</div>
				
			</div>
		</HashRouter>
	);
}
export default Dashboard;
