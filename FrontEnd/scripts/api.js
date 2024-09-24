const URL_WORKS = 'http://localhost:5678/api/works'
const URL_CATEGORIES = 'http://localhost:5678/api/categories'

export const getWorks = () => fetch(URL_WORKS).then(res => res.json())

export const getCategories = () => fetch(URL_CATEGORIES).then(res => res.json())
