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
        if (isValid) {
            fetch(`${API_URL}/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    console.log('Server response:', data);
                    successMessage.classList.remove('d-none');
                    form.reset();
                })
                .catch(error => {
                    console.error('API Error:', error);
                    alert('Error registering user. Check API or server.');
                });
        }
    }
});
