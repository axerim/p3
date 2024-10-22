const URL_WORKS = 'http://localhost:5678/api/works'
const URL_CATEGORIES = 'http://localhost:5678/api/categories'
const URL_LOGIN = 'http://localhost:5678/api/users/login'


export const getWorks = () => fetch(URL_WORKS).then(res => res.json())

export const getCategories = () => fetch(URL_CATEGORIES).then(res => res.json())


export const postLogin = data => fetch(URL_LOGIN, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(res => res.json())

export const deleteWork = id => fetch(`${URL_WORKS}/${id}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${localStorage.token}`
    }
})