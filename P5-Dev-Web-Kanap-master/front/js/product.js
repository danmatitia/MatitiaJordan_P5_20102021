/** Représentation du format d'un produit*/ 
function idVerification (){
  let params = new URL(document.location).searchParams; /** Récupérer les paramètre de l'URL */
  if (params.has('id')) {
    let newID = params.get('id');
    return newID;
  } else {
    console.log("error, pas d'id trouvé dans l'URL " );

  }
} 

/** nouvelle URL indiqué par id, pour passer l’id d’une page à une autre */

/** variables deescriptive des prouits */
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

/** Nouvelle URl pour chaque produits */
let newID = idVerification ();

fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;
        for (number in data.colors) { /** choix des couleurs */
            colors.options[colors.options.length] = new Option(
            data.colors[number],
            data.colors[number]
        );
    }
})
    .catch(_error => {
        alert('Oops ! Le serveur ne répond pas');
});

/** Récupération des données clients */
/** Nouvelles variables */

const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');

/** variable ajout panier */
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
  if (selectQuantity.value > 0 && selectQuantity.value <=100 && selectQuantity.value != 0){ /** commande annulant la possibilité de validé l'article à 0 */
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

/** Initialisation du localestorage  */

let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

  /** Ajout des produits sélectionnés dans le localStorage */
  const addProductLocalStorage = () => {
    
    /** je récupère la sélection  dans le tableau de l'objet */
    
    /** on peut voir dans la console qu'il y a les données,mais pas encore stockées dans le storage */
    productInLocalStorage.push(selection);
    
    /** stockage des données récupérées dans le localStorage :*/
    
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    }
    /**  je crée une boîte de dialogue pour confirmer l'ajout au panier */
    let addConfirm = () => {
      alert('Le produit a bien été ajouté au panier');
    }
  
    let update = false;
    
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

  /** s'il n'y a aucun produit enregistré dans le localStorage */
  else {
    
    /** création tableau avec les éléments choisi par l'utilisateur */
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
  }}
});