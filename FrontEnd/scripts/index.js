import { getWorks, getCategories } from "./api.js";

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
const iconePoubelle = document.getElementById('icone-poubelle')

const createGallery = data => {
    gallery.innerHTML = '';

    data.forEach(item => {
        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;

        figure.appendChild(img);

        const figCaption = document.createElement('figcaption');
        figCaption.innerHTML = item.title;

        figure.appendChild(figCaption);

        gallery.appendChild(figure);
    })
    /************** Gallerie dans la modal */
    if (editModal.addEventListener('click', () => {
        modal.style.display = 'block'
    })) {
        modalGallery = createGallery
        figure.setAttribute('width', '630')
        figure.setAttribute('width', '688')
        figure.setAttribute('position', 'relative')
        figure.setAttribute('display', 'inline-bloc')

        img.setAttribute('width', '78')
        img.setAttribute('height', '104')
        iconePoubelle.src = './assets/icone/trash-can-solid.png';
        img.appendChild(iconePoubelle)
        iconePoubelle.setAttribute('diplay', 'flex')
    }

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

