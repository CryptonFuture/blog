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

let currentPage = 1;
const limit = 5;
let totalPages = 1;

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

const fullname = `${firstname} ${lastname}`.trim()

document.getElementById('username').textContent = fullname || "No User Found"
document.getElementById('email').textContent = emailAddress || "No User Found"



const tokenType = localStorage.getItem('tokenType')
const access_Token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', function () {
	fetchDashboard()
	getSideBarRoutes()
	fetchPost()
	fetchTag()
	fetchPages()
	fetchActiveUser()
	fetchInActiveUser()
	countPost()
	countTag()
	countPage()
	countActiveUser()
	countInActiveUser()
	viewProfile()
	editProfile()
	fetchLogs()
	countLogs()
	getRequest()
	countRequest()
	fetchRole('.add-user-role')
	fetchRole('.edit-user-role')
	getRole()
	getPermission()
	getRoutes()
	getEditRoutes()

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

	const role = Number(localStorage.getItem('role')) || 0
	
	const sideBarRoutes = data.data || [];

	const sideBarRouteslist = document.getElementById('sidebarRoutes')

	sideBarRouteslist.innerHTML = '';

	const filteredRoutes = sideBarRoutes.filter(route => {
		return route.role === role;
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

	fetchPost();
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
	fetchPost();
	countPost()	
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

async function fetchPost(page = 1) {

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

	const res = await fetch(`${baseUrl}/getPost?${queryParams.toString()}`, {
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
			document.getElementById('pagination').innerHTML = '';
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
                <td>${item.description}</td>
                <td>${item.status ? 'published' : 'unPublished'}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="viewPost('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewPostModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editPost('${item._id}')" class="dropdown-item" href="#PostModal" data-bs-toggle="modal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deletePost('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
	totalPages = data.pagination.totalPages;
	renderPaginationButtons(totalPages);
}

function renderPaginationButtons(total) {
	const pagination = document.getElementById('pagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentPage > 1) fetchPost(currentPage - 1);
	};
	pagination.appendChild(prev);

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchPost(i);
		};
		pagination.appendChild(pageBtn);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentPage < total) fetchPost(currentPage + 1);
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
	const description = document.getElementById('description').value
	
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
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ title, description })
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
			fetchPost();
			countPost()
			$('#postModal').modal('hide');
			document.getElementById('title').value = ""
			document.getElementById('description').value = ""
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
				fetchPost();
				countPost()
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
		document.getElementById('edit-post-id').value = post._id
		document.getElementById('edit-post-title').value = post.title
		document.getElementById('edit-post-description').value = post.description
		document.getElementById('edit-post-status').checked = post.status

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
	}
}


async function updatePost(id) {
	
	const title = document.getElementById('edit-post-title').value
	const description = document.getElementById('edit-post-description').value
	const status = document.getElementById('edit-post-status').checked

	const res = await fetch(`${baseUrl}/updatePost/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ title, description, status })
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
			fetchPost();
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
	const status = document.getElementById('edit-page-status').checked

	const res = await fetch(`${baseUrl}/updatePages/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ pageName, description, status })
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

	const res = await fetch(`${baseUrl}/updateUser/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ firstname, lastname, email, active, is_admin, role })
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

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentTagPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchTag(i);
		};
		pagination.appendChild(pageBtn);
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
                <td>${item.status ? 'active' : 'inactive'}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
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

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentPagePage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchPages(i);
		};
		pagination.appendChild(pageBtn);
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
					<h6><span class="badge text-bg-success">${item.active ? 'active' : 'inactive'}</span></h6>
				</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
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
					<h6><span class="badge text-bg-danger">${item.active ? 'active' : 'inactive'}</span></h6>
				</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
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

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentActiveUserPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchActiveUser(i);
		};
		pagination.appendChild(pageBtn);
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

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentInActiveUserPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchInActiveUser(i);
		};
		pagination.appendChild(pageBtn);
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
	const description = document.getElementById('page-description').value

	document.getElementById('page-name-error').textContent = ""

	let isValid = true;
    if (!pageName) {
        document.getElementById('page-name-error').textContent = 'page name is required.';
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
		body: JSON.stringify({ pageName, description })
		
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
    const role = document.querySelector('.edit-user-role').value;

	document.getElementById('firstname-error').textContent = ""
  	document.getElementById('lastname-error').textContent = ""
	document.getElementById('email-error').textContent = ""
  	document.getElementById('password-error').textContent = ""
	document.getElementById('confirm-password-error').textContent = ""
	document.getElementById('role-error').textContent = ""

   let isValid = true;
    if (!firstname) {
        document.getElementById('firstname-error').textContent = 'Firstname is required.';
        isValid = false;
    }
	 if (!lastname) {
        document.getElementById('lastname-error').textContent = 'Lastname is required.';
        isValid = false;
    }

	 if (!role) {
        document.getElementById('role-error').textContent = 'role is required.';
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
                'Content-Type': 'application/json',
                'Authorization': `${tokenType} ${access_Token}`
            },
            body: JSON.stringify({firstname, lastname, email, password, confirmPass, role})
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

async function countPost(search = "", status = "", date = "") {
	
	const queryParams = new URLSearchParams();

	if (search) queryParams.append("search", search);
	if (status) queryParams.append("status", status);
	if (date) queryParams.append("date", date);
	
	const res = await fetch(`${baseUrl}/countPost?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('postCount').textContent = `No Of Count: ${count}`

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

  countPost(search, status, date);
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
		fetchPost(currentPage)
		countPost()
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

	currentLogsPage = page

	const queryParams = new URLSearchParams({
		page: currentLogsPage,
		limit,
		date: Logsfilters.date,
		loginTime: Logsfilters.loginTime,
		logoutTime: Logsfilters.logoutTime
	});

	const res = await fetch(`${baseUrl}/getLogs?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const logs = data.data

	const listlogs = document.getElementById('logs-list')

	listlogs.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			listlogs.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }

					</td>
				</tr>
			`;
			document.getElementById('logsPagination').innerHTML = '';
			return;
	}

	

	logs.forEach((item, index) => {
		listlogs.innerHTML += `
				 <tr>
					<td>${(currentLogsPage - 1) * limit + index + 1}</td>
					<td>${item.user_id.firstname ? item.user_id.firstname : '----------'} ${item.user_id.lastname ? item.user_id.lastname : '----------'}</td>
					<td>${item.login_time ? new Date(item.login_time).toLocaleTimeString() : '----------'}</td>
					<td>${item.logout_time ? new Date(item.logout_time).toLocaleTimeString() : '----------'}</td>
					<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
					<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
				</tr>
			`
	})

	totalLogsPages = data.pagination.totalPages;
	renderLogsPaginationButtons(totalLogsPages);
		
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

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentLogsPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchLogs(i);
		};
		pagination.appendChild(pageBtn);
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
	
	const res = await fetch(`${baseUrl}/getRequest`, {
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
					
					<td>${item.approved ? 'Approved' : 'unApproved'}</td>
					<td>${item.reject ? 'Reject' : 'unReject'}</td>
					<td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
					<td>
						<button onclick="approvedRequest('${item._id}', this)" class="btn btn-primary" type="button">
							Approved
						</button>
						<button onclick="rejectRequest('${item._id}', this)" class="btn btn-danger" type="button">
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


async function approvedRequest(id) {
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
		const res = await fetch(`${baseUrl}/approvedRequest/${id}`, {
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

async function rejectRequest(id) {
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
		const res = await fetch(`${baseUrl}/rejectRequest/${id}`, {
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



async function countRequest() {
	
	const res = await fetch(`${baseUrl}/countRequest`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('requestCount').textContent = `No Of Count: ${count}`

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

	role.forEach((item, index) => {
		listRole.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
                <td>${item.routeName}</td>
                <td>${item.paramName}</td>
				<td>${item.role ? 'admin': 'user'}</td>
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

async function getEditRoutes() {
	
	const res = await fetch(`${baseUrl}/getSideBarRoutes`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const role = data.data

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
	const role = document.getElementById('add-role').value
	const description = document.getElementById('description').value

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
			document.getElementById('add-role').value = ""
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
