console.log('test')

const URL_WORKS = 'http://localhost:5678/api/works'

fetch(URL_WORKS)
    .then(res => res.json())
    .then(data => {
        console.log(JSON.stringify(data, null, 2))

        data.forEach(item => createGallery(item));
    })
    .catch(error => console.log(error))
     

const gallery = document.querySelector('.gallery')

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











const URL_CATEGORIES = 'http://localhost:5678/api/categories'

fetch(URL_CATEGORIES)
    .then(res => res.json())
    .then(data => {
        console.log(JSON.stringify(data, null, 3))

        data.forEach(item => createCategories(item));
    })
    .catch(error => console.log(error))



const filterButtons = document.querySelector('.filter-buttons')

const createCategories = data => {

    const button =  document.createElement('button')
    button.setAttribute('class', 'filter-button')
    button.innerHTML = data.name

    filterButtons.appendChild(button)
}
