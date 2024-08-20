console.log('test')

// Création d'une fonction pour récupérer les données et de les utiliser


// fetch permet de récupérer de maniére assynchrone des données http via des requettes http
// On récupére avec fetch des données qui on été mise à disposition par l'api (localhost:5678/api-docs/#/)
// GET est une méthode utilisée pour récupérer des données depuis une URL donnée (localhost:5678/get)

const URL_WORKS = 'https://localhost:5678/api/works'

// la fonction fetch(), qui permet d'effectuer des requêtes HTTP (comme les requêtes GET, POST, etc.) depuis le navigateur.
// L'argument URL_WORKS est une variable qui contient l'URL de l'API à laquelle je souhaites faire la requête.
// La fonction fetch() renvoie une promesse qui sera résolue avec la réponse de l'API.
// une promesse (promise) qui est résolue lorsque la requête est terminée
// La promesse contient le résultat de la requête (ici les données des travaux)

    // .then(res => res.json())
    //.then renvoie une nouvelle promesse qui est résolue lorsque la fonction de callback renvoie un résultat
    // Ici, on log les données récupérées dans la console



    // La méthode .then() permet d'attacher une fonction de callback à une promesse.
    // Lorsque la promesse est résolue, la fonction de callback est appelée avec le résultat de la promesse.
    // Dans ton code, les fonctions (res => res.json()) et (data => console.log(JSON.stringify(data, null, 2))) sont des fonctions de callback utilisées dans les appels .then().



// Une promesse est un objet qui représente le résultat futur d'une opération asynchrone.
// Lorsque tu appelles fetch(URL_WORKS), cette fonction renvoie une promesse qui sera résolue (ou rejetée) à un moment futur, une fois que la requête HTTP sera terminée.
// De même, lorsque tu appelles .json() sur l'objet de réponse, cette méthode renvoie une nouvelle promesse qui sera résolue avec les données JSON.
// Les promesses permettent de gérer plus facilement les opérations asynchrones en JavaScript.
// "Qui sera résolue" signifie que lorsque cette nouvelle promesse sera traitée (résolue), les données JSON seront disponibles sous forme d'un objet JavaScript.



// fetch() est une fonction asynchrone qui envoie une requête HTTP et renvoie une promesse.
// Lorsque cette promesse est résolue, elle contient la réponse de l'API.

fetch(URL_WORKS) // Appel à fetch pour récupérer les données des travaux, (c'est une requette assynchrone)
    .then(res => res.json()) // On récupère les données en format JSON
    //.then renvoie une nouvelle promesse qui est résolue lorsque la fonction de callback renvoie un résultat
    //.then(data => console.log(data)) // On log les données récupérées dans la console (console.log(data) pour afficher les données récupérer) pour les tests, on utilise console.log('test') pour vérifier la fonctionnement du script fetch, qui renvoie les données des travaux récupérées depuis l'API 
    .then(data => {
        console.log(JSON.strongify(data, null, 2))
        // On log les données récupérées formatées pour une meilleure visualisation

        // On posséde une lisete de data qui est un tableau, pour chaque data on va lacher cette méthode
        // On parcourt les data avec forEach
        // Pour chaque item (data ou élémemt), on vas utiliser la méthode creatGallery(item)
        data.forEach(item => createGallery(item));
    });


// .then() est une méthode des promesses en JavaScript. Lorsqu'une promesse est résolue, la fonction passée à .then() est appelée avec le résultat de la promesse.
// res est le paramètre de la fonction de callback passée à .then(). C'est la réponse obtenue suite à l'appel de fetch().
// res.json() crée une nouvelle promesse qui sera résolue avec les données JSON.




// On crée une variable const qu'on appel "gallery" pour la cibler en utilisant le dom
// " document " représente un objet
// le " . " dérriere le mot document pour signifier que document est un objet et " . " permet d'interagir dessus
// querySelector() est une méthode qui permet de trouver un élément dans le DOM par son id ou par son class
// ('.gallery' représente l'id de la div qui contient la galerie qui va être cibler)

const gallery = document.querySelector('.gallery')

// , l'objet document permet d'interagir avec la page HTML actuelle depuis ton code JavaScript. Il offre de nombreuses méthodes et propriétés permettant de manipuler et de récupérer des informations sur les éléments de la page.
// L'objet " document " fait référence à la page HTML actuelle le code JavaScript est exécuté. C'est un objet prédéfini qui est fourni par l'environnement d'exécution JavaScript (dans ce cas, le navigateur web).

// Ce code " document.querySelector('.gallery') " utilise la méthode querySelector() de l'objet document pour sélectionner un élément HTML dans la page en fonction de son sélecteur CSS (ici, la classe .gallery).
// Le résultat de cette méthode est stocké dans la variable gallery, qui représente l'élément HTML correspondant.



// Maintenant que les data on été récupérer, soit on les stock, soit on travaille dessus
// On crée une fonction fléché avec un nom coérant  "createGallery ", on lui passe en parametre les data et on met la méthode =>, et entre les {} on crée chaque élément dant le Dom.


const createGallery = data => {
    // On cible l'élément <div class="gallery"> pour dir à la fonction de travailler dessu

    // On crée une variabl const " figure " dans le dom
    const figure = document.createElement('figure')
    // Le code " document.createElement('figure') " utilise la méthode createElement() de l'objet document pour créer un nouvel élément HTML de type <figure>.
    // Le résultat de cette méthode est stocké dans la variable figure, qui représente le nouvel élément HTML créé.


    // On crée une variabl const " img " dans le dom
    const img = document.createElement('img')
    // On donne une source à l'image pour la récupérer (c'est la valeur de l'attribut src )
    // " .src " est l'attribut src de l'image dans le dom
    // " data " est le tableau de données qui a été récupéré (il est en parametre dans la fonction)
    // " imageUrl " est la clée, qui contient la valeur (l'url de l'image)
    img.src = data.imageUrl
    // On donne une alt à l'image (c'est la valeur de l'attribut alt)
    // " .alt " est l'attribut alt de l'image dans le dom
    // " data " est le tableau de données qui a été récupéré (il est en parametre dans la fonction)
    // " .title " est la clée, qui contient la valeur (titre de l'image)
    img.alt = data.title


    // Le point . dans les expressions img.src, img.alt, data.imageUrl et data.title est utilisé pour accéder aux propriétés d'un objet
    // img fait référence à l'objet img (l'élément <img> créé avec document.createElement('img')).
    // .src et .alt sont des propriétés de l'objet img, qui permettent respectivement d'accéder et de définir la source de l'image (src) et son texte alternatif (alt).
    // data fait référence à l'objet de données passé en paramètre de la fonction createGallery().
    // .imageUrl et .title sont des propriétés de l'objet data, qui permettent d'accéder aux valeurs correspondantes dans les données.
    // Le point . est utilisé pour "naviguer" dans la structure d'un objet et accéder à ses différentes propriétés. C'est une façon très courante d'interagir avec les objets



// On ajout l'image à la figure
figure.appendChild(img)
// On ajoute figcaption à la figure
// On crée une variabl const " figcaption " dans le dom, et lui donne l'élémen 'figcaption qu'on vien de crée
const figCaption = document.createElement('figcaption')
// On lui dit qu'a l'interieur de 'figcation' on écrit le texte récupérer dans les data
figCaption.innerHTML = data.title
// On ajoute figcaption apres l'image
figure.appendChild(figCaption)
// Onajoute à la galery la figure
gallery.appendChild(figure)

// --------------------------------------------------------------------------

//comentaire


























// --------------------------------------------------------------------------
// Récupération de tous les élément du filtre
const filterDesButtons = document.querySelectorAll('.filter-button');  

// Récupération de tous les éléments figure de la page html
const figures = document.querySelectorAll('.figure');

// Création d'un tableau contenant les éléments figure et leur contenu  
const figuresContent = Array.from(figures).map(figure => {  
  const img = figure.querySelector('img');  
  const Caption = figure.querySelector('figcaption');  
  return {  
    img: img.src,  
    caption: caption.textContent  
  };  
});  

console.log(figureContent);  

// -----------------------------------------------------------------------

// Sélection des boutons de filtre  
const filterButtons = document.querySelectorAll('.filter-buttons button');  

// Fonction pour afficher/masquer les figures en fonction du filtre sélectionné  
function applyFilter(filterName) {  
  figures.forEach((figure, index) => {  
    figure.style.display = 'none';  
    switch (filterName) {  
      case 'Tous':  
        figure.style.display = 'block';  
        break;  
      case 'Objet':  
        if (figureContent[index].caption === 'Abajour Tahina' || figureContent[index].caption === 'Structures Thermopolis') {  
          figure.style.display = 'block';  
        }  
        break;  
      case 'Appartement':  
        if (figureContent[index].caption === 'Appartement Paris V' || figureContent[index].caption === 'Appartement Paris X' || figureContent[index].caption === 'Pavillon "Le coteau" - Cassis' || figureContent[index].caption === 'Villa Ferneze - Isola d\'Elba' || figureContent[index].caption === 'Appartement Paris XVIII') {  
          figure.style.display = 'block';  
        }  
        break;  
      case 'Hotels & Restaurants':  
        if (figureContent[index].caption === 'Restaurant Sushisen - Londres' || figureContent[index].caption === 'Bar "Lullaby" - Paris' || figureContent[index].caption === 'Hotel First Arte - New Delhi') {  
          figure.style.display = 'block';  
        }  
        break;  
    }  
  });  
}  

// boucle sur chaque bouton et ajoute d'un écouteur d'événements click sur les boutons de filtre qui appelle la fonction applyFilter() avec le texte du bouton cliqué comme argument :
filterButtons.forEach(button => {  
  button.addEventListener('click', () => {  
    applyFilter(button.textContent);  
  });  
})