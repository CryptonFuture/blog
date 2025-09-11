const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`


async function resetPassword() {
    const password = document.getElementById('reset-password').value

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); 

    const res = await fetch(`${baseUrl}/resetPassword?token=${token}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Password Reset Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			document.getElementById('reset-password').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to reset password: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}
