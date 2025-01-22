import { productsServices } from "../service/products-service.js";

const btnAdd = document.querySelector("[data-btn-add]");


btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
 const imageUrL = document.querySelector("[data-imgUrl]").value;
const name = document.querySelector("[data-name]").value;
const price = document.querySelector("[data-price]").value;
const description = document.querySelector("[data-description]").value;
  
        Swal.fire({
            title: "¡Registro Completado!",
            text: "Ya puedes ver tu nuevo producto",
            position: "center",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Ver listado!",
          }).then((result) => {
            if (result.isConfirmed) {
                productsServices
                .createProduct(imageUrL, name, price, description).then(respuesta => {
                console.log(respuesta);
                window.location.href = "../screens/products.html"
              }).catch((error) => console.log("Ocurrió un error"));     }
});
})

