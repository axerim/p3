import { getWorks, getCategories, deleteWork, postWork } from "./api.js";

const gallery = document.querySelector('.gallery');
const filterButtons = document.querySelector('.filter-buttons');
const filterAll = document.getElementById('filter-all');
const banner = document.querySelector('.banner')
const header = document.getElementById('header')
const editModal = document.getElementById('edit-modal')
const aLogin = document.getElementById("a-login")
const modal = document.getElementById('modal')
const modalBtnClose = document.getElementById('modal-btn-close')
const modalGallery = document.getElementById('modal-gallery')
const btnAddPicture = document.getElementById('btn-add-picture')
const formAddPicture = document.getElementById('form-add-picture')
const modalBtnBack = document.getElementById('modal-btn-back');
const modalTitle = document.querySelector('#modal h1')
// variables du DOM pour le formulaire d'ajout d'un travail
const fileUpload = document.getElementById('file-upload')
const preview = document.getElementById('preview')
const labelFileUpload = document.querySelector('#container-picture label')
const spanFileUpload = document.querySelector('#container-picture span')
const selectCategory = document.getElementById('select-category')
const inputTile = document.getElementById('title')
const formAddWork = document.querySelector('#form-add-picture form')
const submitFormAddPicture = document.querySelector('#form-add-picture input[type="submit"]')

const submitButton = document.getElementById('submitButton');
const errorMessage = document.getElementById('errorMessage');


const createGallery = data => {
    gallery.innerHTML = '';
    modalGallery.innerHTML = ''

    data.forEach(item => {
        // Création du DOM pour la galerie de la page d'accueil
        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;

        figure.appendChild(img);

        const figCaption = document.createElement('figcaption');
        figCaption.innerHTML = item.title;

        figure.appendChild(figCaption);

        gallery.appendChild(figure);

        // Création du DOM pour la galerie de la modale
        const modalFigure = document.createElement('figure');

        const modalImg = document.createElement('img');
        modalImg.src = item.imageUrl;
        modalImg.alt = item.title;

        modalFigure.appendChild(modalImg)

        // Ajout dynamiquement de l'ico de la poubelle
        const garbageIcon = document.createElement('img')
        garbageIcon.alt = 'poubelle'
        garbageIcon.src = './assets/icons/garbage.png'
        garbageIcon.setAttribute('class', 'icon garbage-icon')
        modalFigure.appendChild(garbageIcon)

        // On écoute l'événement au click sur la poubelle
        garbageIcon.addEventListener('click', () => {
            // On supprime en bdd le travail
            deleteWork(item.id).then(() => {
                console.log(`Le travail avec l'id: ${item.id} a bien été supprimé`)
                return getWorks()
            }).then(data => createGallery(data))
        })


        modalGallery.appendChild(modalFigure)

    })

};


// Création des filtres par catégories en fonction des data en paramètre 
// idem pour le select des categories du formulaire d'ajout de travail
const createCategories = data => {
    selectCategory.innerHTML = ''

    data.forEach(item => {
        const button = document.createElement('button');
        button.setAttribute('class', 'filter-button');
        button.innerHTML = item.name;

        button.addEventListener('click', () => {

            activeFilterButton(button)
            getWorks().then(works => {
                const filteredData = works.filter(element => element.categoryId === item.id);
                createGallery(filteredData);
            });
        })

        filterButtons.appendChild(button);

        // ajouter des options de categorie au select
        const option = document.createElement('option')
        option.setAttribute('value', item.id)
        option.innerHTML = item.name
        selectCategory.appendChild(option)
    })

};

getWorks().then(data => createGallery(data))

getCategories().then(data => createCategories(data));

filterAll.addEventListener('click', () => {
    activeFilterButton(filterAll)
    getWorks().then(data => createGallery(data))
})

const activeFilterButton = button => {
    const filtersButtons = document.querySelectorAll('.filter-button')
    filtersButtons.forEach(element => {
        element.classList.remove('active')
    })
    button.classList.add('active')
}

/*** Mode Admin ***/
if (localStorage.token) {
    banner.style.display = 'flex'
    header.style.marginTop = '79px'
    filterButtons.style.display = 'none'
    editModal.style.display = 'flex'
    aLogin.innerHTML = 'logout'
}

aLogin.addEventListener('click', () => localStorage.clear())

/*** Modal ***/
editModal.addEventListener('click', () => {
    modal.style.display = 'block'
})

modalBtnClose.addEventListener('click', () => {
    modal.style.display = 'none'
})


/*** Ajouter une photo ***/
btnAddPicture.addEventListener('click', () => {
    modalGallery.style.display = 'none'
    formAddPicture.style.display = 'flex'
    modalTitle.innerHTML = 'Ajout photo'
    btnAddPicture.style.display = 'none'
})


/*** Ajoute le bouton fleche ***/
modalBtnBack.addEventListener('click', () => {
    modalGallery.style.display = 'grid'
    formAddPicture.style.display = 'none'
    modalTitle.innerHTML = 'Galerie photo'
    btnAddPicture.style.display = 'flex'
})

// Déclanchement de l'événement ajouter une image
// Clique de Ajouter une photo pour en séléctionner une
fileUpload.addEventListener('change', () => {
    
    // ce code récuper la source de l'image dans const file
    const file = fileUpload.files[0]

    console.log(file)
    // ce code fait disparaitre les label et les span
    labelFileUpload.style.display = 'none'
    spanFileUpload.style.display = 'none'

    // ce code ajout de la source de l'image qu'on séléctionne
    preview.src = URL.createObjectURL(file)

    // ce code permet de redimensionner l'image pour qu'elle ne dépasse pas les dimensions de 600px de largeur et de 400px de hauteur
    preview.style.height = 'auto'
    preview.style.width = 'auto'
})



// ce code permet de soumetre le formulaire quand on clique sur le bouton validez
// il faut que ce code prend en compte quand le boutan est disable (désactiver   )
/*
formAddPicture.addEventListener('submit', event => {

    // ce code empeche le rechargment de la page
    event.preventDefault() // Empêche la soumission du formulaire par défaut 

    const file = fileUpload.files[0]

    // l'objet " new FormData " formate les data passer en parametres par " postWork " 
    const formData = new FormData()
    // ici est spécifier toute les data qui vont être empécher d'être envoyer vers l'api
    formData.append('image', file)
    formData.append('title', inputTile.value)
    formData.append('category', parseInt(selectCategory.value))

    // postWork (dans le fichier api.js) permet de récuperer les data qu'on passe en parametre 
    // ce code permet d'envoyer tous les élément formater 
    postWork(formData).then(() => {

        // si sa se passe bien on ferme la modal
        modal.style.display = 'none'

        // si sa se passe bien on récuper les traveaux pour les metre à jour sur la page
        return getWorks()

        // et on crée à nouveau la galerie
    }).then(data => createGallery(data))
})
*/
// s'assurer que chaque champ est bien valide
// t'an que le champ n'est pas valide, il doit être impossible d'appuyer sur le bouton validez
// on doit empecher la validation et la fermeture de la page
// afficher des message d'alert si quelque chose ne vas pas
// la contrainte est qu'il faut afficher une image qui soit jpg ou png de maximum 4 mo
// faire des verifications sur le format de l'image (aussi le type de fichier) et de sa taille
// metre en place la réinitialisation du formulaire d'est qu'on clique sur un image déja séléctionner


// avant de recréer la galerie on doit faire de vérification sur :
// avnt la soumition on doit vérifier :
// qu'il fichier image au formata png ou jpg de 4mo max à bien été séléctionner
// il faut empecher la soumition si cette regle n'est respecter
// la soumission et le rechargement de la page doivent être empecher si les condition ne sont pas respecter


document.addEventListener('DOMContentLoaded', () => {

    // Fonction pour vérifier les contraintes
    const validateForm = () => {
        const file = fileUpload.files[0];
        const title = inputTitle.value.trim();
        const category = selectCategory.value.trim();

        // Réinitialiser le message d'erreur
        errorMessage.textContent = '';

        // Vérifier que tous les champs sont remplis
        if (!file || !title || !category) {
            errorMessage.textContent = 'Tous les champs doivent être remplis.';
            submitButton.disabled = true;
            return false;
        }

        // Vérifier le format de l'image
        if (file.type !== 'image/jpeg' || file.type !== 'image/png') {
            errorMessage.textContent = 'Le fichier doit être une image JPG ou PNG.';
            submitButton.disabled = true;
            return false;
        }

        // Vérifier la taille de l'image
        if (file.size > 4 * 1024 * 1024) {
            errorMessage.textContent = 'La taille de l\'image ne doit pas dépasser 4 Mo.';
            submitButton.disabled = true;
            return false;
        }

        // Si toutes les conditions sont remplies, activer le bouton de soumission
        submitButton.disabled = false;
        return true;
    };

    // Ajouter des écouteurs d'événements pour valider le formulaire en temps réel
    fileUpload.addEventListener('change', validateForm);
    inputTitle.addEventListener('input', validateForm);
    selectCategory.addEventListener('change', validateForm);

    formAddPicture.addEventListener('submit', event => {
        event.preventDefault(); // Empêche la soumission du formulaire par défaut

        if (!validateForm()) {
            return;
        }

        const file = fileUpload.files[0];
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', inputTitle.value);
        formData.append('category', parseInt(selectCategory.value));

        postWork(formData).then(() => {
            modal.style.display = 'none';
            return getWorks();
        }).then(data => {
            if (validateForm()) {
                createGallery(data);
            }
        });
    });

    // Réinitialiser le formulaire lorsqu'on clique sur une image déjà sélectionnée
    fileUpload.addEventListener('click', () => {
        fileUpload.value = '';
        inputTitle.value = '';
        selectCategory.value = '';
        errorMessage.textContent = '';
        submitButton.disabled = true;
    });
});