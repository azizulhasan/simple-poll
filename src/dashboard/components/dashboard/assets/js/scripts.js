// window.addEventListener('DOMContentLoaded', (event) => {
// 	// Toggle the side navigation
// 	const sidebarToggle = document.body.querySelector('#sidebarToggle');
// 	if (sidebarToggle) {
// 		// Uncomment Below to persist sidebar toggle between refreshes
// 		// if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
// 		//     document.body.classList.toggle('sb-sidenav-toggled');
// 		// }
// 		sidebarToggle.addEventListener('click', (event) => {
// 			event.preventDefault();
// 			document.body.classList.toggle('sb-sidenav-toggled');
// 			localStorage.setItem(
// 				'sb|sidebar-toggle',
// 				document.body.classList.contains('sb-sidenav-toggled'),
// 			);

// 			if (
// 				window.innerWidth < 991 &&
// 				document.body.classList.contains('sb-sidenav-toggled')
// 			) {
// 				document.getElementById(
// 					'layoutSidenav_content',
// 				).style.marginLeft = '0';
// 			} else if (
// 				window.innerWidth > 991 &&
// 				document.body.classList.contains('sb-sidenav-toggled')
// 			) {
// 				document.getElementById(
// 					'layoutSidenav_content',
// 				).style.marginLeft = '-170px';
// 			} else {
// 				if (window.innerWidth > 550 && window.innerWidth < 991) {
// 					document.getElementById(
// 						'layoutSidenav_content',
// 					).style.marginLeft = '-150px';
// 				} else if (window.innerWidth < 576) {
// 					document.getElementById(
// 						'layoutSidenav_content',
// 					).style.marginLeft = '-150px';
// 				} else if (window.innerWidth > 991) {
// 					document.getElementById(
// 						'layoutSidenav_content',
// 					).style.marginLeft = '0px';
// 				}
// 			}
// 		});
// 	}
// });

// window.onresize = function () {
// 	if (window.innerWidth > 991) {
// 		document.getElementById('layoutSidenav_content').style.marginLeft = '0';
// 	} else if (window.innerWidth > 767 && window.innerWidth < 991) {
// 		document.getElementById('layoutSidenav_content').style.marginLeft =
// 			'-160px';
// 	} else if (window.innerWidth > 576 && window.innerWidth < 768) {
// 		document.getElementById('layoutSidenav_content').style.marginLeft =
// 			'-170px';
// 	} else if (window.innerWidth < 576) {
// 		document.getElementById('layoutSidenav_content').style.marginLeft =
// 			'-150px';
// 	}
// };
