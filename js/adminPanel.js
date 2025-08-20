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

let currentPage = 1;
const limit = 5;
let totalPages = 1;

let currentTagPage = 1;
let totalTagPages = 1;

let currentPagePage = 1;
let totalPagePages = 1;

let currentUserPage = 1;
let totalUserPages = 1

const firstname = localStorage.getItem('firstname') || ""
const lastname = localStorage.getItem('lastname') || ""

const fullname = `${firstname} ${lastname}`.trim()

document.getElementById('username').textContent = fullname || "No User Found"

const tokenType = localStorage.getItem('tokenType')
const access_Token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', function () {
	fetchDashboard()
	getSideBarRoutes()
	fetchPost()
	fetchTag()
	fetchPages()
	fetchUser()
	countPost()
	countTag()
	countPage()
	countUser()
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

function applyFilters() {
	currentPage = 1;

	fetchPost();
}

function TagApplyFilters() {
	currentTagPage = 1;

	fetchTag();
}

function PageApplyFilters() {
	currentPagePage = 1;

	fetchPages();
}

function UserApplyFilters() {
	currentUserPage = 1;

	fetchUser();
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
	const active = document.getElementById('edit-user-active').checked
	const is_admin = document.getElementById('edit-user-admin').checked

	const res = await fetch(`${baseUrl}/updateUser/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${tokenType} ${access_Token}`
		},
		body: JSON.stringify({ firstname, lastname, email, active, is_admin })
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
			fetchUser();
			$('#UserModal').modal('hide');
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

async function fetchTag(page = 1) {

	currentTagPage = page

	const sortValue = document.getElementById('sortTagSelect')?.value || "";

	const searchTagInput = document.getElementById('searchTagInput')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchTagInput,
		sort: sortValue,
		page: currentTagPage,
		limit
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
                    <li><a onclick="editTag('${item._id}')" class="dropdown-item" href="#TagModal" data-bs-toggle="modal"> <i
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
		limit
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
                    <li><a onclick="editPage('${item._id}')" class="dropdown-item" href="#PageModal" data-bs-toggle="modal"> <i
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

















async function fetchUser(page = 1) {

	currentUserPage = page

	const sortValue = document.getElementById('sortUserSelect')?.value || "";

	const searchUserInput = document.getElementById('searchUserInput')?.value || "";

	const queryParams = new URLSearchParams({
		search: searchUserInput,
		sort: sortValue,
		page: currentUserPage,
		limit
	});

	const res = await fetch(`${baseUrl}/getUser?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const user = data.data

	const userlist= document.getElementById('userlist')

	userlist.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			userlist.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			document.getElementById('userPagination').innerHTML = '';
			return;
	}

	user.forEach((item, index) => {
	
	userlist.innerHTML += `
				 <tr>
                <td>${(currentUserPage - 1) * limit + index + 1}</td>
                <td>${item.firstname || item.firstname}</td>
                <td>${item.lastname}</td>
				<td>${item.email}</td>
                <td>${item.active ? 'active' : 'inactive'}</td>
                <td>${new Date(item.createdAt).toISOString().split('T')[0]}</td>
				<td>${new Date(item.updatedAt).toISOString().split('T')[0]}</td>
                <td>
                  <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    &#8942;
                  </button>
                  <ul class="dropdown-menu">
                    <li><a onclick="viewUser('${item._id}')" class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewModalUser"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editUser('${item._id}')" class="dropdown-item" href="#UserModal" data-bs-toggle="modal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deleteUser('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
	totalUserPages = data.pagination.totalPages;
	renderUserPaginationButtons(totalUserPages);
}

function renderUserPaginationButtons(total) {
	const pagination = document.getElementById('userPagination');
	pagination.innerHTML = '';

	const prev = document.createElement('li');
	prev.className = `page-item ${currentUserPage === 1 ? 'disabled' : ''}`;
	prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
	prev.onclick = (e) => {
		e.preventDefault();
		if (currentUserPage > 1) fetchUser(currentUserPage - 1);
	};
	pagination.appendChild(prev);

	for (let i = 1; i <= total; i++) {
		const pageBtn = document.createElement('li');
		pageBtn.className = `page-item ${i === currentUserPage ? 'active' : ''}`;
		pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		pageBtn.onclick = (e) => {
			e.preventDefault();
			fetchUser(i);
		};
		pagination.appendChild(pageBtn);
	}

	const next = document.createElement('li');
	next.className = `page-item ${currentUserPage === total ? 'disabled' : ''}`;
	next.innerHTML = `<a class="page-link" href="#">Next</a>`;
	next.onclick = (e) => {
		e.preventDefault();
		if (currentUserPage < total) fetchUser(currentUserPage + 1);
	};
	pagination.appendChild(next);
}

document.getElementById('searchUserInput')?.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		currentUserPage = 1;
		fetchUser();
	}
});

document.getElementById('sortUserSelect')?.addEventListener('change', () => {
	currentUserPage = 1;
	fetchUser();
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
				fetchUser();
				countUser()
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








async function addTag() {
	const tagName = document.getElementById('tag-name').value
	const description = document.getElementById('tag-description').value

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
			fetchTag();
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

    try {
        const res = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenType} ${access_Token}`
            },
            body: JSON.stringify({firstname, lastname, email, password, confirmPass})
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
                fetchUser(); // You'll need to implement this function
				countUser()
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

async function countPost(search = "") {
	
	const queryParams = new URLSearchParams();

	if (search) queryParams.append("search", search);
	
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

async function countTag(search = "") {
	const queryParams = new URLSearchParams();

	if (search) queryParams.append("search", search );

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

async function countPage(search = "") {

	const queryParams = new URLSearchParams();
	if (search) queryParams.append("search", search);

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

async function countUser(search = "") {
	const queryParams = new URLSearchParams();
	if (search) queryParams.append("search", search);

	const res = await fetch(`${baseUrl}/countUser?${queryParams.toString()}`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		},
	})

	const data = await res.json()

	const count = data.count

	document.getElementById('userCount').textContent = `No Of Count: ${count}`

}

function getSearchParamsAndCount() {
  const search = document.getElementById('searchInput').value.trim();

  countPost(search);
}

document.getElementById('searchInput').addEventListener('input', getSearchParamsAndCount);

function getSearchTagParamsAndCount() {
  const search = document.getElementById('searchTagInput').value.trim();

  countTag(search);
}

document.getElementById('searchTagInput').addEventListener('input', getSearchTagParamsAndCount);

function getSearchPageParamsAndCount() {
  const search = document.getElementById('searchPageInput').value.trim();

  countPage(search);
}

document.getElementById('searchPageInput').addEventListener('input', getSearchPageParamsAndCount);

function getSearchUserParamsAndCount() {
  const search = document.getElementById('searchUserInput').value.trim();

  countUser(search);
}

document.getElementById('searchUserInput').addEventListener('input', getSearchUserParamsAndCount);