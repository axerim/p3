import { getWorks, getCategories } from "./api.js"

const gallery = document.querySelector('.gallery')
const filterButtons = document.querySelector('.filter-buttons')
const filterAll = document.getElementById('filter-all')

const createGallery = data => {
    const figure = document.createElement('figure')

    const img = document.createElement('img')
    img.src = data.imageUrl
    img.alt = data.title

    figure.appendChild(img)

    const figCaption = document.createElement('figcaption')
    figCaption.innerHTML = data.title

    figure.appendChild(figCaption)

    gallery.appendChild(figure)
}


filterAll.addEventListener('click', () => {
    getWorks().then(data => {
        gallery.innerHTML = ''
        data.forEach(item => createGallery(item));
    })
})

const createCategories = data => {

    const button =  document.createElement('button')
    button.setAttribute('class', 'filter-button')
    button.innerHTML = data.name

    button.addEventListener('click', () => {

        getWorks().then(works => {
            const filteredData = works.filter(item => item.categoryId === data.id)
            gallery.innerHTML = ''
            filteredData.forEach(item => createGallery(item));
        })
    })


    filterButtons.appendChild(button)
}

getWorks().then(data => {
    gallery.innerHTML = ''
    data.forEach(item => createGallery(item));
})

getCategories().then(data => data.forEach(item => createCategories(item)))