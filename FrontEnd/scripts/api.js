const URL_WORKS = 'http://localhost:5678/api/works'
const URL_CATEGORIES = 'http://localhost:5678/api/categories'
const URL_LOGIN = 'http://localhost:5678/api/login'


export const getWorks = () => fetch(URL_WORKS).then(res => res.json())

export const getCategories = () => fetch(URL_CATEGORIES).then(res => res.json())


export const getLogin = () => fetch(URL_LOGIN).then(res => res.json())