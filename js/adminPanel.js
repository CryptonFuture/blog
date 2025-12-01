 var fullHeight = function () {

    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function () {
      $('.js-fullheight').css('height', $(window).height());
    });

  };
  fullHeight();

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });

  
  
const accessToken = localStorage.getItem('token')

if (!accessToken) {
	window.location.href = '/';
}

const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`
let selectedPostId = null;
let selectedTagId = null
let selectedPageId = null
let selectedUserId = null
let selectedPermissionId = null
let selectedCategoryId = null
let selectedContactUsId = null
let selectedRequestId = null;
let selectedRejectedtId = null
let selectedModuleType = ''; 
let selectedTagModuleType = ''; 

let currentPage = 1;
const limit = 5;
let totalPages = 1;

let currentUnPublishedPage = 1;
let totalUnPublishedPages = 1;

let currentTagPage = 1;
let totalTagPages = 1;

let currentPagePage = 1;
let totalPagePages = 1;

let currentActiveUserPage = 1;
let totalActiveUserPages = 1

let currentInActiveUserPage = 1;
let totalInActiveUserPages = 1

let currentLogsPage = 1;
let totalLogsPages = 1

let filters = {
	status: "",
	date: "",
};

let tagFilters = {
	tagStatus: "",
	tagDate: "",
};

let pageFilters = {
	pageStatus: "",
	pageDate: "",
};

let ActiveUserFilters = {
	ActiveUserStatus: "",
	ActiveUserDate: "",
};

let InActiveUserFilters = {
	InActiveUserStatus: "",
	InActiveUserDate: "",
};

let Logsfilters = {
	loginTime: "",
	logoutTime: "",
	date: "",
};

const firstname = localStorage.getItem('firstname') || ""
const lastname = localStorage.getItem('lastname') || ""
const emailAddress = localStorage.getItem('email') || ""
const image = localStorage.getItem('image')

const fullname = `${firstname} ${lastname}`.trim()

document.getElementById('username').textContent = fullname || "No User Found"
document.getElementById('email').textContent = emailAddress || "No User Found"

if (image && image !== "null" && image !== "undefined") {
  userImage.style.backgroundImage = `url(${image})`;
} else {
  userImage.style.backgroundImage = `url('/images/logo.jpg')`;
}



const tokenType = localStorage.getItem('tokenType')
const access_Token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', function () {
	fetchLogsConfig()
	fetchDashboard()
	getSideBarRoutes()
	fetchPublishedPost()
	fetchUnPublishedPost()
	fetchTag()
	// viewPost()
	fetchAllUser()
	fetchAllTag()
	viewAllPost()
	fetchTrackingLogs()
	fetchPages()
	fetchAllPage()
	fetchActiveUser()
	fetchInActiveUser()
	countUnPublishedPost()
	countPublishedPost()
	countTag()
	countPage()
	countActiveUser()
	countInActiveUser()
	viewProfile()
	editProfile()
	fetchLogs()
	countLogs()
	getRequest()
	getModule()
	countRequest()
	fetchRole('.add-user-role')
	fetchRole('.edit-user-role')
	getRole()
	getPermission()
	getRoutes()
	getEditRoutes()
	countPermission()
	getUserInActive()
	fetchCategory()
	countCategory()
	getRequested()
	getInActiveRequest()
	countInActiveRequest()
	countActiveRequest()
	fetchContactUs()
	loadHistory();
	
	
	const selectAll = document.getElementById('select-all');
	const deleteBtn = document.getElementById('delete-all-btn');

	function updateDeleteButtonVisibility() {
      const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
      if (selectedCheckboxes.length > 0) {
        deleteBtn.classList.remove('d-none');
      } else {
        deleteBtn.classList.add('d-none');
      }
    }

    selectAll.addEventListener('change', function () {
      const checkboxes = document.querySelectorAll('.row-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
      });
	  updateDeleteButtonVisibility()
    });

	 document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox')) {
        const all = document.querySelectorAll('.row-checkbox');
        const checked = document.querySelectorAll('.row-checkbox:checked');
        selectAll.checked = all.length === checked.length;

		  updateDeleteButtonVisibility()
      }
    });

	const selectAllTag = document.getElementById('select-all-tag');
	const deleteBtnTag = document.getElementById('delete-all-btn-tag');

	function updateDeleteButtonVisibilityTag() {
      const selectedCheckboxesTag = document.querySelectorAll('.row-checkbox-tag:checked');
      if (selectedCheckboxesTag.length > 0) {
        deleteBtnTag.classList.remove('d-none');
      } else {
        deleteBtnTag.classList.add('d-none');
      }
    }

    selectAllTag.addEventListener('change', function () {
      const checkboxesTag = document.querySelectorAll('.row-checkbox-tag');
      checkboxesTag.forEach(checkboxTag => {
        checkboxTag.checked = selectAllTag.checked;
      });
	  updateDeleteButtonVisibilityTag()
    });

	 document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox-tag')) {
        const all = document.querySelectorAll('.row-checkbox-tag');
        const checked = document.querySelectorAll('.row-checkbox-tag:checked');
        selectAllTag.checked = all.length === checked.length;

		  updateDeleteButtonVisibilityTag()
      }
    });

	const selectAllPage = document.getElementById('select-all-page');
	const deleteBtnPage = document.getElementById('delete-all-btn-page');

	function updateDeleteButtonVisibilityPage() {
      const selectedCheckboxesPage = document.querySelectorAll('.row-checkbox-page:checked');
      if (selectedCheckboxesPage.length > 0) {
        deleteBtnPage.classList.remove('d-none');
      } else {
        deleteBtnPage.classList.add('d-none');
      }
    }

    selectAllTag.addEventListener('change', function () {
      const checkboxesPage = document.querySelectorAll('.row-checkbox-page');
      checkboxesPage.forEach(checkboxPage => {
        checkboxPage.checked = selectAllPage.checked;
      });
	  updateDeleteButtonVisibilityPage()
    });

	 document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox-page')) {
        const all = document.querySelectorAll('.row-checkbox-page');
        const checked = document.querySelectorAll('.row-checkbox-page:checked');
        selectAllPage.checked = all.length === checked.length;

		  updateDeleteButtonVisibilityPage()
      }
    });

	const selectAllUser = document.getElementById('select-all-user');
	const deleteBtnUser = document.getElementById('delete-all-btn-user');

	function updateDeleteButtonVisibilityUser() {
      const selectedCheckboxesUser = document.querySelectorAll('.row-checkbox-active-user:checked');
      if (selectedCheckboxesUser.length > 0) {
        deleteBtnUser.classList.remove('d-none');
      } else {
        deleteBtnUser.classList.add('d-none');
      }
    }

    selectAllUser.addEventListener('change', function () {
      const checkboxesUser = document.querySelectorAll('.row-checkbox-active-user');
      checkboxesUser.forEach(checkboxUser => {
        checkboxUser.checked = selectAllUser.checked;
      });
	  updateDeleteButtonVisibilityUser()
    });

	 document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox-active-user')) {
        const all = document.querySelectorAll('.row-checkbox-active-user');
        const checked = document.querySelectorAll('.row-checkbox-active-user:checked');
        selectAllUser.checked = all.length === checked.length;

		  updateDeleteButtonVisibilityUser()
      }
    });

	const selectAllInActiveUser = document.getElementById('select-all-inActive-user');
	const deleteBtnInActiveUser = document.getElementById('delete-all-btn-inActive-user');

	function updateInActiveDeleteButtonVisibilityUser() {
      const selectedCheckboxesUser = document.querySelectorAll('.row-checkbox-inactive-user:checked');
      if (selectedCheckboxesUser.length > 0) {
        deleteBtnInActiveUser.classList.remove('d-none');
      } else {
        deleteBtnInActiveUser.classList.add('d-none');
      }
    }

    selectAllInActiveUser.addEventListener('change', function () {
      const checkboxesUser = document.querySelectorAll('.row-checkbox-inactive-user');
      checkboxesUser.forEach(checkboxInActiveUser => {
        checkboxInActiveUser.checked = selectAllInActiveUser.checked;
      });
	  updateInActiveDeleteButtonVisibilityUser()
    });

	 document.addEventListener('change', function (e) {
      if (e.target.classList.contains('row-checkbox-inactive-user')) {
        const all = document.querySelectorAll('.row-checkbox-inactive-user');
        const checked = document.querySelectorAll('.row-checkbox-inactive-user:checked');
        selectAllInActiveUser.checked = all.length === checked.length;

		  updateInActiveDeleteButtonVisibilityUser()
      }
    });
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
		localStorage.removeItem('firstname');
    	localStorage.removeItem('lastname');
		localStorage.removeItem('rememberMe')
		localStorage.removeItem('rememberedEmail');
		localStorage.removeItem('rememberedPassword');
		localStorage.removeItem('tokenExpiry');
		localStorage.removeItem('role');
		localStorage.removeItem('is_admin');
		localStorage.removeItem('image');


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

async function viewProfile() {
	const userId = localStorage.getItem('user')

	const res = await fetch(`${baseUrl}/viewProfileById/${userId}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (!data.success || !data.data || data.data.length === 0) {
	 document.getElementById('notFound').innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-profile-name').innerHTML = ` <span> ${view.firstname ? view.firstname : '----------'} ${view.lastname ? view.lastname : '----------'} </span>`
		document.getElementById('view-profile-email').innerHTML = ` <span> ${view.email ? view.email : '----------'} </span>`
		document.getElementById('view-profile-phone').innerHTML = ` <span> ${view.phone ? view.phone : '----------'} </span>`
		document.getElementById('view-profile-address').innerHTML = ` <span> ${view.address ? view.address : '----------'} </span>`
		document.getElementById('view-profile-cover-image').innerHTML = `<img src="${view.image ? view.image : '----------'}" 
                      class="cover-photo"  
                      alt="Cover Photo">`
		document.getElementById('view-profile-image').innerHTML = ` <img src="${view.image ? view.image : '----------'}" 
                      class="profile-picture" 
                      alt="Profile Picture">`
		document.getElementById('delete-button').innerHTML = ` <button onclick="deleteUserProfile()" class="btn btn-danger mt-3">
                            <i class="bi bi-trash-fill me-2"></i>
                            Delete Account
                        </button>`
	} 
	else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete post: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function editProfile() {
	const userId = localStorage.getItem('user')

	const res = await fetch(`${baseUrl}/editProfileById/${userId}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('edit-profile-firstname').value = view.firstname
		document.getElementById('edit-profile-lastname').value = view.lastname
		document.getElementById('edit-profile-email').value = view.email
		document.getElementById('edit-profile-phone').value = view.phone
		document.getElementById('edit-profile-address').value = view.address
		if (view.image) {
			document.getElementById('edit-profile-cover').src = view.image
		}

		if (view.image) {
			document.getElementById('edit-profile-avatar').src = view.image
		}

	
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete post: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
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

	const userRole = Number(localStorage.getItem('role')); //

	const filteredCounts = Object.values(counts).filter(item => {
		if (Array.isArray(item.role)) {
			return item.role.includes(userRole);
		}
		return Number(item.role) === userRole;
		});

	document.getElementById('cardRow').innerHTML = '';

	filteredCounts.forEach(item => {
		const card = `
			<div class="col-sm-3 mb-4">
				<div class="card border-0" style="background: #f5f7fa; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
					<div class="card-body text-center p-4">
						<div class="icon-container mb-3" style="width: 60px; height: 60px; background: #e1e5eb; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
						<i class="fas ${item.icon} fa-lg" style="color: #4a5568;"></i>
						</div>
						<h6 class="card-title">${item.title}</h6>
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

	const role = Number(localStorage.getItem('role')) || 0
	
	const sideBarRoutes = data.data || [];

	const sideBarRouteslist = document.getElementById('sidebarRoutes')

	sideBarRouteslist.innerHTML = '';

	const filteredRoutes = sideBarRoutes.filter(route => {
		if (Array.isArray(route.role)) {
			return route.role.includes(role);
		}
		return Number(route.role) === role;
	});

	
	filteredRoutes.forEach((item, index) => {
		
			sideBarRouteslist.innerHTML += `
			<li class="active">
				<a onclick="showPage('${item.paramName}')"  class="nav-link">
					<i class="fas ${item.iconName2} mr-3"></i> ${item.routeName}
				</a>
        	</li>
			`
		
	})
}



function applyFilters() {
	filters.status = document.getElementById('statusFilter').value;
	filters.date = document.getElementById('date').value;

	currentPage = 1;

	fetchPublishedPost();
}

function LogsApplyFilters() {
	Logsfilters.date = document.getElementById('date').value;
	Logsfilters.loginTime = document.getElementById('login-time').value;
	Logsfilters.logoutTime = document.getElementById('logout-time').value;

	currentLogsPage = 1;

	fetchLogs();
}

function TagApplyFilters() {
	tagFilters.tagStatus = document.getElementById('tagStatusFilter').value;
	tagFilters.tagDate = document.getElementById('tagDate').value;

	currentTagPage = 1;

	fetchTag();
}

function PageApplyFilters() {
	pageFilters.pageStatus = document.getElementById('pageStatusFilter').value;
	pageFilters.pageDate = document.getElementById('pageDate').value;

	currentPagePage = 1;

	fetchPages();
}

function UserApplyActiveFilters() {
	document.getElementById('ActiveUserStatusFilter').value = "";
	document.getElementById('ActiveUserDate').value = "";

	ActiveUserFilters.ActiveUserStatus = "";
	ActiveUserFilters.ActiveUserDate = "";

	fetchActiveUser();
}

function UserApplyInActiveFilters() {

	fetchInActiveUser();
}

function clearFilters() {
	document.getElementById('statusFilter').value = "";
	document.getElementById('date').value = "";

	filters.status = "";
	filters.date = "";

	currentPage = 1;

}

function resetFilters() {
	document.getElementById('statusFilter').value = "";
	document.getElementById('date').value = "";

	filters.status = "";
	filters.date = "";

	currentPage = 1;
	fetchPublishedPost();
	countPublishedPost()	
}

function LogsResetFilters() {
	document.getElementById('date').value = "";
	document.getElementById('login-time').value = "";
	document.getElementById('logout-time').value = "";

	Logsfilters.date = "";
	Logsfilters.loginTime = "";
	Logsfilters.logoutTime = ""

	currentLogsPage = 1;
	fetchLogs();
	countLogs()	
}

function logsClearFilters() {
	document.getElementById('login-time').value = "";
	document.getElementById('logout-time').value = "";

	Logsfilters.loginTime = "";
	Logsfilters.logoutTime = "";

	currentLogsPage = 1;

}

function tagClearFilters() {
	document.getElementById('tagStatusFilter').value = "";
	document.getElementById('tagDate').value = "";

	tagFilters.tagStatus = "";
	tagFilters.tagDate = "";

	currentTagPage = 1;

}

function tagResetFilters() {
	document.getElementById('tagStatusFilter').value = "";
	document.getElementById('tagDate').value = "";

	tagFilters.tagStatus = "";
	tagFilters.tagDate = "";

	currentTagPage = 1;
	fetchTag();
	countTag()	
}

function pageClearFilters() {
	document.getElementById('pageStatusFilter').value = "";
	document.getElementById('pageDate').value = "";

	pageFilters.pageStatus = "";
	pageFilters.pageDate = "";

	currentPagePage = 1;

}

function pageResetFilters() {
	document.getElementById('pageStatusFilter').value = "";
	document.getElementById('pageDate').value = "";

	pageFilters.pageStatus = "";
	pageFilters.pageDate = "";

	currentPagePage = 1;
	fetchPages();
	countPage()	
}

function userActiveClearFilters() {
	document.getElementById('ActiveUserStatusFilter').value = "";
	document.getElementById('ActiveUserDate').value = "";

	ActiveUserFilters.ActiveUserStatus = "";
	ActiveUserFilters.ActiveUserDate = "";

	currentActiveUserPage = 1;

}

function userActiveResetFilters() {
	document.getElementById('ActiveUserStatusFilter').value = "";
	document.getElementById('ActiveUserDate').value = "";

	ActiveUserFilters.ActiveUserStatus = "";
	ActiveUserFilters.ActiveUserDate = "";

	currentActiveUserPage = 1;
	fetchActiveUser();
	countActiveUser()	
}

async function fetchPublishedPost(page = 1) {

	currentPage = page
	const sortValue = document.getElementById('sortSelect')?.value || "";
	const searchInput = document.getElementById('searchInput')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchInput,
		sort: sortValue,
		page: currentPage,
		limit,
		status: filters.status,
		date: filters.date
	});

	const res = await fetch(`${baseUrl}/getPublishedPost?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const post = data.data

	const listpost = document.getElementById('postlist')

	listpost.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listpost.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			document.getElementById('publishedPostPagination').innerHTML = '';
			return;
	}

	post.forEach((item, index) => {
		
		listpost.innerHTML += `
				 <tr>
				<td>
					<div class="form-check">
						<input class="form-check-input row-checkbox" type="checkbox" />
					</div>
				</td>
                <td>${(currentPage - 1) * limit + index + 1}</td>
                <td>${item.title}</td>
                <td>
					<span id="description-${item._id}">
						${item.description.length > 5 ? item.description.substring(0, 5) + "..." : item.description}
					</span>
					${item.description.length > 5 ? `<button class="btn btn-link btn-sm p-0" onclick="toggleText('description-${item._id}', '${item.description}')">Read More</button>` : ""}
				</td>
                <td><span class="badge btn-bg-color ">${item.status ? 'published' : 'unPublished'}</span></td>
				<td><span class="badge button-bg-color">${item.approved ? 'approved' : 'unApporved'}<span></td>
                <td><span class="badge text-bg-info">${item.postStatus}<span></td>
				<td>
				<img 
					src="${item.image}" 
					alt="User Image" 
					width="50" 
					height="50" 
					style="object-fit: cover; border-radius: 50%;" 
					/>
				</td>
				<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="viewPost('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewPostModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editPost('${item._id}')" class="dropdown-item" href="#PostModal" data-bs-toggle="modal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deletePost('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
					<li><a onclick="publishedPost('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-check me-2 text-success"></i> Published</a></li>
					<li><a class="dropdown-item" href="#"><i class="fa fa-history me-2 text-info"></i> View Logs</a></li>

					</ul>
                </td>
				</tr>
			`
	})
	totalPages = data.pagination.totalPages;
	renderPublishedPaginationButtons(totalPages);
}

async function fetchUnPublishedPost(page = 1) {

	currentPage = page
	const sortValue = document.getElementById('sortSelect')?.value || "";
	const searchInput = document.getElementById('searchInput')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchInput,
		sort: sortValue,
		page: currentPage,
		limit,
		status: filters.status,
		date: filters.date
	});

	const res = await fetch(`${baseUrl}/getUnPublishedPost?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const post = data.data

	const listpost = document.getElementById('unPublishedPostList')

	listpost.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listpost.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			document.getElementById('unPublishedPostPagination').innerHTML = '';
			return;
	}

	post.forEach((item, index) => {
		
		listpost.innerHTML += `
				 <tr>
				
                <td>${(currentPage - 1) * limit + index + 1}</td>
                <td>${item.title}</td>
                <td>${item.description}</td>
                <td><span class="badge text-bg-danger">${item.status ? 'published' : 'unPublished'}</span></td>
				<td><span class="badge text-bg-danger">${item.reject ? 'reject' : 'unReject'}<span></td>
				<td><span class="badge text-bg-danger">${item.approved ? 'approved' : 'unApporved'}<span></td>
                <td><span class="badge text-bg-warning">${item.postStatus}<span></td>
				<td>
				<img 
					src="${item.image}" 
					alt="User Image" 
					width="50" 
					height="50" 
					style="object-fit: cover; border-radius: 50%;" 
					/>
				</td>
				<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="editUnPublishedPost('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewUnPublishedModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="approvedPost('${item._id}')" class="dropdown-item" href="#"> <i class="fas fa-check me-2 text-success"></i> Approved</a></li>
                    <li><a onclick="rejectPost('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-times me-2 text-danger"></i> Reject</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
	totalPages = data.pagination.totalPages;
	renderUnPublishedPaginationButtons(totalPages);
}

function renderPublishedPaginationButtons(total) {
	const pagination = document.getElementById('publishedPostPagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentPage > 1) fetchPublishedPost(currentPage - 1);
	};
	pagination.appendChild(prev);

	function createPageButton(page) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${page === currentPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${page}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchPublishedPost(page);
		};
		pagination.appendChild(pageBtn);
	}

	let maxVisible = 5; 
	let startPage = Math.max(1, currentPage - 2);
	let endPage = Math.min(total, currentPage + 2);

	if (endPage - startPage < maxVisible - 1) {
		if (startPage === 1) {
			endPage = Math.min(total, startPage + maxVisible - 1);
		} else if (endPage === total) {
			startPage = Math.max(1, endPage - maxVisible + 1);
		}
	}

	if (startPage > 1) {
		createPageButton(1);
		if (startPage > 2) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		createPageButton(i);
	}

	if (endPage < total) {
		if (endPage < total - 1) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
		createPageButton(total);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentPage < total) fetchPublishedPost(currentPage + 1);
	};
	pagination.appendChild(next);

}

function renderUnPublishedPaginationButtons(total) {
	const pagination = document.getElementById('unPublishedPostPagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentUnPublishedPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentUnPublishedPage > 1) fetchUnPublishedPost(currentUnPublishedPage - 1);
	};
	pagination.appendChild(prev);

	function createPageButton(page) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${page === currentUnPublishedPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${page}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchUnPublishedPost(page);
		};
		pagination.appendChild(pageBtn);
	}

	let maxVisible = 5; 
	let startPage = Math.max(1, currentPage - 2);
	let endPage = Math.min(total, currentPage + 2);

	if (endPage - startPage < maxVisible - 1) {
		if (startPage === 1) {
			endPage = Math.min(total, startPage + maxVisible - 1);
		} else if (endPage === total) {
			startPage = Math.max(1, endPage - maxVisible + 1);
		}
	}

	if (startPage > 1) {
		createPageButton(1);
		if (startPage > 2) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		createPageButton(i);
	}

	if (endPage < total) {
		if (endPage < total - 1) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
		createPageButton(total);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentUnPublishedPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentUnPublishedPage < total) fetchUnPublishedPost(currentUnPublishedPage + 1);
	};
	pagination.appendChild(next);

}

document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentPage = 1;
		fetchPost();
	}
});

document.getElementById('sortSelect')?.addEventListener('change', () => {
	currentPage = 1;
	fetchPost();
});

async function addPost() {
	const title = document.getElementById('title').value
	const description = document.getElementById('add-post-description').value
	const image = document.getElementById('PostImageInput').files[0]; 

	const formData = new FormData();
	formData.append("title", title);
	formData.append("description", description);
	if (image) {
		formData.append("image", image);
	}
	
	document.getElementById('title-error').textContent = ""

	let isValid = true;
    if (!title) {
        document.getElementById('title-error').textContent = 'title is required.';
        isValid = false;
    } 

    if (!isValid) {
        return;
    }

	const res = await fetch(`${baseUrl}/addPost`, {
		method: 'POST',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: formData
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Post Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			$('#postModal').modal('hide');
			document.getElementById('title').value = ""
			document.getElementById('add-post-description').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete post: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function deletePost(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to delete this post?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deletePost/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Delete Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				fetchPublishedPost();
				countPublishedPost()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}

async function editPost(id) {
	selectedPostId = id;
	const res = await fetch(`${baseUrl}/editPostById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const post = data.data[0]
		console.log(post, 'post');
		
		document.getElementById('edit-post-id').value = post._id
		document.getElementById('edit-post-title').value = post.title
		document.getElementById('edit-post-description').value = post.description
		// document.getElementById('edit-post-status').checked = post.status

		const postimagePreview = document.getElementById("edit-post-image-preview");
		if (post.image) {
			postimagePreview.src = `${post.image.replace(/\\/g, "/")}`;
		} else {
			postimagePreview.src = "assets/default-user.png"; 
		}

		const fileInputPost = document.getElementById("edit-post-image");
		
		fileInputPost.value = ""; 

		fileInputPost.addEventListener("change", function (e) {
			const postfile = e.target.files[0];
			if (postfile) {
				const postReader = new FileReader();
				postReader.onload = function (e) {
					postimagePreview.src = e.target.result; 
				};
				postReader.readAsDataURL(postfile);
			}
		});

	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete post: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function editUnPublishedPost(id) {
	selectedPostId = id;
	const res = await fetch(`${baseUrl}/editUnPublishedPostById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const unPublishedPost = data.data[0]
		
		document.getElementById('edit-un-published-post-id').value = unPublishedPost._id
		document.getElementById('edit-un-published-post-title').value = unPublishedPost.title
		document.getElementById('edit-un-published-post-description').value = unPublishedPost.description

	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete UnPublished Post: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function editTag(id) {
	selectedTagId = id;
	const res = await fetch(`${baseUrl}/editTagById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const tag = data.data[0]
		document.getElementById('edit-tag-id').value = tag._id
		document.getElementById('edit-tag-tagName').value = tag.tagName
		document.getElementById('edit-tag-description').value = tag.description
		document.getElementById('edit-tag-status').checked = tag.status

	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete tag: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function editContactUs(id) {
	selectedContactUsId = id;
	const res = await fetch(`${baseUrl}/getContactUsById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const contact = data.data[0]
		document.getElementById('edit-contact-us-id').value = contact._id
		document.getElementById('edit-contact-us-name').value = contact.name
		document.getElementById('edit-contact-us-email').value = contact.email
		document.getElementById('edit-contact-us-phone').value = contact.contact_no
		document.getElementById('edit-contact-us-subject').value = contact.subject

	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete contact us: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function editPage(id) {
	selectedPageId = id;
	const res = await fetch(`${baseUrl}/editPagesById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const page = data.data[0]
		document.getElementById('edit-page-id').value = page._id
		document.getElementById('edit-page-pageName').value = page.pageName
		document.getElementById('edit-page-url').value = page.pageUrl
		document.getElementById('edit-page-description').value = page.description
		document.getElementById('edit-page-status').checked = page.status

	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete page: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function editUser(id) {
	selectedUserId = id;
	const res = await fetch(`${baseUrl}/editUserById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const user = data.data[0]
		document.getElementById('edit-user-id').value = user._id
		document.getElementById('edit-user-firstname').value = user.firstname
		document.getElementById('edit-user-lastname').value = user.lastname
		document.getElementById('edit-user-email').value = user.email
		document.querySelector('.edit-user-role').value = user.role
		document.getElementById('edit-user-active').checked = user.active
		document.getElementById('edit-user-admin').checked = user.is_admin

		const imagePreview = document.getElementById("edit-user-image-preview");
		if (user.image) {
			imagePreview.src = `${user.image.replace(/\\/g, "/")}`;
		} else {
			imagePreview.src = "assets/default-user.png"; 
		}

		const fileInput = document.getElementById("edit-user-image");
		
		fileInput.value = ""; 

		fileInput.addEventListener("change", function (e) {
			const file = e.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = function (e) {
					imagePreview.src = e.target.result; 
				};
				reader.readAsDataURL(file);
			}
		});

	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete user: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}


async function viewPost(id) {

	const res = await fetch(`${baseUrl}/viewPostById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-post-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-post-title').innerHTML = `<strong>Title: </strong> <span> ${view.title} </span>`
		document.getElementById('view-post-description').innerHTML = `<strong>Description: </strong> <span> ${view.description} </span>`
		document.getElementById('view-post-status').innerHTML = `<strong>Status: </strong> <span> ${view.status ? 'Published' : 'unPublished'} </span>`
		document.getElementById('view-post-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-post-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete post: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function viewTag(id) {

	const res = await fetch(`${baseUrl}/viewTagById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-tag-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-tag-tagName').innerHTML = `<strong>Tag Name: </strong> <span> ${view.tagName} </span>`
		document.getElementById('view-tag-description').innerHTML = `<strong>Description: </strong> <span> ${view.description} </span>`
		document.getElementById('view-tag-status').innerHTML = `<strong>Status: </strong> <span> ${view.status ? 'active' : 'InActive'} </span>`
		document.getElementById('view-tag-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-tag-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete tag: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function viewContactUs(id) {

	const res = await fetch(`${baseUrl}/viewContactUsById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-contact-us-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-contact-us-name').innerHTML = `<strong>Tag Name: </strong> <span> ${view.name} </span>`
		document.getElementById('view-contact-us-email').innerHTML = `<strong>Description: </strong> <span> ${view.email} </span>`
		document.getElementById('view-contact-us-phone').innerHTML = `<strong>Status: </strong> <span> ${view.contact_no} </span>`
		document.getElementById('view-contact-us-subject').innerHTML = `<strong>Status: </strong> <span> ${view.subject} </span>`
		document.getElementById('view-contact-us-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-contact-us-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
	} else {
 		Swal.fire({
			icon: 'error',
			title: `Failed to delete contact us: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function viewPage(id) {

	const res = await fetch(`${baseUrl}/viewPagesById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-page-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-page-pageName').innerHTML = `<strong>Page Name: </strong> <span> ${view.pageName} </span>`
		document.getElementById('view-page-description').innerHTML = `<strong>Description: </strong> <span> ${view.description} </span>`
		document.getElementById('view-page-status').innerHTML = `<strong>Status: </strong> <span> ${view.status ? 'active' : 'InActive'} </span>`
		document.getElementById('view-page-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-page-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete page: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function viewUser(id) {

	const res = await fetch(`${baseUrl}/viewUserById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-user-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-user-firstname').innerHTML = `<strong>FirstName: </strong> <span> ${view.firstname} </span>`
		document.getElementById('view-user-lastname').innerHTML = `<strong>LastName: </strong> <span> ${view.lastname} </span>`
		document.getElementById('view-user-email').innerHTML = `<strong>Email: </strong> <span> ${view.email} </span>`
		document.getElementById('view-user-active').innerHTML = `<strong>Status: </strong> <span> ${view.active ? 'active' : 'InActive'} </span>`
		document.getElementById('view-user-admin').innerHTML = `<strong>Admin: </strong> <span> ${view.is_admin ? 'isAdmin' : 'isNotAdmin'} </span>`
		document.getElementById('view-user-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-user-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete user: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

function update() {
	if (selectedPostId) {
      updatePost(selectedPostId);
    } else if(selectedTagId) {
	  updateTag(selectedTagId)
	} else if(selectedPageId) {
	  updatePage(selectedPageId)
	} else if(selectedUserId) {
	  updateUser(selectedUserId)
	} else if(selectedPermissionId) {
	  updatedPermission(selectedPermissionId)
	} else if(updateCategory) {
	  updateCategory(selectedCategoryId)
	} else if(selectedContactUsId) {
	  updateContactUs(selectedContactUsId)
	}
}

async function updateContactUs() {
	const id = document.getElementById('edit-contact-us-id').value
	const name = document.getElementById('edit-contact-us-name').value
	const email = document.getElementById('edit-contact-us-email').value
	const contact_no = document.getElementById('edit-contact-us-phone').value
	const subject = document.getElementById('edit-contact-us-subject').value

	const res = await fetch(`${baseUrl}/updateContactUs/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
				},
		body: JSON.stringify({ name, email, contact_no, subject })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Contact Us Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchContactUs()
			$('#editContactUsModal').modal('hide');
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete Contact Us: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}


async function updatePost(id) {
	
	const title = document.getElementById('edit-post-title').value
	const description = document.getElementById('edit-post-description').value
	const postImageFile = document.getElementById('edit-post-image').files[0];

	const formData = new FormData();
	formData.append("title", title);
	formData.append("description", description);
	if (postImageFile) {
		formData.append("image", postImageFile); 
	}

	const res = await fetch(`${baseUrl}/updatePost/${id}`, {
		method: 'PUT',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: formData
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Post Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchPublishedPost()
			$('#PostModal').modal('hide');
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete post: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}

async function updateTag(id) {
	
	const tagName = document.getElementById('edit-tag-tagName').value
	const description = document.getElementById('edit-tag-description').value
	const status = document.getElementById('edit-tag-status').checked

	const res = await fetch(`${baseUrl}/updateTag/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ tagName, description, status })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Tag Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchTag();
			$('#TagModal').modal('hide');
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete tag: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}

async function updatePage(id) {
	
	const pageName = document.getElementById('edit-page-pageName').value
	const description = document.getElementById('edit-page-description').value
	const pageUrl = document.getElementById('edit-page-url').value
	const status = document.getElementById('edit-page-status').checked

	const res = await fetch(`${baseUrl}/updatePages/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ pageName, description, pageUrl, status })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Page Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchPages();
			$('#PageModal').modal('hide');
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete page: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}

async function updateUser(id) {
	
	const firstname = document.getElementById('edit-user-firstname').value
	const lastname = document.getElementById('edit-user-lastname').value
	const email = document.getElementById('edit-user-email').value
	const role = document.querySelector('.edit-user-role').value

	const active = document.getElementById('edit-user-active').checked
	const is_admin = document.getElementById('edit-user-admin').checked

	const imageFile = document.getElementById('edit-user-image').files[0];

	const formData = new FormData();
	formData.append("firstname", firstname);
	formData.append("lastname", lastname);
	formData.append("email", email);
	formData.append("role", role);
	formData.append("active", active);
	formData.append("is_admin", is_admin);
	if (imageFile) {
		formData.append("image", imageFile); 
	}

	const res = await fetch(`${baseUrl}/updateUser/${id}`, {
		method: 'PUT',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: formData
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update User Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchActiveUser();
			fetchInActiveUser()
			countActiveUser()
			countInActiveUser()
			$('#EditUser').modal('hide');
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete user: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}

async function updatedPermission() {
	const id = document.getElementById('edit-id').value;
	const routeName = document.getElementById('edit-name').value
	const paramName = document.getElementById('edit-route-name').value
	const role = document.getElementById('edit-role').value
	const description = document.getElementById('edit-description').value

	const action = Array.from(document.querySelectorAll('.edit-perm-checkbox:checked'))
		.map(cb => cb.value);

	const res = await fetch(`${baseUrl}/updatePermission/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ routeName, paramName, role, description, action })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Permission Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			getPermission();
			$('#editPermissionModal').modal('hide');
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete permission: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}


async function fetchTag(page = 1) {

	currentTagPage = page

	const sortValue = document.getElementById('sortTagSelect')?.value || "";

	const searchTagInput = document.getElementById('searchTagInput')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchTagInput,
		sort: sortValue,
		page: currentTagPage,
		limit,
		status: tagFilters.tagStatus,
		date: tagFilters.tagDate
	});

	const res = await fetch(`${baseUrl}/getTag?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const tag = data.data

	const listtag = document.getElementById('taglist')

	listtag.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listtag.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			document.getElementById('tagPagination').innerHTML = '';
			return;
	}

	tag.forEach((item, index) => {
		listtag.innerHTML += `
				 <tr>
				 <td>
					<div class="form-check">
						<input class="form-check-input row-checkbox-tag" type="checkbox" />
					</div>
				</td>
                <td>${(currentTagPage - 1) * limit + index + 1}</td>
                <td>${item.tagname || item.tagName}</td>
                <td>${item.description}</td>
                <td>${item.status ? 'active' : 'inactive'}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="viewTag('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewTagModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editTag('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#TagModal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deleteTag('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
	totalTagPages = data.pagination.totalPages;
	renderTagPaginationButtons(totalTagPages);
}

function renderTagPaginationButtons(total) {
	const pagination = document.getElementById('tagPagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentTagPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentTagPage > 1) fetchTag(currentTagPage - 1);
	};
	pagination.appendChild(prev);

	function createPageButton(page) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${page === currentTagPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${page}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchTag(page);
		};
		pagination.appendChild(pageBtn);
	}

	let maxVisible = 5; 
	let startPage = Math.max(1, currentTagPage - 2);
	let endPage = Math.min(total, currentTagPage + 2);

	if (endPage - startPage < maxVisible - 1) {
		if (startPage === 1) {
			endPage = Math.min(total, startPage + maxVisible - 1);
		} else if (endPage === total) {
			startPage = Math.max(1, endPage - maxVisible + 1);
		}
	}

	if (startPage > 1) {
		createPageButton(1);
		if (startPage > 2) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		createPageButton(i);
	}

	if (endPage < total) {
		if (endPage < total - 1) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
		createPageButton(total);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentTagPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentTagPage < total) fetchTag(currentTagPage + 1);
	};
	pagination.appendChild(next);

}

document.getElementById('searchTagInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentTagPage = 1;
		fetchTag();
	}
});

document.getElementById('sortTagSelect')?.addEventListener('change', () => {
	currentTagPage = 1;
	fetchTag();
});

async function fetchPages(page = 1) {

	currentPagePage = page

	const sortValue = document.getElementById('sortPageSelect')?.value || "";

	const searchPageInput = document.getElementById('searchPageInput')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchPageInput,
		sort: sortValue,
		page: currentPagePage,
		limit,
		status: pageFilters.pageStatus,
		date: pageFilters.pageDate
	});

	const res = await fetch(`${baseUrl}/getPages?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const pages = data.data

	const listpages = document.getElementById('pagelist')

	listpages.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listpages.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			document.getElementById('pagePagination').innerHTML = '';

			return;
	}

	pages.forEach((item, index) => {
	
	listpages.innerHTML += `
				<tr>
				<td>
					<div class="form-check">
						<input class="form-check-input row-checkbox-page" type="checkbox" />
					</div>
				</td>
                <td>${(currentPagePage - 1) * limit + index + 1}</td>
                <td>${item.pageName || item.pageName}</td>
                <td>${item.description}</td>
				<td>${item.pageUrl}</td>
                <td>${item.status ? 'active' : 'inactive'}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="viewPage('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewPageModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editPage('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#PageModal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deletePage('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
	totalPagePages = data.pagination.totalPages;
	renderPagePaginationButtons(totalPagePages);
}



function renderPagePaginationButtons(total) {
	const pagination = document.getElementById('pagePagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentPagePage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentPagePage > 1) fetchPages(currentPagePage - 1);
	};
	pagination.appendChild(prev);

	function createPageButton(page) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${page === currentPagePage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${page}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchPages(page);
		};
		pagination.appendChild(pageBtn);
	}

	let maxVisible = 5; 
	let startPage = Math.max(1, currentPagePage - 2);
	let endPage = Math.min(total, currentPagePage + 2);

	if (endPage - startPage < maxVisible - 1) {
		if (startPage === 1) {
			endPage = Math.min(total, startPage + maxVisible - 1);
		} else if (endPage === total) {
			startPage = Math.max(1, endPage - maxVisible + 1);
		}
	}

	if (startPage > 1) {
		createPageButton(1);
		if (startPage > 2) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		createPageButton(i);
	}

	if (endPage < total) {
		if (endPage < total - 1) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
		createPageButton(total);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentPagePage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentPagePage < total) fetchPages(currentPagePage + 1);
	};
	pagination.appendChild(next);

}

document.getElementById('searchPageInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentPagePage = 1;
		fetchPages();
	}
});

document.getElementById('sortPageSelect')?.addEventListener('change', () => {
	currentPagePage = 1;
	fetchPages();
});

async function fetchActiveUser(page = 1) {

	currentActiveUserPage = page

	const sortActiveValue = document.getElementById('ActiveSortUserSelect')?.value || "";

	const searchActiveUserInput = document.getElementById('searchActiveUserInput')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchActiveUserInput,
		sort: sortActiveValue,
		page: currentActiveUserPage,
		limit,
		active: ActiveUserFilters.ActiveUserStatus,
		date: ActiveUserFilters.ActiveUserDate
	});

	const res = await fetch(`${baseUrl}/getActiveUser?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const user = data.data

	const userlist = document.getElementById('userlist')

	userlist.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			userlist.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			document.getElementById('ActiveUserPagination').innerHTML = '';
			return;
	}

	user.forEach((item, index) => {
	
	userlist.innerHTML += `
				 <tr>
				<td>
					<div class="form-check">
						<input class="form-check-input row-checkbox-active-user" type="checkbox" />
					</div>
				</td>
                <td>${(currentActiveUserPage - 1) * limit + index + 1}</td>
                <td>${item.firstname} ${item.lastname}</td>
				<td>${item.email}</td>
				<td>${item.role}</td>
				<td>
				 <img 
					src="${item.image}" 
					alt="User Image" 
					width="50" 
					height="50" 
					style="object-fit: cover; border-radius: 50%;" 
					/>
				</td>

                <td> 
					<h6><span class="badge text-bg-success">${item.active ? 'active' : 'inactive'}</span></h6>
				</td>
				<td> 
					<h6><span class="badge text-bg-info">${item.is_login ? 'is_logged_in' : 'is_logged_Out'}</span></h6>
				</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="viewUser('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal"
          					data-bs-target="#viewModalUser"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editUser('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal"
          					data-bs-target="#EditUser"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deleteUser('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
	totalActiveUserPages = data.pagination.totalPages;
	renderActiveUserPaginationButtons(totalActiveUserPages);
}

async function fetchInActiveUser(page = 1) {

	currentInActiveUserPage = page

	const sortInActiveValue = document.getElementById('InActiveSortUserSelect')?.value || "";


	const searchInActiveUserInput = document.getElementById('searchInActiveUserInput')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchInActiveUserInput,
		sort: sortInActiveValue,
		page: currentInActiveUserPage,
		limit,
	});

	const res = await fetch(`${baseUrl}/getInActiveUser?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const InActiveUser = data.data

	const InActiveUserList = document.getElementById('inActiveUserList')

	InActiveUserList.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			InActiveUserList.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			document.getElementById('InActiveUserPagination').innerHTML = '';
			return;
	}

	InActiveUser.forEach((item, index) => {
	
	InActiveUserList.innerHTML += `
				 <tr>
				<td>
					<div class="form-check">
						<input class="form-check-input row-checkbox-inactive-user" type="checkbox" />
					</div>
				</td>
                <td>${(currentInActiveUserPage - 1) * limit + index + 1}</td>
                <td>${item.firstname} ${item.lastname}</td>
				<td>${item.email}</td>
				<td>${item.role}</td>
				<td>
				 <img 
					src="${item.image}" 
					alt="User Image" 
					width="50" 
					height="50" 
					style="object-fit: cover; border-radius: 50%;" 
					/>
					</td>
                <td>
					<h6><span class="badge text-bg-danger">${item.active ? 'active' : 'inactive'}</span></h6>
				</td>
				<td> 
					<h6><span class="badge text-bg-warning">${item.is_login ? 'is_logged_in' : 'is_logged_Out'}</span></h6>
				</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="viewUser('${item._id}')" data-bs-toggle="modal"
          					data-bs-target="#viewModalUser"  class="dropdown-item view-btn" href="#"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editUser('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal"
          					data-bs-target="#EditUser"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deleteUser('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
	totalInActiveUserPages = data.pagination.totalPages;
	renderInActiveUserPaginationButtons(totalInActiveUserPages);
	
}

function renderActiveUserPaginationButtons(total) {
	const pagination = document.getElementById('ActiveUserPagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentActiveUserPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentActiveUserPage > 1) fetchActiveUser(currentActiveUserPage - 1);
	};
	pagination.appendChild(prev);

	function createPageButton(page) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${page === currentActiveUserPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${page}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchActiveUser(page);
		};
		pagination.appendChild(pageBtn);
	}

	let maxVisible = 5; 
	let startPage = Math.max(1, currentActiveUserPage - 2);
	let endPage = Math.min(total, currentActiveUserPage + 2);

	if (endPage - startPage < maxVisible - 1) {
		if (startPage === 1) {
			endPage = Math.min(total, startPage + maxVisible - 1);
		} else if (endPage === total) {
			startPage = Math.max(1, endPage - maxVisible + 1);
		}
	}

	if (startPage > 1) {
		createPageButton(1);
		if (startPage > 2) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		createPageButton(i);
	}

	if (endPage < total) {
		if (endPage < total - 1) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
		createPageButton(total);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentActiveUserPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentActiveUserPage < total) fetchActiveUser(currentActiveUserPage + 1);
	};
	pagination.appendChild(next);

}

document.getElementById('searchActiveUserInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentActiveUserPage = 1;
		fetchActiveUser();
	}
});

document.getElementById('ActiveSortUserSelect')?.addEventListener('change', () => {
	currentActiveUserPage = 1;
	fetchActiveUser();
});

function renderInActiveUserPaginationButtons(total) {
	const pagination = document.getElementById('InActiveUserPagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentInActiveUserPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentInActiveUserPage > 1) fetchInActiveUser(currentInActiveUserPage - 1);
	};
	pagination.appendChild(prev);

	function createPageButton(page) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${page === currentInActiveUserPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${page}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchInActiveUser(page);
		};
		pagination.appendChild(pageBtn);
	}

	let maxVisible = 5; 
	let startPage = Math.max(1, currentLogsPage - 2);
	let endPage = Math.min(total, currentLogsPage + 2);

	if (endPage - startPage < maxVisible - 1) {
		if (startPage === 1) {
			endPage = Math.min(total, startPage + maxVisible - 1);
		} else if (endPage === total) {
			startPage = Math.max(1, endPage - maxVisible + 1);
		}
	}

	if (startPage > 1) {
		createPageButton(1);
		if (startPage > 2) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		createPageButton(i);
	}

	if (endPage < total) {
		if (endPage < total - 1) {
			const dots = document.createElement('li');
			dots.className = 'page-item disabled';
			dots.innerHTML = `<a class="page-link">...</a>`;
			pagination.appendChild(dots);
		}
		createPageButton(total);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentInActiveUserPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentInActiveUserPage < total) fetchInActiveUser(currentInActiveUserPage + 1);
	};
	pagination.appendChild(next);

}

document.getElementById('searchInActiveUserInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentInActiveUserPage = 1;
		fetchInActiveUser();
	}
});

document.getElementById('InActiveSortUserSelect')?.addEventListener('change', () => {
	currentInActiveUserPage = 1;
	fetchInActiveUser();
});

async function deleteTag(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to delete this tag?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deleteTag/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Delete Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				fetchTag();
				countTag()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}





async function deletePage(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to delete this page?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deletePage/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Delete Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				fetchPages();
				countPage()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}







async function deleteUser(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to delete this user?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deleteUser/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Delete Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				fetchActiveUser();
				fetchInActiveUser()
				countActiveUser()
				countInActiveUser()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}

async function updateUserProfile() {

	const userId = localStorage.getItem('user')

	const phone = document.getElementById('edit-profile-phone').value
	const address = document.getElementById('edit-profile-address').value

	const res = await fetch(`${baseUrl}/updateUserProfile/${userId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ phone, address })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update User Profile Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			window.location.href = '/dashboard_real.html'
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete profile: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}

async function deleteUserProfile() {
	const userId = localStorage.getItem('user')

	const result = await Swal.fire({
		title: 'Are you sure you want to delete this profile?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deleteUserProfile/${userId}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Delete User Profile Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				window.location.href = '/dashboard_real.html'
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete profile: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}








async function addTag() {
	const tagName = document.getElementById('tag-name').value
	const description = document.getElementById('tag-description').value

	document.getElementById('tag-name-error').textContent = ""

	let isValid = true;
    if (!tagName) {
        document.getElementById('tag-name-error').textContent = 'tag name is required.';
        isValid = false;
    } 

    if (!isValid) {
        return;
    }

	const res = await fetch(`${baseUrl}/addTag`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ tagName, description })
		
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Tag Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchTag();
			countTag()
			$('#tagModal').modal('hide');
			document.getElementById('tag-name').value = ""
			document.getElementById('tag-description').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete tag: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}







async function addPage() {
	const pageName = document.getElementById('page-name').value
	const pageUrl = document.getElementById('page-url').value
	const description = document.getElementById('page-description').value

	document.getElementById('page-name-error').textContent = ""
	document.getElementById('page-url-error').textContent = ""

	let isValid = true;
    if (!pageName) {
        document.getElementById('page-name-error').textContent = 'page name is required.';
        isValid = false;
    } 

	 if (!pageUrl) {
        document.getElementById('page-url-error').textContent = 'page url is required.';
        isValid = false;
    } 

    if (!isValid) {
        return;
    }

	const res = await fetch(`${baseUrl}/addPages`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ pageName, description, pageUrl })
		
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Page Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchPages();
			countPage()
			$('#pageModal').modal('hide');
			document.getElementById('page-name').value = ""
			document.getElementById('page-url').value = ""
			document.getElementById('page-description').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete Page: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}




async function addUser() {
    // Get form values
    const firstname = document.getElementById('firstName').value;
    const lastname = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirmPass').value;
    const role = document.querySelector('.add-user-role').value;
	const image = document.getElementById('imageInput').files[0]; 

	const formData = new FormData();
	formData.append("firstname", firstname);
	formData.append("lastname", lastname);
	formData.append("email", email);
	formData.append("password", password);
	formData.append("confirmPass", confirmPass);
	formData.append("role", role);
	if (image) {
		formData.append("image", image);
	}

	document.getElementById('firstname-error').textContent = ""
  	document.getElementById('lastname-error').textContent = ""
	document.getElementById('email-error').textContent = ""
  	document.getElementById('password-error').textContent = ""
	document.getElementById('confirm-password-error').textContent = ""

   let isValid = true;
    if (!firstname) {
        document.getElementById('firstname-error').textContent = 'Firstname is required.';
        isValid = false;
    }
	 if (!lastname) {
        document.getElementById('lastname-error').textContent = 'Lastname is required.';
        isValid = false;
    }

    if (!email) {
        document.getElementById('email-error').textContent = 'Email is required.';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (!password) {
        document.getElementById('password-error').textContent = 'Password is required.';
        isValid = false;
    } else if (password.length < 10) {
        document.getElementById('password-error').textContent = 'Password must be at least 10 characters';
        isValid = false;
    }

	 if (!confirmPass) {
        document.getElementById('confirm-password-error').textContent = 'confirm password is required.';
        isValid = false;
    } else if (confirmPass.length < 10) {
        document.getElementById('confirm-password-error').textContent = 'confirm password must be at least 10 characters';
        isValid = false;
    } else if (password !== confirmPass) {
		document.getElementById('confirm-password-error').textContent = 'Password and confirm password do not match.';
		isValid = false;
	}

    if (!isValid) {
        return;
    }

    try {
        const res = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Authorization': `${tokenType} ${access_Token}`
            },
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'User Created Successfully',
                text: data.message,
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true
            }).then(() => {
                fetchActiveUser(); // You'll need to implement this function
				fetchInActiveUser()
				countActiveUser()
				countInActiveUser()
                $('#userModal').modal('hide');
                document.getElementById('firstName').value = "";
                document.getElementById('lastName').value = "";
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";
                document.getElementById('confirmPass').value = "";
            });
        } else {
            throw new Error(data.error || 'Failed to create user');
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Failed to create user',
            text: error.message,
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true
        });
        console.error('Error:', error);
    }
}

async function countUnPublishedPost(search = "", status = "", date = "") {
	
	const queryParams = new URLSearchParams();

	if (search) queryParams.append("search", search);
	if (status) queryParams.append("status", status);
	if (date) queryParams.append("date", date);
	
	const res = await fetch(`${baseUrl}/countUnPublishedPost?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('unPublishedPostCount').textContent = `No Of Count: ${count}`

}

async function countPublishedPost(search = "", status = "", date = "") {
	
	const queryParams = new URLSearchParams();

	if (search) queryParams.append("search", search);
	if (status) queryParams.append("status", status);
	if (date) queryParams.append("date", date);
	
	const res = await fetch(`${baseUrl}/countPublishedPost?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('PublishedPostCount').textContent = `No Of Count: ${count}`

}

async function countTag(search = "", status = "", date = "") {
	const queryParams = new URLSearchParams();

	if (search) queryParams.append("search", search );
	if (status) queryParams.append("status", status);
	if (date) queryParams.append("date", date);

	const res = await fetch(`${baseUrl}/countTag?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('tagCount').textContent = `No Of Count: ${count}`

}

async function countPage(search = "", status = "", date = "") {

	const queryParams = new URLSearchParams();
	if (search) queryParams.append("search", search);
	if (status) queryParams.append("status", status);
	if (date) queryParams.append("date", date);

	const res = await fetch(`${baseUrl}/countPages?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('pageCount').textContent = `No Of Count: ${count}`

}

async function countActiveUser(search = "", active = "", date = "") {
	const queryParams = new URLSearchParams();
	if (search) queryParams.append("search", search);
	if (active) queryParams.append("active", active);
	if (date) queryParams.append("date", date);

	const res = await fetch(`${baseUrl}/countActiveUser?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('userCount').textContent = `No Of Count: ${count}`

}

async function countInActiveUser() {
	

	const res = await fetch(`${baseUrl}/countInActiveUser`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('inActiveUserCount').textContent = `No Of Count: ${count}`

}

function getLogsSearchParamsAndCount() {
  	const date = document.getElementById('date')?.value || "";
	const loginTime = document.getElementById('login-time')?.value || "";
	const logoutTime = document.getElementById('logout-time')?.value || "";

  countLogs(date, loginTime, logoutTime);
}

document.getElementById('date').addEventListener('change', getLogsSearchParamsAndCount);

document.getElementById('login-time').addEventListener('change', getLogsSearchParamsAndCount);

document.getElementById('logout-time').addEventListener('change', getLogsSearchParamsAndCount);


function getSearchParamsAndCount() {
  const search = document.getElementById('searchInput').value.trim();
   const status = document.getElementById('statusFilter')?.value || "";
  const date = document.getElementById('date')?.value || "";

  countPublishedPost(search, status, date);
}

document.getElementById('searchInput').addEventListener('input', getSearchParamsAndCount);

document.getElementById('statusFilter').addEventListener('change', getSearchParamsAndCount);

document.getElementById('date').addEventListener('change', getSearchParamsAndCount);

function getSearchTagParamsAndCount() {
  const search = document.getElementById('searchTagInput').value.trim();
  const status = document.getElementById('tagStatusFilter')?.value || "";
  const date = document.getElementById('tagDate')?.value || "";


  countTag(search, status, date);
}

document.getElementById('searchTagInput').addEventListener('input', getSearchTagParamsAndCount);

document.getElementById('tagStatusFilter').addEventListener('change', getSearchTagParamsAndCount);

document.getElementById('tagDate').addEventListener('change', getSearchTagParamsAndCount);

function getSearchPageParamsAndCount() {
  const search = document.getElementById('searchPageInput').value.trim();
  const status = document.getElementById('pageStatusFilter')?.value || "";
  const date = document.getElementById('pageDate')?.value || "";

  countPage(search, status, date);
}

document.getElementById('searchPageInput').addEventListener('input', getSearchPageParamsAndCount);

document.getElementById('pageStatusFilter').addEventListener('change', getSearchPageParamsAndCount);

document.getElementById('pageDate').addEventListener('change', getSearchPageParamsAndCount);


function getSearchUserParamsAndCount() {
  const search = document.getElementById('searchUserInput').value.trim();
  const status = document.getElementById('userStatusFilter')?.value || "";
  const date = document.getElementById('userDate')?.value || "";

  countUser(search, status, date);
}

document.getElementById('searchUserInput').addEventListener('input', getSearchUserParamsAndCount);

document.getElementById('userStatusFilter').addEventListener('change', getSearchUserParamsAndCount);

document.getElementById('userDate').addEventListener('change', getSearchUserParamsAndCount);

async function deleteSelectedPosts() {
  const checkboxes = document.querySelectorAll('.row-checkbox:checked');
  const ids = [];

  checkboxes.forEach((checkbox, index) => {
    const row = checkbox.closest('tr');
    const titleCell = row.querySelector('td:nth-child(3)');
    const title = titleCell?.innerText;

    const editBtn = row.querySelector('.dropdown-menu a[onclick^="editPost"]');
    const idMatch = editBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    if (idMatch) {
      ids.push(idMatch[1]);
    }
  });

  if (ids.length === 0) {
		Swal.fire({
			icon: 'info',
			title: 'Please select at least one post to delete.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
    	return;
  }

  const result = await Swal.fire({
		title: `Are you sure you want to delete ${ids.length} selected post(s)?`,
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		try {
		const res = await fetch(`${baseUrl}/deleteMultiplePost?ids=${ids.join(',')}`, {
			method: "DELETE",
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		});

    	const data = await res.json();

		if (data.success) {
			Swal.fire({
				icon: 'success',
				title: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		fetchPublishedPost(currentPage)
		countPublishedPost()
		document.getElementById('delete-all-btn').classList.add('d-none');
		document.querySelectorAll('.row-checkbox:checked').forEach(cb => cb.checked = false);
		const headerCheckbox = document.querySelector('#select-all'); // **Assumes your header checkbox has an ID of 'selectAllCheckbox'**
        if (headerCheckbox) {
          headerCheckbox.checked = false;
        }

		} else {
			Swal.fire({
				icon: 'success',
				title: data.error || 'Failed to delete posts.',
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
  } catch (err) {
	 Swal.fire({
			icon: 'success',
			title: err || 'An error occurred while deleting posts.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
  }
	}

}

async function deleteSelectedTag() {
  const checkboxes = document.querySelectorAll('.row-checkbox:checked');
  const ids = [];

  checkboxes.forEach((checkbox, index) => {
    const row = checkbox.closest('tr');
    const titleCell = row.querySelector('td:nth-child(3)');
    const title = titleCell?.innerText;

    const editBtn = row.querySelector('.dropdown-menu a[onclick^="editTag"]');
    const idMatch = editBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    if (idMatch) {
      ids.push(idMatch[1]);
    }
  });

  if (ids.length === 0) {
		Swal.fire({
			icon: 'info',
			title: 'Please select at least one tag to delete.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
    	return;
  }

  const result = await Swal.fire({
		title: `Are you sure you want to delete ${ids.length} selected tag(s)?`,
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		try {
		const res = await fetch(`${baseUrl}/deleteMultipleTags?ids=${ids.join(',')}`, {
			method: "DELETE",
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		});

    	const data = await res.json();

		if (data.success) {
			Swal.fire({
				icon: 'success',
				title: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		fetchTag(currentPage)
		countTag()
		document.getElementById('delete-all-btn-tag').classList.add('d-none');
		document.querySelectorAll('.row-checkbox:checked').forEach(cb => cb.checked = false);
		const headerCheckbox = document.querySelector('#select-all-tag'); // **Assumes your header checkbox has an ID of 'selectAllCheckbox'**
        if (headerCheckbox) {
          headerCheckbox.checked = false;
        }

		} else {
			Swal.fire({
				icon: 'success',
				title: data.error || 'Failed to delete tag.',
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
  } catch (err) {
	 Swal.fire({
			icon: 'success',
			title: err || 'An error occurred while deleting tag.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
  }
	}

}

async function deleteSelectedPage() {
  const checkboxes = document.querySelectorAll('.row-checkbox:checked');
  const ids = [];

  checkboxes.forEach((checkbox, index) => {
    const row = checkbox.closest('tr');
    const titleCell = row.querySelector('td:nth-child(3)');
    const title = titleCell?.innerText;

    const editBtn = row.querySelector('.dropdown-menu a[onclick^="editPage"]');
    const idMatch = editBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    if (idMatch) {
      ids.push(idMatch[1]);
    }
  });

  if (ids.length === 0) {
		Swal.fire({
			icon: 'info',
			title: 'Please select at least one page to delete.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
    	return;
  }

  const result = await Swal.fire({
		title: `Are you sure you want to delete ${ids.length} selected page(s)?`,
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		try {
		const res = await fetch(`${baseUrl}/deleteMultiplePages?ids=${ids.join(',')}`, {
			method: "DELETE",
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		});

    	const data = await res.json();

		if (data.success) {
			Swal.fire({
				icon: 'success',
				title: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		fetchPages(currentPage)
		countPage()
		document.getElementById('delete-all-btn-page').classList.add('d-none');
		document.querySelectorAll('.row-checkbox:checked').forEach(cb => cb.checked = false);
		const headerCheckbox = document.querySelector('#select-all-page'); // **Assumes your header checkbox has an ID of 'selectAllCheckbox'**
        if (headerCheckbox) {
          headerCheckbox.checked = false;
        }

		} else {
			Swal.fire({
				icon: 'success',
				title: data.error || 'Failed to delete page.',
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
  } catch (err) {
	 Swal.fire({
			icon: 'success',
			title: err || 'An error occurred while deleting page.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
  }
	}

}

async function deleteSelectedUser() {
  const checkboxes = document.querySelectorAll('.row-checkbox:checked');
  const ids = [];

  checkboxes.forEach((checkbox, index) => {
    const row = checkbox.closest('tr');
    const titleCell = row.querySelector('td:nth-child(3)');
    const title = titleCell?.innerText;

    const editBtn = row.querySelector('.dropdown-menu a[onclick^="editUser"]');
    const idMatch = editBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    if (idMatch) {
      ids.push(idMatch[1]);
    }
  });

  if (ids.length === 0) {
		Swal.fire({
			icon: 'info',
			title: 'Please select at least one user to delete.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
    	return;
  }

  const result = await Swal.fire({
		title: `Are you sure you want to delete ${ids.length} selected user(s)?`,
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		try {
		const res = await fetch(`${baseUrl}/deleteMultipleUsers?ids=${ids.join(',')}`, {
			method: "DELETE",
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		});

    	const data = await res.json();

		if (data.success) {
			Swal.fire({
				icon: 'success',
				title: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		fetchActiveUser(currentActiveUserPage)
		countActiveUser()
		fetchInActiveUser(currentInActiveUserPage)
		countInActiveUser()
		document.getElementById('delete-all-btn-user').classList.add('d-none');
		document.getElementById('delete-all-btn-inActive-user').classList.add('d-none');
		document.querySelectorAll('.row-checkbox:checked').forEach(cb => cb.checked = false);
		const headerCheckbox = document.querySelector('#select-all-user'); // **Assumes your header checkbox has an ID of 'selectAllCheckbox'**
        if (headerCheckbox) {
          headerCheckbox.checked = false;
        }

		} else {
			Swal.fire({
				icon: 'success',
				title: data.error || 'Failed to delete user.',
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
  } catch (err) {
	 Swal.fire({
			icon: 'success',
			title: err || 'An error occurred while deleting user.',
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
  }
	}

}



async function changePassword() {

	const userId = localStorage.getItem('user')

	const oldPassword = document.getElementById('old-pass').value
	const newPassword = document.getElementById('new-pass').value
	const confirmPass = document.getElementById('confirm-pass').value

	document.getElementById('old-pass-error').textContent = ""
  	document.getElementById('new-pass-error').textContent = ""
	document.getElementById('confirm-pass-error').textContent = ""

	let isValid = true;
    if (!oldPassword) {
        document.getElementById('old-pass-error').textContent = 'old password is required.';
        isValid = false;
    } 

	if (!newPassword) {
        document.getElementById('new-pass-error').textContent = 'new password is required.';
        isValid = false;
    } else if(newPassword.length < 10) {
		document.getElementById('new-pass-error').textContent = 'Password must be at least 10 characters';
        isValid = false;
	}

	if (!confirmPass) {
        document.getElementById('confirm-pass-error').textContent = 'confirm password is required.';
        isValid = false;
    } else if(confirmPass.length < 10) {
		document.getElementById('confirm-pass-error').textContent = 'Password must be at least 10 characters';
        isValid = false;
	} else if (newPassword !== confirmPass) {
        document.getElementById('confirm-pass-error').textContent = 'Password and confirm password do not match.';
        isValid = false;
    }  
	
    if (!isValid) {
        return;
    }

	const res = await fetch(`${baseUrl}/changePassword/${userId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ oldPassword, newPassword, confirmPass })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Password change Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			window.location.href = '/dashboard_real.html'
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete password: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}

}

async function fetchLogs(page = 1) {
    currentLogsPage = page;

    const listlogs = document.getElementById('logs-list');
    const pagination = document.getElementById('logsPagination');

    // 👇 Circle loader dikhado
    listlogs.innerHTML = `
        <tr>
            <td colspan="7" class="text-center">
                <div class="spinner"></div>
            </td>
        </tr>
    `;

    const queryParams = new URLSearchParams({
        page: currentLogsPage,
        limit,
        date: Logsfilters.date,
        loginTime: Logsfilters.loginTime,
        logoutTime: Logsfilters.logoutTime
    });

    try {
        const res = await fetch(`${baseUrl}/getLogs?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `${tokenType} ${access_Token}`
            }
        });

        const data = await res.json();
        const logs = data.data;

        setTimeout(() => {
            listlogs.innerHTML = '';

            if (!data.success || !logs || logs.length === 0) {
                listlogs.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center text-danger fw-bold">
                            ${data.error || "No logs found"}
                        </td>
                    </tr>
                `;
                pagination.innerHTML = '';
                return;
            }

            logs.forEach((item, index) => {
                listlogs.innerHTML += `
                    <tr>
                        <td>${(currentLogsPage - 1) * limit + index + 1}</td>
                        <td>${item.user_id && item.user_id.firstname ? item.user_id.firstname : '----------'}</td>
                        <td>${item.login_time ? new Date(item.login_time).toLocaleTimeString() : '----------'}</td>
                        <td>${item.logout_time ? new Date(item.logout_time).toLocaleTimeString() : '----------'}</td>
                        <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
                        <td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
                    </tr>
                `;
            });

            totalLogsPages = data.pagination.totalPages;
            renderLogsPaginationButtons(totalLogsPages);

        }, 800);
    } catch (err) {
        listlogs.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger fw-bold">
                    Error loading logs
                </td>
            </tr>
        `;
        console.error(err);
    }
}



function renderLogsPaginationButtons(total) {
    const pagination = document.getElementById('logsPagination');
    pagination.innerHTML = '';

    const prev = document.createElement('li');
    prev.className = `page-item ${currentLogsPage === 1 ? 'disabled' : ''}`;
    prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prev.onclick = (e) => {
        e.preventDefault();
        if (currentLogsPage > 1) fetchLogs(currentLogsPage - 1);
    };
    pagination.appendChild(prev);

    function createPageButton(page) {
        const pageBtn = document.createElement('li');
        pageBtn.className = `page-item ${page === currentLogsPage ? 'active' : ''}`;
        pageBtn.innerHTML = `<a class="page-link" href="#">${page}</a>`;
        pageBtn.onclick = (e) => {
            e.preventDefault();
            fetchLogs(page);
        };
        pagination.appendChild(pageBtn);
    }

    let maxVisible = 5;
    let startPage = Math.max(1, currentLogsPage - 2);
    let endPage = Math.min(total, currentLogsPage + 2);

    if (endPage - startPage < maxVisible - 1) {
        if (startPage === 1) {
            endPage = Math.min(total, startPage + maxVisible - 1);
        } else if (endPage === total) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
    }

    if (startPage > 1) {
        createPageButton(1);
        if (startPage > 2) {
            const dots = document.createElement('li');
            dots.className = 'page-item disabled';
            dots.innerHTML = `<a class="page-link">...</a>`;
            pagination.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        createPageButton(i);
    }

    if (endPage < total) {
        if (endPage < total - 1) {
            const dots = document.createElement('li');
            dots.className = 'page-item disabled';
            dots.innerHTML = `<a class="page-link">...</a>`;
            pagination.appendChild(dots);
        }
        createPageButton(total);
    }

    const next = document.createElement('li');
    next.className = `page-item ${currentLogsPage === total ? 'disabled' : ''}`;
    next.innerHTML = `<a class="page-link" href="#">Next</a>`;
    next.onclick = (e) => {
        e.preventDefault();
        if (currentLogsPage < total) fetchLogs(currentLogsPage + 1);
    };
    pagination.appendChild(next);
}


async function countLogs(date = "", loginTime = "", logoutTime = "") {

	const queryParams = new URLSearchParams();

	if (date) queryParams.append("date", date);
	if (loginTime) queryParams.append("loginTime", loginTime);
	if (logoutTime) queryParams.append("logoutTime", logoutTime);
	
	const res = await fetch(`${baseUrl}/countLogs?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('logsCount').textContent = `No Of Count: ${count}`

}

async function getRequest() {
	
	const res = await fetch(`${baseUrl}/getActiveRequest`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const request = data.data

	const requestlist = document.getElementById('request-list')

	requestlist.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			requestlist.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	request.forEach((item, index) => {
		requestlist.innerHTML += `
				<tr>
					<td>${index + 1}</td>
					<td>${item.username}</td>
					<td>
						<span id="reqInfo-${item._id}">
							${item.reqInfo.length > 5 ? item.reqInfo.substring(0, 5) + "..." : item.reqInfo}
						</span>
						${item.reqInfo.length > 5 ? `<button class="btn btn-link btn-sm p-0" onclick="toggleText('reqInfo-${item._id}', '${item.reqInfo}')">Read More</button>` : ""}
					</td>
					
					<td><h6><span class="badge ${item.approvedBy ? 'text-bg-success' : 'text-bg-danger'}">${item.approvedBy ? 'Approved' : 'unApproved'}</h6></span></td>
					<td><h6><span class="badge ${item.rejectedBy ? 'text-bg-danger' : 'text-bg-warning'}">${item.rejectedBy ? 'Reject' : 'unReject'}</h6></span></td>
					<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
					<td>
						<button onclick="openApprovedModal('${item._id}')" class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#approvedModal">
							Approved
						</button>
						<button onclick="openRejectedModal('${item._id}')" class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#rejectModal">
							Reject
						</button>
						<button onclick="viewRequest('${item._id}')" data-bs-toggle="modal" data-bs-target="#viewApprovedModal" class="btn btn-info" type="button">
							View
						</button>
					</td>
					
				</tr>
			`
	})
}

// approvedModal

async function getInActiveRequest() {
	
	const res = await fetch(`${baseUrl}/getInActiveRequest`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const request = data.data

	const inActiveRequestList = document.getElementById('inActive-request-list')

	inActiveRequestList.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			inActiveRequestList.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	request.forEach((item, index) => {
		inActiveRequestList.innerHTML += `
				<tr>
					<td>${index + 1}</td>
					<td>${item.username}</td>
					<td>
						<span id="reqInfo-${item._id}">
							${item.reqInfo.length > 5 ? item.reqInfo.substring(0, 5) + "..." : item.reqInfo}
						</span>
						${item.reqInfo.length > 5 ? `<button class="btn btn-link btn-sm p-0" onclick="toggleText('reqInfo-${item._id}', '${item.reqInfo}')">Read More</button>` : ""}
					</td>
					
					<td><h6><span class="badge ${item.approvedBy ? 'text-bg-success' : 'text-bg-danger'}">${item.approvedBy ? 'Approved' : 'unApproved'}</h6></span></td>
					<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
					<td>
					${item.approvedBy 
          			?
						`<button class="btn btn-primary" type="button">
							view
						</button>
						<button class="btn btn-danger" type="button">
							edit
						</button>
						<button data-bs-toggle="modal" data-bs-target="#viewApprovedModal" class="btn btn-info" type="button">
							delete
						</button>
					`
						: ''}
					</td>
					
				</tr>
			`
	})
}

async function getRequested() {
	
	const res = await fetch(`${baseUrl}/getActiveRequest`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const request = data.data

	const listRequest = document.getElementById('list-request')

	listRequest.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listRequest.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	request.forEach((item, index) => {
		listRequest.innerHTML += `
				<tr>
					<td>${index + 1}</td>
					<td>${item.username}</td>
					<td>
						<span id="reqInfo-${item._id}">
							${item.reqInfo.length > 5 ? item.reqInfo.substring(0, 5) + "..." : item.reqInfo}
						</span>
						${item.reqInfo.length > 5 ? `<button class="btn btn-link btn-sm p-0" onclick="toggleText('reqInfo-${item._id}', '${item.reqInfo}')">Read More</button>` : ""}
					</td>
					
					<td><h6><span class="badge text-bg-danger">${item.approvedAt ? 'Approved' : 'unApproved'}</h6></span></td>
					<td><h6><span class="badge text-bg-danger">${item.rejectedAt ? 'Reject' : 'unReject'}</h6></span></td>
					<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
					<td>
						<button onclick="approvedAtRequest('${item._id}', this)" class="btn btn-primary" type="button">
							Approved
						</button>
						<button onclick="rejectAtRequest('${item._id}', this)" class="btn btn-danger" type="button">
							Reject
						</button>
						<button onclick="viewRequest('${item._id}')" data-bs-toggle="modal" data-bs-target="#viewApprovedModal" class="btn btn-info" type="button">
							View
						</button>
					</td>
					
				</tr>
			`
	})
}

function toggleText(spanId, fullText) {
  const span = document.getElementById(spanId);
  const btn = event.target;

  if (btn.textContent === "Read More") {
    span.textContent = fullText;
    btn.textContent = "Read Less";
  } else {
    span.textContent = fullText.substring(0, 5) + "...";
    btn.textContent = "Read More";
  }
}


async function approvedByRequest(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to approved Request?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, approved it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/approvedByRequest/${id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Approved Request Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				getRequest();
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete approved request: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}

async function approvedAtRequest(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to approved Request?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, approved it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/approvedAtRequest/${id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Approved Request Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				getRequested();
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete approved request: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}

async function rejectByRequest(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to reject Request?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, reject it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/rejectByRequest/${id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Reject Request Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				getRequest();
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete reject request: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}

async function rejectAtRequest(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to reject Request?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, reject it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/rejectAtRequest/${id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Reject Request Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				getRequested();
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete reject request: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}



async function countRequest() {
	
	const res = await fetch(`${baseUrl}/countActiveRequest`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('requestCount').textContent = `No Of Count: ${count}`

}

async function countActiveRequest() {
	
	const res = await fetch(`${baseUrl}/countActiveRequest`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('ActiveRequestCount').textContent = `No Of Count: ${count}`

}

async function countInActiveRequest() {
	
	const res = await fetch(`${baseUrl}/countInActiveRequest`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('inActiveRequestCount').textContent = `No Of Count: ${count ? count : 0}`

}

async function viewRequest(id) {

	const res = await fetch(`${baseUrl}/getRequestById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-request-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-request-email').innerHTML = `<strong>Email: </strong> <span> ${view.email} </span>`
		document.getElementById('view-request-phone').innerHTML = `<strong>Phone: </strong> <span> ${view.phone ? view.phone : '----------'} </span>`
		document.getElementById('view-request-addInfo').innerHTML = `<strong>AddInfo: </strong> <span> ${view.addInfo} </span>`

	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete request: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function fetchRole(dropdownSelector) {
	
	const res = await fetch(`${baseUrl}/getRole`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const userRole = data.data

	const dataRoleList = document.querySelector(dropdownSelector)

	dataRoleList.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			 const errorRow = `<option disabled selected>${data.error || "No record found"}</option>`;
			  dataRoleList.innerHTML = errorRow
			return ;
	}

  dataRoleList.innerHTML = `<option value="" disabled selected>Select Role</option>`;

	userRole.forEach((item, index) => {
		dataRoleList.innerHTML += `
				<option value="${item.role}">${item.name}</option>
			`
	})
}

async function getRole() {

	const res = await fetch(`${baseUrl}/getSideBarRole`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const role = data.data

	const listRole = document.getElementById('listRole')

	listRole.innerHTML = '';
	

	if (!data.success || !data.data || data.data.length === 0) {
			listRole.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	const roleBasedRoutes = data.data.filter(item => 
      item.role && (Array.isArray(item.role) ? item.role.length > 0 : item.role !== null && item.role !== undefined)
    );

    if (roleBasedRoutes.length === 0) {
      listRole.innerHTML = `
        <tr>
          <td colspan="7" class="text-center text-warning fw-bold">
            No role-based routes found
          </td>
        </tr>
      `;
      return;
    }

	

	roleBasedRoutes.forEach((item, index) => {
		const roles = Array.isArray(item.role) ? item.role.join(" ") : item.role;

		listRole.innerHTML += `
				<tr>
					<td>${index + 1}</td>
					<td>${item.routeName}</td>
					<td>${item.paramName}</td>
					<td>${roles || "-"}</td>
					<td>
						<select class="form-select">
							<option value="" disabled>select field</option> 
							<option value="">show</option> 
							<option value="">hide</option> 
							<option value="">disabled</option> 
							<option value="">enabled</option>
							<option value="">mandatory</option>
							<option value="">non-mandatory</option>
							<option value="">authorization</option>
							<option value="">un-authorization</option>
						</select>
					</td>
				</tr>
			`
	})
	
}

async function getRoutes() {
	
	const res = await fetch(`${baseUrl}/getSideBarRoutes`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const role = data.data

	const namelist = document.getElementById('add-name')
	const routeNamelist = document.getElementById('add-route-name')
	const rolelist = document.getElementById('add-role')

	namelist.innerHTML = '';
	routeNamelist.innerHTML = '';
	rolelist.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			const errorRow = `<option disabled selected>${data.error || "No record found"}</option>`;
				namelist.innerHTML = errorRow
				routeNamelist.innerHTML = errorRow
				rolelist.innerHTML = errorRow
			return ;
	}

  namelist.innerHTML = `<option value="" disabled selected>Select Name</option>`;
  routeNamelist.innerHTML = `<option value="" disabled selected>Select Route Name</option>`;
  rolelist.innerHTML = `<option value="" disabled selected>Select Role</option>`;

	const filteredRoutes = data.data.filter(item => {
		if (Array.isArray(item.role)) {
		return item.role.includes(0);
		}
		return Number(item.role) === 0;
  	});

	 const uniqueRoles = new Set();

	filteredRoutes.forEach((item, index) => {
		namelist.innerHTML += `
				<option value="${item.routeName}">${item.routeName}</option>
			`
		routeNamelist.innerHTML += `
				<option value="${item.paramName}">${item.paramName}</option>
			`

		if (Array.isArray(item.role)) {
			item.role.forEach(r => uniqueRoles.add(r));
		} else {
			uniqueRoles.add(item.role);
		}

	
	})

	uniqueRoles.forEach(role => {
		rolelist.innerHTML += `<option value="${role}">${role}</option>`;
	});
}

async function getEditRoutes() {
	
	const res = await fetch(`${baseUrl}/getSideBarRoutes`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	// const role = data.data

	const namelist = document.getElementById('edit-name')
	const routeNamelist = document.getElementById('edit-route-name')
	const rolelist = document.getElementById('edit-role')

	namelist.innerHTML = '';
	routeNamelist.innerHTML = '';
	rolelist.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			const errorRow = `<option disabled selected>${data.error || "No record found"}</option>`;
				namelist.innerHTML = errorRow
				routeNamelist.innerHTML = errorRow
				rolelist.innerHTML = errorRow
			return ;
	}

  namelist.innerHTML = `<option value="" disabled selected>Select Name</option>`;
  routeNamelist.innerHTML = `<option value="" disabled selected>Select Route Name</option>`;
  rolelist.innerHTML = `<option value="" disabled selected>Select Role</option>`;

	const filteredRoutes = data.data.filter(item => Number(item.role) === 0);

	filteredRoutes.forEach((item, index) => {
		namelist.innerHTML += `
				<option value="${item.routeName}">${item.routeName}</option>
			`
		routeNamelist.innerHTML += `
				<option value="${item.paramName}">${item.paramName}</option>
			`

		rolelist.innerHTML += `
				<option value="${item.role}">${item.role}</option>
			`
	})
}



async function getPermission() {
	const res = await fetch(`${baseUrl}/getPermission`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const permission = data.data

	const listpermission = document.getElementById('permission-list')

	listpermission.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listpermission.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	permission.forEach((item, index) => {
		listpermission.innerHTML += `
				<tr>
                <td>${index + 1}</td>
                <td>${item.routeName}</td>
                <td>${item.paramName}</td>
				<td>${item.role}</td>
				<td>${item.action?.join(' ')}</td>
                <td>${item.description}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="viewPermission('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewPermissionModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editPermission('${item._id}')" class="dropdown-item" href="#PostModal" data-bs-toggle="modal"
                	data-bs-target="#editPermissionModal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deletePermission('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
}

async function addPermission() {
	const routeName = document.getElementById('add-name').value
	const paramName = document.getElementById('add-route-name').value
 	const description = document.getElementById('description').value

	const role = Array.from(document.getElementById('add-role').selectedOptions)
		.map(opt => Number(opt.value));

	const action = Array.from(document.querySelectorAll('.form-check-input:checked'))
		.map(cb => cb.value);
	
	const res = await fetch(`${baseUrl}/addPermission`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ routeName, paramName, role, description, action })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Permission Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			getPermission();
			$('#permissionModal').modal('hide');
			document.getElementById('add-name').value = ""
			document.getElementById('add-route-name').value = ""
			document.getElementById('add-role').selectedIndex = -1;
			document.getElementById('description').value = ""
			document.querySelectorAll('.form-check-input').forEach(cb => cb.checked = false);

		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete permission: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function deletePermission(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to delete this permission?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deletePermission/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Delete Permission Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				getPermission();
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete permission: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}

async function editPermission(id) {
	selectedPermissionId = id;
	const res = await fetch(`${baseUrl}/editPermissionById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const permission = data.data[0]
		document.getElementById('edit-id').value = permission._id
		document.getElementById('edit-name').value = permission.routeName
		document.getElementById('edit-route-name').value = permission.paramName
		document.getElementById('edit-role').value = permission.role
		document.getElementById('edit-description').value = permission.description

		document.querySelectorAll('.edit-perm-checkbox').forEach(cb => cb.checked = false);

		if (Array.isArray(permission.action)) {
			permission.action.forEach(perm => {
				const checkbox = document.querySelector(`.edit-perm-checkbox[value="${perm}"]`);
				if (checkbox) checkbox.checked = true;
			});
		}

	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete permission: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}


async function viewPermission(id) {

	const res = await fetch(`${baseUrl}/viewPermissionById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const view = data.data[0]

		document.getElementById('view-permission-id').innerHTML = `<strong>ID: </strong> <span> ${view._id} </span>`
		document.getElementById('view-permission-name').innerHTML = `<strong>Name: </strong> <span> ${view.routeName} </span>`
		document.getElementById('view-permission-route-name').innerHTML = `<strong>RouteName: </strong> <span> ${view.paramName} </span>`
		document.getElementById('view-permission-role').innerHTML = `<strong>Role: </strong> <span> ${view.role} </span>`
		document.getElementById('view-permission-description').innerHTML = `<strong>Description: </strong> <span> ${view.description} </span>`
		document.getElementById('view-permission-createdAt').innerHTML = `<strong>CreatedAt: </strong> <span> ${new Date(view.createdAt).toISOString().split('T')[0]} </span>`
		document.getElementById('view-permission-updatedAt').innerHTML = `<strong>UpdatedAt: </strong> <span> ${new Date(view.updatedAt).toISOString().split('T')[0]} </span>`
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete post: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function countPermission() {
	
	const res = await fetch(`${baseUrl}/permissionCount`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('permCount').textContent = `No Of Count: ${count}`

}

async function getUserInActive() {
    const res = await fetch(`${baseUrl}/getUserInActive`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const InActiveUser = data.data

	const employeeData = document.getElementById('employeeData')
    const employee_data = document.getElementById('employee_data')
	const employeedata = document.getElementById('employee-Data')


	employeeData.innerHTML = '';
    employee_data.innerHTML = '';
    employeedata.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
        const errorRow = `<option disabled selected>${data.error || "No inactive users found"}</option>`;
			employeeData.innerHTML = errorRow
            employee_data.innerHTML = errorRow
            employeedata.innerHTML = errorRow
			return;
	}

    

    employeeData.innerHTML = `<option value="" disabled selected>Select Username</option>`;
    employee_data.innerHTML = `<option value="" disabled selected>Select Email</option>`;
    employeedata.innerHTML = `<option value="" disabled selected>Select Phone</option>`;

	InActiveUser.forEach((item, index) => {
    
    const fullname = `${item.firstname} ${item.lastname}`

	employeeData.innerHTML += `
				<option value="${fullname}">${fullname}</option>
			`;
    employee_data.innerHTML += `
				<option value="${item.email}">${item.email}</option>
			`;

    employeedata.innerHTML += `
				<option value="${item._id}">${item.phone ? item.phone : '----------'}</option>
			`
	})

	
}


async function requestSubmit() {
    const username = document.getElementById('employeeData').value
    const email = document.getElementById('employee_data').value
    const phoneValue = document.getElementById('employee-Data').value
    const reqInfo = document.getElementById('request-info').value
    const addInfo = document.getElementById('add-info').value

    const phone = phoneValue === "" ? null : phoneValue;

    const res = await fetch(`${baseUrl}/addRequest`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, email, phone, reqInfo, addInfo })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Request Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			$('#requestModal').modal('hide')
			document.getElementById('employeeData').value = ""
            document.getElementById('employee_data').value = ""
            document.getElementById('employee-Data').value = ""
            document.getElementById('request-info').value = ""
            document.getElementById('add-info').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete request: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}
	async function addCategory() {
		const categories = [...document.querySelectorAll("input[name='category[]']")].map(i => i.value);
		const subCategories = [...document.querySelectorAll("input[name='subCategory[]']")].map(i => i.value);
		const description = document.getElementById("add-description").value;

		const res = await fetch(`${baseUrl}/addCategory`, {
		method: "POST",
		headers: { 
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}` 
		},
		body: JSON.stringify({ category: categories, subCategory: subCategories, description })
		});

		const data = await res.json();

		if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Post Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchCategory();
			countCategory()
			$('#categoryModal').modal('hide');
	
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete category: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
	}
  
	async function fetchCategory() {

	const res = await fetch(`${baseUrl}/getCategory`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const category = data.data

	const listcategory = document.getElementById('category-list')

	listcategory.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listcategory.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	category.forEach((item, index) => {
		 const subTree = `
			<ul class="list-unstyled ms-3">
				${item.subCategories.map(s => `<li>📂 ${s.name}</li>`).join("")}
			</ul>
    	`;

		listcategory.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
				<td>
				<span class="tree-toggle" style="cursor:pointer;">
            		▶
          		</span> ${item.name}
				${subTree}
				</td>
                <td>${item.description}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewPostModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editCategory('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editCategoryModal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deleteCategory('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})

	  document.querySelectorAll(".tree-toggle").forEach(toggle => {
    toggle.addEventListener("click", function () {
      const subList = this.parentElement.querySelector("ul");
      if (subList.classList.contains("d-none")) {
        subList.classList.remove("d-none");
        this.textContent = "▼"; 
      } else {
        subList.classList.add("d-none");
        this.textContent = "▶"; 
      }
    });
  });
}

async function countCategory() {
	
	const res = await fetch(`${baseUrl}/countCategory`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('categoryCount').textContent = `No Of Count: ${count}`

}

async function deleteCategory(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to delete this category?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deleteCategory/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Delete Category Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				fetchCategory();
				countCategory()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete category: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}

async function editCategory(id) {
	selectedCategoryId = id;
	const res = await fetch(`${baseUrl}/getCategoryById/${id}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	if (res.ok && data.success && data.data.length > 0) {
		const category = data.data[0];
		document.getElementById('edit-category-id').value = category._id
		document.getElementById('edit-desc').value = category.description || '';

		const categoryRepeater = document.getElementById('editCategoryRepeater');
		categoryRepeater.innerHTML = '';

		const categoryGroup = document.createElement('div');
        categoryGroup.classList.add('row', 'g-3', 'align-items-center', 'mb-2', 'edit-category-group');
        categoryGroup.innerHTML = `
            <div class="col-auto">
                <label class="col-form-label">Category</label>
            </div>
            <div class="col-auto">
                <input type="text" class="form-control custom-border" name="category[]" value="${category.name || ''}" required>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-danger edit-remove-category d-none">Remove</button>
            </div>
        `;
        categoryRepeater.appendChild(categoryGroup);

		const subCategoryRepeater = document.getElementById('editSubCategoryRepeater');
		subCategoryRepeater.innerHTML = '';

		if (category.subCategories && category.subCategories.length > 0) {
			category.subCategories.forEach((subCat, index) => {
				const subCatName = typeof subCat === "object" ? subCat.name : subCat;

				const subCategoryGroup = document.createElement('div');
				subCategoryGroup.classList.add('row', 'g-3', 'align-items-center', 'mb-2', 'edit-sub-category-group');
				subCategoryGroup.innerHTML = `
				  <div class="col-auto">
					<label class="col-form-label">Sub Category</label>
				  </div>
				  <div class="col-auto">
					<input type="text" class="form-control custom-border" name="subCategory[]" value="${subCatName}" required>
				  </div>
				  <div class="col-auto">
					<button type="button" class="btn btn-danger edit-remove-sub-category ${index === 0 ? 'd-none' : ''}">Remove</button>
				  </div>
				`;
				subCategoryRepeater.appendChild(subCategoryGroup);
			});
		}

	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete category: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function	updateCategory() {
		const id = document.getElementById('edit-category-id').value;
		const categories = [...document.querySelectorAll("input[name='editCategory[]']")].map(i => i.value);
		const subCategories = [...document.querySelectorAll("input[name='editSubCategory[]']")].map(i => i.value);
		const description = document.getElementById("edit-desc").value;
		const res = await fetch(`${baseUrl}/updateCategory/${id}`, {
		method: "PUT",
		headers: { 
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}` 
		},
		body: JSON.stringify({ category: categories, subCategory: subCategories, description })
		});

		const data = await res.json();
		console.log(data);

		if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Category Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchCategory();
			$('#editCategoryModal').modal('hide');
	
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete category: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
	}

async function approvedPost(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to approved Post?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, approved it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/approvedPost/${id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Approved Post Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				fetchUnPublishedPost();
				countUnPublishedPost()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete approved post: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}

async function publishedPost(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to published Post?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, published it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/publishedPost/${id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'published Post Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				fetchPublishedPost();
				countPublishedPost()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete published post: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}

async function rejectPost(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to reject Post?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, reject it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/rejectPost/${id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Reject Post Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				fetchUnPublishedPost();
				countUnPublishedPost()
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete reject post: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}


async function fetchContactUs() {

	const res = await fetch(`${baseUrl}/getContactUs`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const contact = data.data	

	const listcontact = document.getElementById('list-contact')

	listcontact.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listcontact.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	contact.forEach((item, index) => {
		
		listcontact.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
				<td>${item.contact_no}</td>
                <td>${item.subject}</td>
				<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="viewContactUs('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewContactUsModel"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editContactUs('${item._id}')" class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editContactUsModal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deleteContactUs('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
					</ul>
                </td>
				</tr>
			`
	})
}

async function deleteContactUs(id) {
	const result = await Swal.fire({
		title: 'Are you sure you want to delete this contact us?',
		text: 'You won\'t be able to revert this!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'Cancel'
	})

	if (result.isConfirmed) {
		const res = await fetch(`${baseUrl}/deleteContactUs/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `${tokenType} ${access_Token}`
			}
		})

		const data = await res.json()

		if (res.ok) {
			Swal.fire({
				icon: 'success',
				title: 'Delete Successfully',
				text: data.message,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			}).then(() => {
				fetchContactUs();
			});

		} else {
			Swal.fire({
				icon: 'error',
				title: `Failed to delete post: ${data.error || res.statusText}`,
				text: data.error,
				timer: 2000,
				showConfirmButton: false,
				timerProgressBar: true
			})
		}
	}
}



async function fetchLogsConfig() {
	const modulelist = document.getElementById('module-list')
	const listLogConfig = document.getElementById('log-config-list')

	listLogConfig.innerHTML = `
    <tr>
      <td colspan="7" class="text-center text-muted fw-bold">
        No record found
      </td>
    </tr>
  `;

	 const selectedModuleType = modulelist ? modulelist.value : '';

	if (!selectedModuleType) {
		console.warn('⚠️ No moduleType selected');
		return;
	}

	const queryParams = new URLSearchParams({
		moduleType: selectedModuleType
	});

	const res = await fetch(`${baseUrl}/getLogsConfig?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const logConfig = data.data

	console.log(logConfig, 'logConfig');
	
	listLogConfig.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listLogConfig.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	logConfig.forEach((item, index) => {
		listLogConfig.innerHTML += `
				 <tr id="row-${item._id}">
                <td>${index + 1}</td>
                <td>${item.label}</td>
                <td>${item.field_name}</td>
				<td>${item.data_type}</td>
                <td>
					<h6>
						<span class="badge ${item.tracking_enabled ? 'text-bg-success' : 'text-bg-danger'}">
							${item.tracking_enabled ? 'enabled' : 'disabled'}
						</span>
					</h6>
				</td>
				<td>
					<button class="btn border-0 edit-btn" data-id="${item._id}">
						<i class="fa-solid fa-pencil text-info"></i>
					</button>

				</td>
                
				</tr>
			`
	})

	attachEditEventListeners();
}

function attachEditEventListeners() {
  document.querySelectorAll('.edit-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openInlineEditForm(id);
    });
  });
}

function openInlineEditForm(id) {
  const row = document.getElementById(`row-${id}`);
  const originalHTML = row.innerHTML;

  const label = row.children[1].innerText;
  const fieldName = row.children[2].innerText;
  const dataType = row.children[3].innerText;
  const isEnabled = row.querySelector('.badge').classList.contains('text-bg-success'); // true if enabled

  row.innerHTML = `
    <td colspan="6">
      <form id="edit-form-${id}" class="p-2 bg-light border rounded">
        <div class="row g-2 align-items-center">
          <div class="col-md-2">
            <input type="text" class="form-control" name="label" value="${label}" placeholder="Label">
          </div>
          <div class="col-md-2">
            <input type="text" class="form-control" name="field_name" value="${fieldName}" placeholder="Field Name" readonly>
          </div>
          <div class="col-md-2">
            <input type="text" class="form-control" name="data_type" value="${dataType}" placeholder="Data Type" readonly>
          </div>

          <!-- ✅ Toggle Switch -->
          <div class="col-md-2 d-flex align-items-center">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" name="tracking_enabled" id="switch-${id}" ${isEnabled ? 'checked' : ''}>
              <label class="form-check-label" for="switch-${id}">${isEnabled ? 'enabled' : 'disabled'}</label>
            </div>
          </div>

        <div class="col-md-3 d-flex gap-2 justify-content-end">
			<button type="button" class="btn text-success border-0 btn-sm save-btn">
				<i class="fas fa-check me-1"></i> 
			</button>
			<button type="button" class="btn text-danger border-0 btn-sm cancel-btn">
				<i class="fas fa-times me-1"></i> 
			</button>
		</div>
        </div>
      </form>
    </td>
  `;

  const toggleSwitch = row.querySelector(`#switch-${id}`);
  const toggleLabel = row.querySelector(`label[for="switch-${id}"]`);
  toggleSwitch.addEventListener('change', () => {
    toggleLabel.textContent = toggleSwitch.checked ? 'Enabled' : 'Disabled';
  });

  const saveBtn = row.querySelector('.save-btn');
  const cancelBtn = row.querySelector('.cancel-btn');

  saveBtn.addEventListener('click', async () => {
    const form = document.getElementById(`edit-form-${id}`);
    const formData = {
      label: form.label.value,
      field_name: form.field_name.value,
      data_type: form.data_type.value,
      tracking_enabled: form.tracking_enabled.checked
    };

    console.log('Updated Data:', formData);


	const res = await fetch(`${baseUrl}/updateLogs/${id}`, {
		method: 'PUT',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Update Logs Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			fetchLogsConfig(); 
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete logs: ${data.error || res.statusText}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}


  
  });

  cancelBtn.addEventListener('click', () => {
    row.innerHTML = originalHTML;
    const restoredEditBtn = row.querySelector('.edit-btn');
    restoredEditBtn.addEventListener('click', (e) => {
      const newId = e.currentTarget.getAttribute('data-id');
      openInlineEditForm(newId);
    });
  });
}

 
async function getModule() {
	
	const res = await fetch(`${baseUrl}/getModule`, {
		method: 'GET'
	})

	const data = await res.json()

	const module = data.data

	const modulelist = document.getElementById('module-list')

	modulelist.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			 const errorRow = `<option disabled selected>${data.error || "No record found"}</option>`;
			  modulelist.innerHTML = errorRow
			return ;
	}

  modulelist.innerHTML = `<option value="" disabled selected>Select Module</option>`;

	module.forEach((item, index) => {
		modulelist.innerHTML += `
				<option value="${item.moduleType}">${item.moduleName}</option>
			`
	})

	 modulelist.addEventListener('change', fetchLogsConfig);
}

async function viewAllPost() {

	const res = await fetch(`${baseUrl}/getAllPost`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const viewPost = data.data

	const postList = document.getElementById('view-post')

	postList.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			postList.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			return;
	}

	viewPost.forEach((item, index) => {

		postList.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
                <td>${item.title}</td>
                <td>${item.description}</td>
                <td>${item.status ? 'active' : 'inactive'}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
                <td>
				
				</tr>
			`
	})
}

async function fetchTrackingLogs(moduleType) {

	if (!moduleType) {
			if (document.getElementById('view-post')) {
				moduleType = 'p';
			} else if (document.getElementById('view-tag')) {
				moduleType = 't';
			} else if (document.getElementById('view-page')) {
				moduleType = 'pg';
			} else if (document.getElementById('view-user')) {
				moduleType = 'u';
			} else {
				moduleType = selectedModuleType || 'p'; 
			}
		}


	const queryParams = new URLSearchParams({
		moduleType: moduleType || selectedModuleType
	});

	const res = await fetch(`${baseUrl}/getTrackingEnabledLogs?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const trackingLog = data.data

	const postTable = document.getElementById('tracking-logs-list');
	const tagTable = document.getElementById('tracking-logs-tag-list');
	const pageTable = document.getElementById('tracking-logs-page-list');
	const userTable = document.getElementById('tracking-logs-user-list');

	if (postTable) postTable.innerHTML = '';
	if (tagTable) tagTable.innerHTML = '';
	if (pageTable) pageTable.innerHTML = '';
	if (userTable) userTable.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			const noDataHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error || 'No records found'}
					</td>
				</tr>
			`;
			if (moduleType === 'p' && postTable) postTable.innerHTML = noDataHTML;
			if (moduleType === 't' && tagTable) tagTable.innerHTML = noDataHTML;
			if (moduleType === 'pg' && pageTable) pageTable.innerHTML = noDataHTML;
			if (moduleType === 'u' && userTable) userTable.innerHTML = noDataHTML;

			return;
		}

	const rowsHTML = trackingLog.map((item, index) => `
			<tr>
				<td>${index + 1}</td>
				<td>${item.label}</td>
				<td>${item.field_name}</td>
				<td>${item.data_type}</td>
				<td>
					<h6>
						<span class="badge ${item.tracking_enabled ? 'text-bg-success' : 'text-bg-danger'}">
							${item.tracking_enabled ? 'enabled' : 'disabled'}
						</span>
					</h6>
				</td>
			</tr>
		`).join('');

		if (moduleType === 'p' && postTable) postTable.innerHTML = rowsHTML;
		if (moduleType === 't' && tagTable) tagTable.innerHTML = rowsHTML;
		if (moduleType === 'pg' && pageTable) pageTable.innerHTML = rowsHTML;
		if (moduleType === 'u' && userTable) userTable.innerHTML = rowsHTML;


}

async function fetchAllTag() {

	const res = await fetch(`${baseUrl}/getTag`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const viewTag = data.data

	const listViewtag = document.getElementById('view-tag')

	listViewtag.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listViewtag.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error}
					</td>
				</tr>
			`;
			return;
	}

	viewTag.forEach((item, index) => {
		selectedModuleType = item.moduleType
		listViewtag.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
                <td>${item.tagName}</td>
                <td>${item.description}</td>
                <td>${item.status ? 'active' : 'inactive'}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
              
               
				</tr>
			`
	})
}


async function fetchAllPage() {

	const res = await fetch(`${baseUrl}/getPages`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const viewPage = data.data

	const listViewPage = document.getElementById('view-page')

	listViewPage.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listViewPage.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error}
					</td>
				</tr>
			`;
			return;
	}

	viewPage.forEach((item, index) => {
		selectedModuleType = item.moduleType
		listViewPage.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
                <td>${item.pageName}</td>
                <td>${item.pageUrl}</td>
				<td>${item.description}</td>
                <td>${item.status ? 'active' : 'inactive'}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
               
				</tr>
			`
	})
}

async function fetchAllUser() {

	const res = await fetch(`${baseUrl}/getAllUser`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const viewUser = data.data

	const listViewUser = document.getElementById('view-user')

	listViewUser.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listViewUser.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error}
					</td>
				</tr>
			`;
			return;
	}

	viewUser.forEach((item, index) => {
		selectedModuleType = item.moduleType
		listViewUser.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
                <td>${item.firstname}</td>
                <td>${item.lastname}</td>
				<td>${item.email}</td>
                <td>${item.active ? 'active' : 'inactive'}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
               
				</tr>
			`
	})
}

function openApprovedModal(id) {
    selectedRequestId = id;
    console.log("Selected ID:", selectedRequestId);

    document.getElementById("approved-request-id").value = id;
}

function openRejectedModal(id) {
    selectedRejectedtId = id;
    console.log("Selected ID:", selectedRejectedtId);

    document.getElementById("reject-request-id").value = id;
}


async function approvedBy() {
	 const id = selectedRequestId;
	const remarks = document.getElementById('remarks').value

	const res = await fetch(`${baseUrl}/approvedBy/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ remarks })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Approved Request Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			$('#approvedModal').modal('hide');
			getRequest()
			document.getElementById('remarks').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete approved by: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}

async function rejectedBy() {
	 const id = selectedRejectedtId;
	const reason = document.getElementById('reason').value

	const res = await fetch(`${baseUrl}/rejectBy/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ reason })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Rejected Request Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			$('#rejectModal').modal('hide');
			getRequest()
			document.getElementById('reason').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete rejected by: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}


