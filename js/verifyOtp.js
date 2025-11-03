const prefix = 'api/v1'
const baseUrl = `http://localhost:8000/${prefix}`
let countdown;

// window.onload = function() {
//     startOtpTimer()
// }

window.addEventListener("DOMContentLoaded", () => {
  const expiresAt = localStorage.getItem("otpExpiresAt"); 
  if (expiresAt) {
    startOtpTimer(expiresAt);
  }
});

function initOtpTimerFromResponse(response) {
    startOtpTimer(response.expiresAt);
  }


 function startOtpTimer(expiresAt) {
    const timerDisplay = document.getElementById("timer");
    const otpInput = document.getElementById("verify-otp");
    const resendBtn = document.getElementById("resend-btn");

    const expiryTime = new Date(expiresAt).getTime();
    otpInput.disabled = false;
    resendBtn.style.display = "none";

    clearInterval(countdown);

    countdown = setInterval(() => {
      const now = new Date().getTime();
      const remaining = Math.floor((expiryTime - now) / 1000);

      if (remaining <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "❌ OTP expired!";
        otpInput.disabled = true;
        resendBtn.style.display = "inline-block";
      } else {
        updateTimerDisplay(remaining);
      }
    }, 1000);
  }

  function updateTimerDisplay(seconds) {
    const timerDisplay = document.getElementById("timer");
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `⏳ OTP expires in ${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }



async function verifyOtp() {
    const email = document.getElementById('email-address').value
    const otp = document.getElementById('verify-otp').value

    const res = await fetch(`${baseUrl}/verify`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, otp })
	})

	const data = await res.json()

	if (res.ok) {
		Swal.fire({
			icon: 'success',
			title: 'verify otp Successfully',
			text: data.message,
			timer: 2000,
			showConfirmButton: false,
			timerProgressBar: true
		}).then(() => {
			document.getElementById('email-address').value = ""
            document.getElementById('verify-otp').value = ""
            window.location.href = 'changePassword.html'
            clearInterval(countdown);
            document.getElementById("timer").textContent = "";
            initOtpTimerFromResponse(data);
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

async function resendOtp() {
    const email = document.getElementById("email-address").value;
    const resendBtn = document.getElementById("resend-btn");
    const timerDisplay = document.getElementById("timer");

    if (!email) {
      alert("Please enter your email first!");
      return;
    }

    resendBtn.disabled = true;
    timerDisplay.textContent = "Sending new OTP...";

    try {
      const response = await fetch(`${baseUrl}/resend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error resending OTP.");
        resendBtn.disabled = false;
        return;
      }

      alert(data.message);
      resendBtn.style.display = "none";
      resendBtn.disabled = false;

      startOtpTimer(data.expiresAt);
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
      resendBtn.disabled = false;
    }
  }
