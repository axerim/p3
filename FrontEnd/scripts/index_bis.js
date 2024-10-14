import { getWorks, getCategories, postLogin } from "./api.js";

const gallery = document.querySelector('.gallery');
const filterButtons = document.querySelector('.filter-buttons');
const filterAll = document.getElementById('filter-all');

let lastClickedButton = null;

const createGallery = data => {
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = data.imageUrl;
    img.alt = data.title;

    figure.appendChild(img);

    const figCaption = document.createElement('figcaption');
    figCaption.innerHTML = data.title;

    figure.appendChild(figCaption);

    gallery.appendChild(figure);
};

const handleButtonClick = (button, filterFunction) => {
    if (lastClickedButton) {
        lastClickedButton.style.backgroundColor = '';
        lastClickedButton.style.color = '';
    }
    button.style.backgroundColor = '#1D6154';
    button.style.color = 'white';
    lastClickedButton = button;

    filterFunction();
};

const handleButtonHover = (button) => {
    if (button !== lastClickedButton) {
        button.style.backgroundColor = '#1D6154';
        button.style.color = 'white';
    }
};

const handleButtonMouseOut = (button) => {
    if (button !== lastClickedButton) {
        button.style.backgroundColor = '';
        button.style.color = '';
    }
};

filterAll.addEventListener('click', () => {
    handleButtonClick(filterAll, () => {
        getWorks().then(data => {
            gallery.innerHTML = '';
            data.forEach(item => createGallery(item));
        });
    });
});

filterAll.addEventListener('mouseover', () => {
    handleButtonHover(filterAll);
});

filterAll.addEventListener('mouseout', () => {
    handleButtonMouseOut(filterAll);
});

const createCategories = data => {
    const button = document.createElement('button');
    button.setAttribute('class', 'filter-button');
    button.innerHTML = data.name;

    button.addEventListener('click', () => {
        handleButtonClick(button, () => {
            getWorks().then(works => {
                const filteredData = works.filter(item => item.categoryId === data.id);
                gallery.innerHTML = '';
                filteredData.forEach(item => createGallery(item));
            });
        });
    });

    button.addEventListener('mouseover', () => {
        handleButtonHover(button);
    });

    button.addEventListener('mouseout', () => {
        handleButtonMouseOut(button);
    });

    filterButtons.appendChild(button);
};

getWorks().then(data => {
    gallery.innerHTML = '';
    data.forEach(item => createGallery(item));
});

getCategories().then(data => data.forEach(item => createCategories(item)));

// Gestion de la connexion
const loginForm = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

loginForm.addEventListener('submit', event => {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const data = {
        email: email.value,
        password: password.value
    };

    postLogin(data)
        .then(data => {
            if (data.token) {
                window.location.href = 'index.html';
                localStorage.token = data.token;
            } else {
                alert('Erreur lors de la connexion. Veuillez réessayer.');
            }
        })
        .catch(() => alert("L'api n'est pas disponible"));
});

// Vérifier si l'utilisateur est en mode administrateur
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('admin') === 'true') {
    const modeEdition = document.querySelector('.mode-edition');
    const modificationLink = document.querySelector('.modification');
    const modal = document.querySelector('#modal1');

    if (modeEdition) {
        modeEdition.classList.remove('hidden');
    }
    if (modificationLink) {
        modificationLink.classList.remove('hidden');
    }
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Code pour ouvrir et fermer la modal
let modal = null;

const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (!target) return;

    // Affiche le modal
    target.style.display = 'block';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');

    // Sauvegarde de la boîte modal cible qui a été ouverte
    modal = target;

    // Ajoute des écouteurs d'événements pour fermer la modal
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

const closeModal = function(e) {
    if (modal === null) return;
    e.preventDefault();

    // Remasquer la boîte modal
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');

    // Supprime les écouteurs d'événements
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);

    // Réinitialise la variable modal
    modal = null;
};

const stopPropagation = function(e) {
    e.stopPropagation();
};

// Ajoute des écouteurs d'événements pour ouvrir la modal
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

// Fermer la modal avec le bouton échap
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
});