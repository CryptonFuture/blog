const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`


async function forgotPassword() {
    const email = document.getElementById('email-address').value

    const res = await fetch(`${baseUrl}/forgotPassword`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'forgot Password Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			document.getElementById('email-address').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to delete request: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}
