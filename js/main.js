(function ($) {

  "use strict";

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

  $(document).ready(function () {
    $('#openModal').on('click', function () {
      const ModalHtml = `
                <div
        class="modal fade"
        id="Modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Login Form
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="form-submit">
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label"
                    >Email:</label
                  >
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                  />
                </div>
                <small id="email-error" class="text-danger"></small>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label"
                    >Password:</label
                  >
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                  />
                </div>
                 <small id="password-error" class="text-danger"></small>
                 <div class="mb-3">
                    <label for="edit-post-status" class="col-form-label">Remember me:</label>
                      <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="rememberMe" name="publish">
                          <label class="form-check-label" for="publishCheck">
                          </label>
                        </div>
                        </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button id="submit" onclick="login()" type="button" class="btn btn-primary">Submit</button>
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

  window.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (rememberMe && rememberedEmail && rememberedPassword) {
      document.getElementById('email').value = rememberedEmail;
      document.getElementById('password').value = rememberedPassword;
      document.getElementById('rememberMe').checked = true;
    }   
  })

 const accessToken = localStorage.getItem('token')

	if (accessToken) {
		window.location.href = '/dashboard_real.html';
	}


const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`


async function login() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
   const rememberMe = document.getElementById('rememberMe').checked;

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

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
      localStorage.setItem('rememberMe', 'false');
    }

    $('#Modal').modal('hide');

    document.getElementById('email').value = ""
    document.getElementById('password').value = ""

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







