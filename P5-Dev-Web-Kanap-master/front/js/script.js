let urlKanap = "http://localhost:3000/api/products";

fetch (urlKanap)
.then( response =>response.json())
.then(data=>{
     console.log(data);