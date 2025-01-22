import { listProducts, detailProduct} from "../src/firebase.js";

const divhero = document.querySelector("[data-hero]");
const divProducts = document.querySelector("[data-products-body]");
const divProductDescrip  = document.querySelector("[data-product-description]");
const tittleCategoryProducts = document.querySelector("[data-tittle-category]");
const tittleSimilarProducts = document.querySelector("[data-tittle-similar-products]");

divProductDescrip.style.display = 'none';
tittleSimilarProducts.style.display = 'none';

document.addEventListener("DOMContentLoaded", function() {
  const firstElement = document.querySelector(".first-element");
  firstElement.scrollIntoView();
});

    listProducts((querySnapshot) => {
      let html = '';

          querySnapshot.forEach( doc => {
            const product = doc.data();
            const id = doc.id;
              html += `
                <div class="category__card">
                    <img
                    src="${product.imageUrl}"
                    alt="Imagen Product"
                    class="card__img"
                    />
                    <h3 class="card__title" data-name>${product.name}</h3>
                    <p class="card__price" data-price>$ ${product.price}</p>
                    <div>
                    <h3 class="card__title" data-id> Ref: ${id} </h3>
                    </div>        
                    <div style="display:none;" data-description>${product.description}</div> 
                    <a href="·" class="card__link" data-icon-view data-view="${id}" >Ver Producto</a>        
                </div>`;
            })                
           
      divProducts.innerHTML = html;
            
      const iconView = divProducts.querySelectorAll('[data-icon-view]')


/* Init evento click en producto en página de inicio */
iconView.forEach((view) => {
  view.addEventListener("click", (e) => {
            e.preventDefault();

          const id = e.target.dataset.view;
            console.log(e.target.dataset.view)
            const firstElement = document.querySelector(".first-element");
            firstElement.scrollIntoView();
            /* esta iteración se ejecuta solo si es un click generado en uno de los productos similares, ofertados en la página de descripción del producto creada en las siguientes líneas */
          
            while (divProductDescrip.firstChild) {
              divProductDescrip.removeChild(divProductDescrip.firstChild);
              break;
            }

            /* Validamos que no hayan listados de productos creados previamente */
            let newCards = null

            if (newCards != null) {
              newCards.parentNode.removeChild(newCards);
              newCards = null;
            }

            tittleSimilarProducts.style.display = 'block'
            tittleCategoryProducts.style.display = 'none'

            /* conexión con firebase para traer los datos */
            detailProduct(id).then((doc) => {
              const detail = doc.data()

                console.log(detail)                    

                        const imageUrl = detail.imageUrl;
                        const name = detail.name;
                        const price = detail.price;
                        const description = detail.description;
                        const id = detail.id;

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
                        divProductDescrip.style.display = 'flex';/* 
                        sectionSimilarProduct.style.display = 'flex'; */


                    console.log (divProductDescrip)
                        
                    divProductDescrip.appendChild(cardProduct); 

                  }).catch((err) => console.log(err))
              
                
        })
  })

})

