import { postLogin } from "./api.js";

// Gestion de la connexion
const loginForm = document.getElementById('login-form');
const email = document.getElementById('email')
const password = document.getElementById('password')

loginForm.addEventListener('submit', event => {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const data = {
        email: email.value,
        password: password.value
    }

    postLogin(data)
        .then(data => {
            if (data.token) {
                window.location.href = 'index.html';
                localStorage.token = data.token
            } else {
                alert('Erreur lors de la connexion. Veuillez réessayer.')
            }
        }).catch(() => alert("L'api n'est pas disponible"))
});
