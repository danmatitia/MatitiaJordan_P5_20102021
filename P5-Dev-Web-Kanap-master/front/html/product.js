/** Représentation du format d'un produit*/ 
/** search params pour manipuler les parametres de la requete URL*/
let params = new URL(window.location.href).searchParams;
/** nouvelle URL indiqué par id */
let newID = params.get('id');

/** variables prouits */
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

/** Nouvelle URl pour chaque produits */

fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;
        for (number in data.colors) { /**choix des couleurs */
            colors.options[colors.options.length] = new Option(
            data.colors[number],
            data.colors[number]
        );
    }
})
    .catch(_error => {
        alert('Oops ! Le serveur ne répond pas');
});

/**Récupération des données clients */
/** Nouvelles variables */

const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

/** variable ajout panier */
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
  event.preventDefault();

  const selection = {
    id: newID,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };

/** Stockage clés + valeurs dans la nouvelles variable locale storage  */

let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

  /**  j'ajoute les produits sélectionnés dans le localStorage */
  const addProductLocalStorage = () => {
    /** je récupère la sélection de l'utilisateur dans le tableau de l'objet :*/
    /** on peut voir dans la console qu'il y a les données,mais pas encore stockées dans le storage */
    productInLocalStorage.push(selection);
    // je stocke les données récupérées dans le localStorage :
    // JSON.stringify permet de convertir les données au format JavaScript en JSON 
    // vérifier que key et value dans l'inspecteur contiennent bien des données
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    }
  
    // je crée une boîte de dialogue pour confirmer l'ajout au panier
    let addConfirm = () => {
      alert('Le produit a bien été ajouté au panier');
    }
  
    let update = false;
    
    // s'il y a des produits enregistrés dans le localStorage
    if (productInLocalStorage) { /** verifier que le produit ne soit pas deja dans le localstorage/panier */ 
     productInLocalStorage.forEach (function (productOk, key) {
      if (productOk.id == newID && productOk.color == selectColors.value) {
        productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        update = true;
        addConfirm();
      }  
});

if (!update) {
    addProductLocalStorage();
    addConfirm();
    }
  }

  // s'il n'y a aucun produit enregistré dans le localStorage 
  else {
    // je crée alors un tableau avec les éléments choisi par l'utilisateur
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }
});