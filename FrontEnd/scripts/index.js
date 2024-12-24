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
const inputTitle = document.getElementById('title')
const formAddWork = document.querySelector('#form-add-picture form')
const submitFormAddPicture = document.querySelector('#form-add-picture input[type="submit"]')
// erreurs formulaire
const fileError = document.getElementById('file-error')
const titleError = document.getElementById('title-error')




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


// https://techstacker.com/close-modal-click-outside-vanilla-javascript/
const dismissModal = e => {
    if (e.target === modalBtnClose || !e.target.closest('.modal-main')) {
        modal.style.display = 'none'
        document.removeEventListener('click', dismissModal, true)
    }
}

/*** Modal ***/
editModal.addEventListener('click', () => {
    modal.style.display = 'block'

    modalGallery.style.display = 'grid'
    formAddPicture.style.display = 'none'
    modalTitle.innerHTML = 'Galerie photo'
    btnAddPicture.style.display = 'flex'

    resetFormAddWork()
    document.addEventListener('click', dismissModal, true)
})

modalBtnClose.addEventListener('click', () => {
    modal.style.display = 'none'
})

// on affiche la preview d'origine du formulaire et on le reset
const resetFormAddWork = () => {
    labelFileUpload.style.display = "flex"
    spanFileUpload.style.display = "flex"
    preview.src = "./assets/icons/picture.png"
    preview.style.height = '58px'
    preview.style.width = '58px'
    fileUpload.value = ''
    formAddWork.reset()

    submitFormAddPicture.classList.add('disabled')

    fileError.style.display = 'none'
    titleError.style.display = 'none'
}


/*** Ajouter une photo ***/
btnAddPicture.addEventListener('click', () => {
    modalGallery.style.display = 'none'
    formAddPicture.style.display = 'flex'
    modalTitle.innerHTML = 'Ajout photo'
    btnAddPicture.style.display = 'none'

    resetFormAddWork()
})


/*** Ajoute le bouton fleche ***/
modalBtnBack.addEventListener('click', () => {
    modalGallery.style.display = 'grid'
    formAddPicture.style.display = 'none'
    modalTitle.innerHTML = 'Galerie photo'
    btnAddPicture.style.display = 'flex'

    resetFormAddWork()
})



const hasValidExtension = (extension, validExtensions = ['jpg', 'jpeg', 'png']) => validExtensions.includes(extension.toLowerCase())

const imageIsValid = () => {
    const file = fileUpload.files[0]
    console.log(file)

    if (file) {
        const fileNameSplitted = file.name.split('.')
        const extension = fileNameSplitted[fileNameSplitted.length - 1].toLowerCase()
        if (file.size <= 4 * 1024 * 1024 && hasValidExtension(extension)) {

            labelFileUpload.style.display = 'none'
            spanFileUpload.style.display = 'none'
            preview.src = URL.createObjectURL(file)
            preview.style.height = 'auto'
            preview.style.width = 'auto'

            if (inputTitle.value !== "") {
                submitFormAddPicture.classList.remove('disabled')
            }
        }
    } else {
        labelFileUpload.style.display = 'flex'
        spanFileUpload.style.display = 'flex'
        preview.src = "./assets/icons/picture.png"
        preview.style.height = '58px'
        preview.style.width = '58px'
        fileUpload.value = ''
        submitFormAddPicture.classList.add('disabled')
    }
}

// Ajouter des écouteurs d'événements pour valider le formulaire en temps réel
fileUpload.addEventListener('change', () => imageIsValid());

inputTitle.addEventListener('input', () => {
    const file = fileUpload.files[0]

    if (file) {
        const fileNameSplitted = file.name.split('.')
        const extension = fileNameSplitted[fileNameSplitted.length - 1].toLowerCase()

        if (file.size <= 4 * 1024 * 1024 && hasValidExtension(extension) && inputTitle.value !== "") {
            submitFormAddPicture.classList.remove('disabled')
        } else {
            submitFormAddPicture.classList.add('disabled')
        }
    } else {
        submitFormAddPicture.classList.add('disabled')
    }
})

formAddPicture.addEventListener('submit', event => {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const file = fileUpload.files[0]

    if (file) {
        const fileNameSplitted = file.name.split('.')
        const extension = fileNameSplitted[fileNameSplitted.length - 1].toLowerCase()
        if (file.size <= 4 * 1024 * 1024 && hasValidExtension(extension) && inputTitle.value !== "") {
            const file = fileUpload.files[0];
            const formData = new FormData();
            formData.append('image', file);
            formData.append('title', inputTitle.value);
            formData.append('category', parseInt(selectCategory.value));

            postWork(formData).then(() => {
                modal.style.display = 'none';
                return getWorks();
            }).then(data => createGallery(data));
        }
    }

});

