import { createProduct } from "../src/firebase.js";

const btnAdd = document.querySelector("[data-btn-add]");


btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
const imageUrl = document.querySelector("[data-imgUrl]");
const name = document.querySelector("[data-name]");
const price = document.querySelector("[data-price]");
const description = document.querySelector("[data-description]");

createProduct(imageUrl.value,name.value,price.value,description.value)
        console.log(createProduct)

        Swal.fire({
            title: "¡Registro Completado!",
            text: "Ya puedes ver tu nuevo producto",
            position: "center",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Ver listado!",
          }).then((result) => {
            if (result.isConfirmed) {
               window.location.href = "../screens/products.html" }})

          
});

