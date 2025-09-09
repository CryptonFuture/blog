/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

const pref = 'api/v1'
const Url = `http://localhost:8000/${pref}`

let currentPage = 1;
const limit = 6;
let totalPages = 1;

document.addEventListener('DOMContentLoaded', function () {
    fetchPublishedPost()
    fetchPage()
})

async function fetchPublishedPost(page = 1) {

	currentPage = page

	const queryParams = new URLSearchParams({
		page: currentPage,
		limit,
	});

	const res = await fetch(`${Url}/fetchPublishedPost?${queryParams.toString()}`, {
		method: 'GET',
	})

	const data = await res.json()

	const pubishedPost = data.data

	const publishedPostList = document.getElementById('publishedPost')

	publishedPostList.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			publishedPostList.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
					</td>
				</tr>
			`;
			document.getElementById('PagesPagination').innerHTML = '';

			return;
	}
 
	pubishedPost.forEach((item, index) => {
		
		publishedPostList.innerHTML += `
            ${item.postStatus === 'completed' ?
                `
                 
                    <div class="col-12 col-md-4" >
                            <div class="card mt-5 custom-card">
                            <img src="${item.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title"><h6 style="color: grey; font-weight:500; font-size: 14px">${item.title}</h6></h5>
                                <p class="card-text hover-card-text" style="color: black; font-weight:600; font-size: 16px">${item.description}</p>
                                <a style="border-radius: 50px;" href="#" class="btn btn-md btn-primary">Read More</a>
                            </div>
                            </div>
                              </div>
                     
                `
                : ''

            }
            
				
			`
            
	})
            
	totalPages = data.pagination.totalPages;
	renderPagesPaginationButtons(totalPages);
}

async function fetchPage() {

	const res = await fetch(`${Url}/getPage`, {
		method: 'GET',
	})

	const data = await res.json()

	const pages = data.data

	const pagelist = document.getElementById('pages-list')

	pagelist.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			pagelist.innerHTML = `
				<tr>
					<td colspan="7" class="text-center text-danger fw-bold">
						${data.error }
						
					</td>
				</tr>
			`;
			return;
	}

	pages.forEach((item, index) => {
	
	pagelist.innerHTML += `
				 <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="${item.pageUrl}">${item.pageName}</a></li>
                 
                 `
	})

	
}

function renderPagesPaginationButtons(total) {
	const pagination = document.getElementById('PagesPagination');
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

