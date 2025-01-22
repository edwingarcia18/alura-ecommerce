import { mnsContact } from "../src/firebase.js";

const btnSubmit = document.querySelector('[data-submit-contact]');
const inputEmail = document.querySelector('[data-contact]');
const inputMessage = document.querySelector('[data-message-contact]');
const message = document.querySelector(".mns-incorrect");


message.style.display = 'none';
btnSubmit.disabled = false;

 inputEmail.addEventListener('blur',  (e) => {
  e.preventDefault()

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
})


inputMessage.addEventListener('blur', (e)=> {
  e.preventDefault()
  
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
})

btnSubmit.addEventListener('click', ()=> {
  const contacto = document.querySelector('[data-contact').value;
  const mns = document.querySelector('[data-message-contact]').value;

  mnsContact(contacto, mns)
    Swal.fire({
      title: "¡Gracias por contactarnos!",
      text: "Daremos respuesta en el menor tiempo posible",
      position: "center",
      icon: "success",
    })
  
    setTimeout(() => {
    document.querySelector('[data-contact').value = "";
    document.querySelector('[data-message-contact]').value = "";
    document.querySelector('[data-contact').style.border = "none";
    document.querySelector('[data-message-contact]').style.border = "none";
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = 0.6;
  }, 1700);

  

  console.log(mnsContact)
  
});

/* firebase deploy --only hosting */