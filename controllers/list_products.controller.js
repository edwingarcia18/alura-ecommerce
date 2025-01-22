/* los controladores reciben los datos arrojados por la API, para trabajar la interaccion entre el html y el js, tiene la estructura de los datos que serán almacenados en el servidor, en este caso para exhibir los atributos del producto */

import { productsServices } from "../service/products-service.js";
/* se importan la llamada (variable y el método), que permitirá manipular los datos generados en la API con el CRUD */

const divProduct = document.querySelector("[data-product]");

const modelProduct = (imageUrl, name, price, id, description) => {
  const card = document.createElement("div");
  const content = `
    <div class="category__card ">
        <img
        src="${imageUrl}"
        alt="Imagen Product"
        class="card__img"
        />
        <h3 class="card__title">${name}</h3>
        <p class="card__price">$ ${price}</p>
        <div>
        <h3 class="card__title"> Ref: ${id}</h3>
        </div>        
        <div display="none" data-description>${description}</div> 
        <div class="card_id-delete">
        <i class="fa fa-pencil-square-o editicon icon" aria-hidden="true" data-edit id="${id}"></i>
        <i class="fas fa-trash-alt trashIcon icon" data-delete id="${id}"></i>
        </div>     
    </div>`;

  card.innerHTML = content;
  const iconEdit = card.querySelector("[data-edit]");
  const iconDelete = card.querySelector("[data-delete]");
  const textDescription = card.querySelector('[data-description]')

textDescription.style.display = 'none';

  /* boton eliminar */
  iconDelete.addEventListener("click", () => {
    const id = iconDelete.id;
    Swal.fire({
      title: "Estas seguro?",
      text: `Estás seguro de eliminar el producto ${name}? Esta acción es irreversible!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        productsServices
          .deleteProduct(id)
          .then((respuesta) => {
            console.log(respuesta);
          })
          .catch((error) => alert("Ocurrio un error al momento de eliminar"));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "El producto ha sido eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }).then(function(){
      location.reload();
      });

    return respuesta
  });
  

/* boton editar producto */
iconEdit.addEventListener("click", () => {
  const id = iconEdit.id;

  Swal.fire({
    title: "Editar Producto",
    showCancelButton: true,
    html: `<form class="main__form" style="width:100%;">
              <div class="main__field">
                <textarea
                class="main__input"
                id="nombre"
                type="url"
                required
                data-imgUrl
                >${imageUrl}</textarea>
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
          id="nombre"
          type="text"
          required
          data-name
          >${name}</textarea>
        </div>
        <div class="main__field">
          <textarea
          class="main__input"
          id="nombre"
          type="number"
          step="any"
          required
          data-price
          >${price}</textarea>
        </div>
        <div class="main__field">  
          <textarea
          class="main__input"
          name="message"
          id="message"
          cols="30"
          rows="3"
          placeholder=""
          required
          data-description
          >${description}</textarea>
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
        imageUrl: imageUrl,
        name: name,
        price: price,
        description: description,
            };
      },
    }).then((result) => {
      productsServices.updateProduct(result.value.imageUrl, result.value.name, result.value.price, result.value.description, id)
      Swal.fire ({
        title: "¡Actualización exitosa!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,  
      });
    }).then(function(){
      location.reload();
      });
    
})

  return card;
};


productsServices
  .listProducts()
  .then((data) => {
    data.forEach(({ imageUrl, name, price, id, description }) => {
      const newCard = modelProduct(imageUrl, name, price, id, description);
      divProduct.appendChild(newCard);
    });
  })
  .catch((error) => alert("Ocurrió un error"));
