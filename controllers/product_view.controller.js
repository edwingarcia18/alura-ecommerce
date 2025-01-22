import { productsServices } from "../service/products-service.js";


const comando = `<u>npx json-server --watch db.json</u>`

/* Init Pop-up ventana emergente */
window.onload = function() {
  Swal.fire({
    title: "Información importante",
    html: `Descarga la carpeta del GitHub y ejecuta el comando ${comando} en la terminal para conectar al servidor simulado de manera local.`,
    position: "center",
    showConfirmButton: true,
    confirmButtonText: "Ir a GitHub",
    showCancelButton: true,
    cancelButtonText: "Ok",
    icon: 'warning',
  }).then((result) => {
    if (result.isConfirmed) {
        window.location.href = "https://github.com/LIZGRICAS/Challenge-ONE-Sprint-02---AluraGeek"
      }
    })
  }

const divhero = document.querySelector("[data-hero]");
const divProducts = document.querySelector("[data-products-body]");
const sectionDescriptionProduct = document.querySelector("[data-product-description]");
const tittleCategoryProducts = document.querySelector("[data-tittle-category]");
const tittleSimilarProducts = document.querySelector("[data-tittle-similar-products]");

sectionDescriptionProduct.style.display = 'none';
tittleSimilarProducts.style.display = 'none';

document.addEventListener("DOMContentLoaded", function() {
  const firstElement = document.querySelector(".first-element");
  firstElement.scrollIntoView();
});

/* Creación de modelo de los productos ofertados en página de inicio */
 const modelProducts = (imageUrl, name, price, id, description) => {
    const card = document.createElement("div");
    const content = `
      <div class="category__card ">
          <img
          src="${imageUrl}"
          alt="Imagen Product"
          class="card__img"
          data-imgUrl
          />
          <h3 class="card__title" data-name>${name}</h3>
          <p class="card__price" data-price>$ ${price}</p>
          <div>
          <h3 class="card__title" data-id id="${id}"> Ref: ${id}</h3>
          </div>        
          <div display="none" data-description>${description}</div> 
          <a href="·" class="card__link" data-icon-view id="${id}" >Ver Producto</a>    
      </div>`;
  
    card.innerHTML = content;
    const textDescription = card.querySelector('[data-description]')
    const iconView = card.querySelector('[data-icon-view]')
  
    textDescription.style.display = 'none';

/* Init evento click en producto en página de inicio */
    iconView.addEventListener("click", (e) => {
            e.preventDefault();

            const firstElement = document.querySelector(".first-element");
            firstElement.scrollIntoView();
            /* esta iteración se ejecuta solo si es un click generado en uno de los productos similares, ofertados en la página de descripción del producto creada en las siguientes líneas */
            const divProductDescrip = document.querySelector("[data-product-description"); 
          
            while (divProductDescrip.firstChild) {
              divProductDescrip.removeChild(divProductDescrip.firstChild);
              break;
            }

            /* Validamos que no hayan listadps de productos creados previamente */
            let newCards = null

            if (newCards != null) {
              newCards.parentNode.removeChild(newCards);
              newCards = null;
            }

            tittleSimilarProducts.style.display = 'block'
            tittleCategoryProducts.style.display = 'none'


          /* Init Creación de Card para descripción del producto */
            
            const id = card.querySelector("[data-id]").id;   
            console.log("Se ha clickeado el id "+id);

            /* conexión con API para traer los datos */
            productsServices.detailProduct(id).then((response) => {

                console.log(response)                    

                        const imageUrl = response.imageUrl;
                        const name = response.name;
                        const price = response.price;
                        const description = response.description;
                        const id = response.id;

                console.log (imageUrl, name,price,description,id) 
                
                        const cardProduct = document.createElement("div");
                        const contentProduct = `
                        <div class="container container_star">
                            <div class="product__img">                
                                <img
                                src=${imageUrl}
                                alt="Imagen Product"
                                />
                            </div>
                            <div class="product__content">
                                    <h2 class="product__title">${name}</h2>
                                    <p class="product__price"> $ ${price}</p>
                                    <p class="product__description">${description}</p>
                                    <h3 class="card__title"><strong>Ref:</strong> ${id}</h3>
                            </div>      
                        </div>`;

                        cardProduct.style.width = '100%';
                        cardProduct.innerHTML = contentProduct;

                        console.log (cardProduct) 

                        divhero.style.display = 'none';
                        sectionDescriptionProduct.style.display = 'flex';/* 
                        sectionSimilarProduct.style.display = 'flex'; */


                    console.log (divProductDescrip)
                        
                    divProductDescrip.appendChild(cardProduct); 

                  }).catch((err) => console.log(err))
              
                
        })
/* Finish evento click en producto */
        
    return card;

  }
  
/* conexión con la API para traer la lista de loss datos de los productos ofertados en la página de Inicio*/
  productsServices
      .listProducts()
      .then((data) => {
        data.forEach(({ imageUrl, name, price, id, description }) => {
          const newCards = modelProducts(imageUrl, name, price, id, description);
          divProducts.appendChild(newCards); 
        });
      })
      .catch((error) => alert("Ocurrió un error"));
  
