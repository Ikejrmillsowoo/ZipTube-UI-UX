document.addEventListener('DOMContentLoaded', function () {
const API_URL = `http://localhost:8080`;
const form = document.getElementById('signInForm');
const successMessage = document.getElementById('successMessage');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    const fields = ['username', 'password'];
    const user = {};

    fields.forEach(id => {
        const input = document.getElementById(id);
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            user[id] = input.value.trim();
        }
    });

    if (isValid) {
        
            fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json().then(data => ({ status: res.status, body: data })))
                .then(({ status, body}) => {
                    if (status === 200){
                    console.log('Server response:', body);
                    localStorage.setItem('userId', body.userId);
                    localStorage.setItem('username', body.username);
                    successMessage.textContent = body.message || "Login successful!";
                    successMessage.classList.remove('d-none');
                    form.reset();
                        //wait 1.5 secs to redirect
                    setTimeout(() => {
                        window.location.href = "loggedInVideos.html"; // or videos.html etc.
                      }, 1500);
                    }else {
                        alert(body.error || "Login failed.");
                    }
                })
                .catch(error => {
                    console.error('API Error:', error);
                    alert('Network or server error.');
                });
        }
    
});
});
