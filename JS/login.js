// Password Toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? '👁' : '🙈';
});

// Form Validation and Handling
const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.status === 200) {
            alert('Login successful!');

            const userType = document.getElementById('userType').value; 

            if (userType === "Student") {
                window.location.href = "student-dashboard"; 
            } else if (userType === "ClubAdmin") {
                window.location.href = "club-admin-dashboard"; 
            } else {
                alert("Invalid user type");
            }
        } else {
            alert(result.error || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while logging in. Please try again later.");
    }
});

