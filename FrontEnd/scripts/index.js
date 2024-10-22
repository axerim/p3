import { getWorks, getCategories, deleteWork } from "./api.js";

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
const submitAddPicture = document.getElementById('submit-add-picture')
const form = document.querySelector('.form-add-picture');
const fileInput = document.getElementById('file-upload');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('select-category');
const submitButton = document.getElementById('submit-add-picture');
const fileError = document.getElementById('file-error');
const titleError = document.getElementById('title-error');
const selectError = document.getElementById('select-error');
const preview = document.getElementById('preview');
const modalBtnBack = document.getElementById('modal-btn-back');


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


const createCategories = data => {

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
    modal.style.display = 'hidden'
    formAddPicture.style.display = 'flex'
})

    // Ajout dynamiquement de l'ico de la flech
    const arrowLeft = document.createElement('img')
    arrowLeft.alt = 'fleche'
    arrowLeft.src = './assets/icons/arrow-left.png'
    arrowLeft.setAttribute('class', 'icon garbage-icon')
    modalFigure.appendChild(formAddPicture)

    // On écoute l'événement au click sur la poubelle
    arrowLeft.addEventListener('click', () => {
        formAddPicture.style.display = 'none'
    })

/*** Ajoute le bouton fleche ***/
modalBtnBack.addEventListener('click', () => {
    modal.style.display = 'none'
})

/*** Affiche la photo jouter ***/

// document.fileInput.addEventListener('change', function(event) {
//     fileInput = event.target;
//     const preview = document.getElementById('preview');

//     if (fileInput.files.length > 0) {
//         const file = fileInput.files[0];
//         const reader = new FileReader();

//         reader.onload = function(e) {
//             preview.src = e.target.result;
//         };

//         reader.readAsDataURL(file);
//     } else {
//         preview.src = './assets/icons/picture.png'; // Réinitialiser l'image de prévisualisation
//     }
// });
document.getElementById('file-upload').addEventListener('change', function(event) {
    fileInput = event.target;
    preview = document.getElementById('preview');
    fileError = document.getElementById('file-error');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Vérifier si le fichier est une image et si sa taille est inférieure à 4 Mo
        if (file.type.startsWith('image/') && file.size <= 4 * 1024 * 1024) {
            const reader = new FileReader();

            reader.onload = function(e) {
                preview.src = e.target.result;
                fileError.style.display = 'none'; // Masquer le message d'erreur
            };

            reader.readAsDataURL(file);
        } else {
            fileError.style.display = 'block'; // Afficher le message d'erreur
        }
    } else {
        fileError.style.display = 'block'; // Afficher le message d'erreur
    }
});



     // Validation du formulaire
         /** 
     *<div id="file-error" class="input-error">
     * <div id="title-error" class="input-error">
     * <div id="select-error" class="input-error">
     */

    //  submitAddPicture.addEventListener('click', () => {

    //  })


     function validateForm() {
        let isValid = true;

        // Vérification de l'upload de fichier
        if (fileInput.files.length === 0) {
            fileError.style.display = 'block';
            isValid = false;
        } else {
            fileError.style.display = 'none';
        }

        // Vérification du titre
        if (titleInput.value.length < 2) {
            titleError.style.display = 'block';
            isValid = false;
        } else {
            titleError.style.display = 'none';
        }

        // Vérification de la catégorie
        if (categorySelect.value === "") {
            selectError.style.display = 'block';
            isValid = false;
        } else {
            selectError.style.display = 'none';
        }

        // Activation/désactivation du bouton submit
        // submitButton.classList.toggle('disabled', !isValid);
        // submitButton.disabled = !isValid;
        if (isValid) {
            this.submit();
        }

        return isValid;
    }
