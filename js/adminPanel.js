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

const tokenType = localStorage.getItem('tokenType')
const access_Token = localStorage.getItem('token')

document.addEventListener('DOMContentLoaded', function () {
	fetchDashboard()
	getSideBarRoutes()
	fetchPost()
fetchTag()
fetchPages()
fetchUser()
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

async function fetchPost() {
	const res = await fetch(`${baseUrl}/getPost`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const post = data.data

	const listpost = document.getElementById('postlist')

	listpost.innerHTML = '';

	post.forEach((item, index) => {
		listpost.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
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
}

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

function update() {
	if (selectedPostId) {
      updatePost(selectedPostId);
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








async function fetchTag() {
	const res = await fetch(`${baseUrl}/getTag`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const tag = data.data

	const listtag = document.getElementById('taglist')

	listtag.innerHTML = '';

	tag.forEach((item, index) => {
		listtag.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
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
                    <li><a class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewPostModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editTag('${item._id}')" class="dropdown-item" href="#TagModal" data-bs-toggle="modal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deleteTag('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
}
















async function fetchPages() {
	const res = await fetch(`${baseUrl}/getPages`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const pages = data.data

	const listpages = document.getElementById('pagelist')

	listpages.innerHTML = '';

	pages.forEach((item, index) => {
	
	listpages.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
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
                    <li><a class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewPostModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editPage('${item._id}')" class="dropdown-item" href="#PageModal" data-bs-toggle="modal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deletePage('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
}

















async function fetchUser() {
	const res = await fetch(`${baseUrl}/getUser`, {
		method: 'GET',
		headers: {
			'Authorization': `${tokenType} ${access_Token}`
		}
	})

	const data = await res.json()

	const user = data.data

	const userlist= document.getElementById('userlist')

	userlist.innerHTML = '';

	user.forEach((item, index) => {
	
	userlist.innerHTML += `
				 <tr>
                <td>${index + 1}</td>
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
                    <li><a class="dropdown-item view-btn" href="#" data-bs-toggle="modal" data-bs-target="#viewPostModal"> <i class="fas fa-eye me-2 text-warning"></i> View</a></li>
                    <li><a onclick="editUser('${item._id}')" class="dropdown-item" href="#UserModal" data-bs-toggle="modal"> <i
                          class="fas fa-edit me-2 text-info"></i> Edit</a></li>
                    <li><a onclick="deleteUser('${item._id}')" class="dropdown-item" href="#"><i class="fas fa-trash-alt me-2 text-danger"></i> Delete</a></li>
                  </ul>
                </td>
				</tr>
			`
	})
}








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