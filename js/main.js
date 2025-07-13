(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

  $(document).ready(function() {
	$('#openModal').on('click', function() {
		const ModalHtml = `
		<div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginModalLabel">Login</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter your email">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Enter your password">
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="rememberMe">
                                <label class="form-check-label" for="rememberMe">Remember me</label>
                            </div>
							 <div class="modal-footer">
								<button
									type="button"
									class=" btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
                            <button onclick="login()" type="submit" class="btn btn-primary">Login</button>
							</div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
	`;

	 $('body').append(ModalHtml)

      const modal = new bootstrap.Modal(document.getElementById('Modal'))
      modal.show()

      $('#Modal').on('hidden.bs.modal', function () {
        $(this).remove()
      })

	})
	
  })

})(jQuery);


const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`


async function login() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const data = await res.json();

  if (res.ok) {

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.id);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('tokenType', data.user.tokenType);

    $('#Modal').modal('hide');

    document.getElementById('loginEmail').value = ""
    document.getElementById('loginPassword').value = ""

    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: data.message,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true
    }).then(() => {
      window.location.href = 'dashboard_real.html';

    });

    } else {
       Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: data.error || 'Invalid credentials'
      });
    }
  



}







