const user = "correo@alura.com";
const password = "alura123";

/* Init Pop-up ventana emergente */

window.onload = function() {
  Swal.fire({
    title: "¡Datos de prueba!",
    text: `utiliza el email: correo@alura.com  y la clave: alura123 para ingresar al modulo de administrador`,
    position: "center",
    icon: 'warning'
  })
}
/* Finish Pop-up ventana emergente */

const inputEmailLogin = document.querySelector("[data-email-login]");

const inputPasswordLogin = document.querySelector("[data-password-login]");

const btnLogin = document.querySelector("[data-login]");

const messageError = document.querySelector(".message-error");

messageError.style.display = "none";


inputEmailLogin.addEventListener("blur", validateInput);
inputPasswordLogin.addEventListener("blur", validatePassword);


btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputEmailLogin.value !== user || inputPasswordLogin.value !== password) {
    Swal.fire({
        title: "¡Datos incorrectos!",
        text: "valida todos los campos nuevamente",
        position: "center",
        icon: 'error',
        cshowConfirmButton: false,
      })
  } else {
    messageError.style.display = "none";
    window.location.href = "../screens/products.html";
  }
});

function validateInput() {
  if (inputEmailLogin.value.length === 0) {
    inputEmailLogin.style.border = '2px solid rgb(32, 248, 32)';
  }

  if (this.type === "email") {
    validateEmail(this);
  }
}

function validatePassword() {
  if (inputPasswordLogin.value.length > 0) {
    messageError.style.display = "none";
    inputPasswordLogin.style.border = '2px solid rgb(32, 230, 248)';
  } else {
    inputPasswordLogin.style.border = '2px solid rgb(32, 248, 32)';
    messageError.style.display = "block";
    messageError.textContent = "Complete los campos";
  }
}

function validateEmail(e) {
  const message = e.value;

  const er =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (er.test(message.toLowerCase())) {
    messageError.style.display = "none";
    e.style.border = '2px solid rgb(32, 230, 248)';
  } else {
    e.style.border = '2px solid rgb(32, 248, 32)';
    messageError.style.display = "block";
    messageError.textContent = "Complete los campos correctamente";
  }
}