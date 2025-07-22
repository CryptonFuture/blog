const accessToken = localStorage.getItem('token')

if (!accessToken) {
	window.location.href = '/';
}

const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`

const tokenType = localStorage.getItem('tokenType')
const access_Token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', function () {
	fetchDashboard()
	getSideBarRoutes()
})

function setupAutoLogout() {
	const expiryTime = localStorage.getItem('tokenExpiry');

	if (!expiryTime) return;

	const timeLeft = expiryTime - Date.now();

	if (timeLeft <= 0) {
		logout();
	} else {
		setTimeout(() => {
			logout();
		}, timeLeft);
	}
}

window.addEventListener('load', () => {
	setupAutoLogout();
});

async function logout() {

	const userId = localStorage.getItem('user')

	const res = await fetch(`${baseUrl}/logout?id=${userId}`, {
		method: 'POST',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok) {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('email');
		localStorage.removeItem('tokenType');
		localStorage.removeItem('rememberMe')
		localStorage.removeItem('rememberedEmail');
		localStorage.removeItem('rememberedPassword');
		localStorage.removeItem('tokenExpiry');

		Swal.fire({
			icon: 'success',
			title: 'Logout Successful',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			
			window.location.href = '/';

		});

	} else {
		Swal.fire({
			icon: 'error',
			title: 'Logout Failed',
			text: data.error
		});
	}
}

async function fetchDashboard() {
	const res = await fetch(`${baseUrl}/countAll`, {
		method: "GET",
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const counts = data.count

	Object.entries(counts).map(([key, item]) => {
		const card = `
			<div class="col-sm-3 mb-4">
				<div class="card border-0" style="background: #f5f7fa; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
					<div class="card-body text-center p-4">
						<div class="icon-container mb-3" style="width: 60px; height: 60px; background: #e1e5eb; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
						<i class="fas ${item.icon} fa-lg" style="color: #4a5568;"></i>
						</div>
						<h5 class="card-title">${item.title}</h5>
						<p class="card-text display-5 mb-3" style="color: #2d3748; font-weight: 700;">${item.total}</p>
						<div class="progress" style="height: 6px; background: #e2e8f0;">
						<div class="progress-bar" role="progressbar" style="width: 25%; background: #4a5568;"></div>
						</div>
					</div>
				</div>
			</div>
		`;
		document.getElementById('cardRow').insertAdjacentHTML('beforeend', card)
	})
}

async function getSideBarRoutes() {
	const res = await fetch(`${baseUrl}/getSideBarRoutes`, {
		method: "GET",
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const sideBarRoutes = data.data

	const sideBarRouteslist = document.getElementById('sidebarRoutes')

	sideBarRouteslist.innerHTML = '';

	sideBarRoutes.forEach((item, index) => {
		sideBarRouteslist.innerHTML += `
			<li class="active">
				<a onclick="showPage('${item.paramName}')"  class="nav-link">
					<i class="fas ${item.iconName2} mr-3"></i> ${item.routeName}
				</a>
        	</li>
			`
	})


}