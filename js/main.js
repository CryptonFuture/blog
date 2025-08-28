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

  // $(document).ready(function () {
  //   $('#openModal').on('click', function () {
  //     const ModalHtml = `
               
  //       `;

  //     $('body').append(ModalHtml)

  //     const modal = new bootstrap.Modal(document.getElementById('Modal'))
  //     modal.show()

  //     $('#Modal').on('hidden.bs.modal', function () {
  //       $(this).remove()
  //     })
  //   })
  // })

})(jQuery);
document.addEventListener('DOMContentLoaded', function () {
  getRole()
})

const tokenType = localStorage.getItem('tokenType')
const access_Token = localStorage.getItem('token')

async function getRole() {
	
	const res = await fetch(`${baseUrl}/getRoles`, {
		method: 'GET'
	})

	const data = await res.json()

	const role = data.data

	const rolelist = document.getElementById('role')

	rolelist.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
			 const errorRow = `<option disabled selected>${data.error || "No record found"}</option>`;
			  rolelist.innerHTML = errorRow
			return ;
	}

  rolelist.innerHTML = `<option value="" disabled selected>Select Role</option>`;

	role.forEach((item, index) => {
		rolelist.innerHTML += `
				<option value="${item.role}">${item.name}</option>
			`
	})
}

  const secretKey = "0192384756";
  
  window.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (rememberMe && rememberedEmail && rememberedPassword) {
      const decryptedPassword = CryptoJS.AES.decrypt(rememberedPassword, secretKey).toString(CryptoJS.enc.Utf8)
      document.getElementById('email').value = rememberedEmail;
      document.getElementById('password').value = decryptedPassword;
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

  const role = document.getElementById('role').value

  document.getElementById('email-error').textContent = ""
  document.getElementById('password-error').textContent = ""

   let isValid = true;
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

    if (!isValid) {
        return;
    }

  const res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      role
    })
  })

  const data = await res.json();

  if (res.ok) {

    const oneDay = 24 * 60 * 60 * 1000;
    const expiryTimestamp = Date.now() + oneDay;
    localStorage.setItem('tokenExpiry', expiryTimestamp);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.user.id);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('firstname', data.user.firstname);
    localStorage.setItem('lastname', data.user.lastname);
    localStorage.setItem('role', data.user.role);

    localStorage.setItem('tokenType', data.user.tokenType);

    if (rememberMe) {
      const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', encryptedPassword);
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







