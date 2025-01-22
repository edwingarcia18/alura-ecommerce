
import { listProducts, deleteProduct, detailProduct, updateProduct} from "../src/firebase.js";

window.addEventListener('DOMContentLoaded', async() => {

const divProduct = document.querySelector("[data-product]");
  
listProducts((querySnapshot) => {
  let html = '';

      querySnapshot.forEach( doc => {
        const product = doc.data();
        const id = doc.id;
          html += `
            <div class="category__card data-content">
                <img
                src="${product.imageUrl}"
                alt="Imagen Product"
                class="card__img"
                />
                <h3 class="card__title">${product.name}</h3>
                <p class="card__price">$ ${product.price}</p>
                <div>
                <h3 class="card__title"> Ref: ${id} </h3>
                </div>        
                <div style="display:none;" data-description=>${product.description}</div> 
                <div class="card_id-delete">
                <i class="fa fa-pencil-square-o editicon icon" aria-hidden="true" data-edit="${id}"></i>
                <i class="fas fa-trash-alt trashIcon icon edit" data-id="${id}"></i>
                </div>     
            </div>`;
        })

        divProduct.innerHTML = html;
              
        const iconDelete = divProduct.querySelectorAll("[data-id]");
            /* boton eliminar, destructuramos el objeto doc.id*/
        iconDelete.forEach(i => {
          i.addEventListener("click", ({target: {dataset }}) => {
            Swal.fire({
              title: "Estas seguro?",
              text: `Estás seguro de eliminar este producto? Esta acción es irreversible!`,
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, eliminarlo!",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteProduct(dataset.id)
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "El producto ha sido eliminado",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })    
            
          });
        })
       
       
        const iconEdit = divProduct.querySelectorAll("[data-edit]");
        iconEdit.forEach((edit) => {
          edit.addEventListener("click", (e) => {
            const id = e.target.dataset.edit;
            console.log(id)
             detailProduct(id).then((doc) => {
                const detail = doc.data()
                    console.log (detail)
                    Swal.fire({
                      title: "Editar Producto",
                      showCancelButton: true,
                      html: `<form class="main__form" style="width:100%;">
                                <div class="main__field">
                                  <textarea
                                  class="main__input"
                                  type="text"
                                  required
                                  data-imgUrl
                                  >${detail.imageUrl}</textarea>
                                </div>
                          <div class="main__field">
                            <select name="Categoria" id="lang" class="main__input"
                            required
                            data-category>
                              <option selected >Categoria</option>
                              <option value="Star Wars">Star Wars</option>
                              <option value="Consolas">Consolas</option>
                              <option value="Diversos">Diversos</option>
                            </select>
                          </div>
                          <div class="main__field">
                            <textarea
                            class="main__input"
                            type="text"
                            required
                            data-name
                            >${detail.name}</textarea>
                          </div>
                          <div class="main__field">
                            <textarea
                            class="main__input"
                            type="number"
                            step="any"
                            required
                            data-price
                            >${detail.price}</textarea>
                          </div>
                          <div class="main__field">  
                            <textarea
                            class="main__input"
                            cols="30"
                            rows="3"
                            placeholder=""
                            required
                            data-description
                            >${detail.description}</textarea>
                          </div>
                      </form>`,
                      confirmButtonText: "Editar producto",
                      focusConfirm: false,
                      preConfirm: () => {
                        const imageUrl = Swal.getPopup().querySelector("[data-imgUrl]").value;
                        const name = Swal.getPopup().querySelector("[data-name]").value;
                        const price = Swal.getPopup().querySelector("[data-price]").value;
                        const description = Swal.getPopup().querySelector("[data-description]").value;
                        if (!imageUrl || !name || !price || !description) {
                          Swal.showValidationMessage(`Por favor rellene todos los campos`);
                        }
                        return {
                          price: price,
                          imageUrl: imageUrl,
                          name: name,
                          description: description
                              };
                            
                        },
                      }).then((result) => {
                        console.log(result.value)
                          
                        updateProduct(id, {
                          price: result.value.price,
                          imageUrl: result.value.imageUrl,
                          name: result.value.name,
                          description: result.value.description})

                        Swal.fire ({
                          title: "¡Actualización exitosa!",
                          icon: "success",
                          showConfirmButton: false,
                          timer: 1500,  
                        });
                      }) 
            });
         });
       
    })
  })
})