const form = document.getElementById('signupForm');
form.addEventListener('submit', async (e) => {
e.preventDefault();
const formData = new FormData(form);
const data = Object.fromEntries(formData.entries());
const response = await fetch('http://localhost:3000/signup', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
const result = await response.json();
if(response.status===201){
    alert(result.message);
    window.location.href = 'login';
}else{
alert(result.error);}
});
