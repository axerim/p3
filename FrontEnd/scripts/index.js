import { getWorks, getCategories, getLogin } from "./api.js";

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

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await getLogin({ email, password });
        if (response.token) {
            // Connexion réussie, rediriger vers la page d'accueil
            window.location.href = 'index.html?admin=true';
        } else {
            // Connexion échouée, afficher un message d'erreur
            alert('Email ou mot de passe incorrect.');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Erreur lors de la connexion. Veuillez réessayer.');
    }
});

// Vérifier si l'utilisateur est en mode administrateur
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('admin') === 'true') {
    const adminSection = document.querySelector('.section-admin');
    if (adminSection) {
        adminSection.classList.remove('hidden');
    }
}