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

document.addEventListener('DOMContentLoaded', function () {
    fetchPublishedPost()
    fetchPage()
})

async function fetchPublishedPost() {

	const res = await fetch(`${Url}/fetchPublishedPost`, {
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
			return;
	}
 
	pubishedPost.forEach((item, index) => {
		
		publishedPostList.innerHTML += `
            ${item.postStatus === 'completed' ?
                `
                 
                    <div class="col-12 col-md-4" >
                            <div class="card custom-card">
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
            
	
}

document.getElementById('').innerHTML = `
   
`

async function fetchPage() {

	const res = await fetch(`${Url}/getPage`, {
		method: 'GET',
	})

	const data = await res.json()

	const page = data.data

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

	page.forEach((item, index) => {
	
	pagelist.innerHTML += `
				 <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="${item.pageUrl}">${item.pageName}</a></li>
                 
                 `
	})
	
}

