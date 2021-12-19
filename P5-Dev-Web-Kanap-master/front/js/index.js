//** Gérer l'affichage et les intéractions de la page d'accueil */
fetch('http://localhost:3000/api/products')
    /** première promesse .then */
  .then(res => res.json())
    /** deuxième promesse .then qui va afficher les données contenues dans ma fonction showProducts  */
  .then(data => {
    data.forEach( d => {
      showProduct(d);
    }
    ) 
  })
  /**  Message au cas où le serveur ne répond pas */

  .catch(_error => {
     let element = document.getElementById(`items`);
     element.innerHTML = 'Oops ! Le serveur ne répond pas !'
   });

   /** Fonction permettant d'afficher les produits dans la page d'accueil */
   function showProduct(data) {
     /** pour ma variable product de ma promise .then data */
         /**  trouver l'élément #items dans index.html...*/
         const itemCard = document.getElementById('items');

         itemCard.innerHTML +=`
         <a href="./product.html?id=${data._id}">
         <article>
           <img src="${data.imageUrl}" alt="${data.altTxt}">
           <h3 class="productName">${data.name}</h3>
           <p class="productDescription">${data.description}</p>
         </article>
         </a>
       `;
 }
            