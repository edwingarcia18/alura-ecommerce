const listContact = () =>
fetch('http://localhost:3000/contact').then((response) => response.json()).catch((err) => console.log(err));


const createContact = ( email, mns) => {
return fetch("http://localhost:3000/contact", {
    /* POST crear nuevo recurso, si no se especifica por default se implementa el metodo GET */
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    email,
    mns,
    id: uuid.v4(), /* se implementa función del script importado de la pàg uuid para generar un id único automáticamente */
    }),
});
}

const deleteContact = (id) => {
  return fetch(`http://localhost:3000/contact/${id}`, { /* backticks para insertar variable */
      method: "DELETE", /* no interesa los headers ni body por que no estamos mandando información */
  });
  };
      

/* se exportan los módulos creados */
      export const contactServices = {
        listContact,
        createContact,
        deleteContact
      };