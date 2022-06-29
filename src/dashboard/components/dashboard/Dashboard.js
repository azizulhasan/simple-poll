import React, { useEffect, useMemo, useState, useCallback } from 'react';
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
import './assets/js/scripts.js';

/**
 * Dashboard Components
 */
import NavBar from './dasboardcontent/NavBar';
import Settings from './settings/Settings';
import Docs from './docs/Docs';
import Statistics from './statistics/Statistics';
import DashboardFooterNav from './dasboardcontent/DashboardFooterNav';
import Education from './education/Education';

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
								<Route path='/' element={<Education />} />
								<Route
									path={'/statistics'}
									element={<Statistics />}
								/>
								<Route
									path={'/settings'}
									element={<Settings />}
								/>
								<Route path='/docs' element={<Docs />} />
							</Routes>
						</div>
					</main>
					<footer className='py-4 mt-auto footer_bg'>
						<DashboardFooterNav />
					</footer>
				</div>
			</div>
		</HashRouter>
	);
}
export default Dashboard;
