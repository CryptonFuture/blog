const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`

document.addEventListener('DOMContentLoaded', function () {
    getUser()
})

async function getUser() {
    const res = await fetch(`${baseUrl}/getInActive`, {
		method: 'GET',
	})

	const data = await res.json()

	const InActiveUser = data.data

	const employeeData = document.getElementById('employeeData')
    const employee_data = document.getElementById('employee_data')
	const employeedata = document.getElementById('employee-Data')


	employeeData.innerHTML = '';
    employee_data.innerHTML = '';
    employeedata.innerHTML = '';

	if (!data.success || !data.data || data.data.length === 0) {
        const errorRow = `<option disabled selected>${data.error || "No inactive users found"}</option>`;
			employeeData.innerHTML = errorRow
            employee_data.innerHTML = errorRow
            employeedata.innerHTML = errorRow
			return;
	}

    

    employeeData.innerHTML = `<option value="" disabled selected>Select Username</option>`;
    employee_data.innerHTML = `<option value="" disabled selected>Select Email</option>`;
    employeedata.innerHTML = `<option value="" disabled selected>Select Phone</option>`;

	InActiveUser.forEach((item, index) => {
    
    const fullname = `${item.firstname} ${item.lastname}`

	employeeData.innerHTML += `
				<option value="${fullname}">${fullname}</option>
			`;
    employee_data.innerHTML += `
				<option value="${item.email}">${item.email}</option>
			`;

    employeedata.innerHTML += `
				<option value="${item._id}">${item.phone ? item.phone : '----------'}</option>
			`
	})

	
}

async function requestSubmit() {
    const username = document.getElementById('employeeData').value
    const email = document.getElementById('employee_data').value
    const phoneValue = document.getElementById('employee-Data').value
    const reqInfo = document.getElementById('request-info').value
    const addInfo = document.getElementById('add-info').value

    const phone = phoneValue === "" ? null : phoneValue;

    const res = await fetch(`${baseUrl}/addRequest`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, email, phone, reqInfo, addInfo })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'Create Request Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			document.getElementById('employeeData').value = ""
            document.getElementById('employee_data').value = ""
            document.getElementById('employee-Data').value = ""
            document.getElementById('request-info').value = ""
            document.getElementById('add-info').value = ""
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




