import {contactServices} from "../service/contact-service.js";
/* se importan los módulos creados */

const btnSubmit = document.querySelector('[data-submit]');
const inputEmail = document.querySelector('[data-email]');
const inputMessage = document.querySelector('[data-message]');
const message = document.querySelector('.mns-incorrect');


message.style.display = 'none';
/* parrafo de mns de error oculto en el html */

btnSubmit.disabled = true;
/* el metodo disabled, permite que estén inactivos o deshabilitados de modo que el usuario no podrá pulsar sobre ellos o elegirlos. */

inputEmail.addEventListener('blur', inputValidateEmail);
/* addEventlistener, es un escuchador que indica al navegador que este atento a la interacción del usuario.target.addEventListener('tipo de evento',función_a_lanzar,booleano);
El evento-metodo blur () se usa para quitar el foco de un elemento. y se ejecuta la funcion inputValidateName */
inputMessage.addEventListener('blur', inputValidateMessage);

btnSubmit.addEventListener('click', (e)=> {
  /* método preventDefault indica que el elemento (en este caso el btnSubmit) no funcione como deberia */
  e.preventDefault();
/* preventDefault() método cancela el evento si es cancelable, lo que significa que la acción predeterminada que pertenece al evento no ocurrirá. */
  const email = document.querySelector('[data-email]').value;
  const mns = document.querySelector('[data-message]').value;
  Swal.fire({
    title: "¡Gracias por contactarnos!",
    text: "Daremos respuesta en el menor tiempo posible",
    position: "center",
    icon: "success",
    cshowConfirmButton: false,
  }).then((result) => {
      if (result.isConfirmed) {
        contactServices.createContact(email, mns).then(respuesta => {
          console.log(respuesta);
        }).catch((error) => alert("Ocurrió un error"));
        /* método setTimeout() establece un temporizador que ejecuta una función o una porción de código después de que transcurre un tiempo */
        setTimeout(() => {
          email.value = "";
          mns.value = "";
          email.style.border = "none";
          mns.style.border = "none";
          btnSubmit.disabled = true;
          btnSubmit.style.opacity = 0.6;
        }, 1700);
      }
    });
});

function inputValidateEmail() {
  const value = inputEmail.value;

  if (value.length === 0) {
    inputEmail.style.border = '2px solid rgb(32, 248, 32)';
    message.style.display = 'block';
    message.style.color = 'red';
  } else {
    inputEmail.style.border = '2px solid rgb(32, 230, 248)';
    message.style.display = 'none';
  }
  if (
    inputEmail.style.border === '2px solid rgb(32, 230, 248)' &&
    inputMessage.style.border === '2px solid rgb(32, 230, 248)'
  ) {
    btnSubmit.disabled = false;
    btnSubmit.style.opacity = 1;
  } else {
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = 0.6;
  }
}

function inputValidateMessage() {
  const value = inputMessage.value;

  if (value.length === 0) {
    inputMessage.style.border = '2px solid rgb(32, 248, 32)';
    message.style.display = 'block';
    message.style.color = 'red';
  } else {
    inputMessage.style.border = '2px solid rgb(32, 230, 248)';
    message.style.display = 'none';
  }
  if (
    inputEmail.style.border === '2px solid rgb(32, 230, 248)' &&
    inputMessage.style.border === '2px solid rgb(32, 230, 248)'
  ) {
    btnSubmit.disabled = false;
    btnSubmit.style.opacity = 1;
  } else {
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = 0.6;
  }
}

