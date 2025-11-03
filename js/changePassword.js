const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`


async function resetPassword() {
    const email = document.getElementById('email-address').value
    const password = document.getElementById('reset-password').value
    const confirmPass = document.getElementById('reset-confirm-password').value

    const res = await fetch(`${baseUrl}/resetPass`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, confirmPass })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'reset password Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			document.getElementById('email-address').value = ""
            document.getElementById('reset-password').value = ""
            document.getElementById('reset-confirm-password').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete otp: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}
