const pre = 'api/v1'
const base_url = `http://localhost:8000/${pre}`

async function addContactUs() {
    const name = document.getElementById('contact-name').value
    const email = document.getElementById('contact-email').value
    const contact_no = document.getElementById('contact-phone').value
    const subject = document.getElementById('contact-subject').value

    const res = await fetch(`${base_url}/contactUs`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, email, contact_no, subject })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Contact Us Create Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			document.getElementById('contact-name').value = ""
            document.getElementById('contact-email').value = ""
            document.getElementById('contact-phone').value = ""
            document.getElementById('contact-subject').value = ""
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: `Failed to contact us: ${data.error}`,
			text: data.error,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		})
	}
}