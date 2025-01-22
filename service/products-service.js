/* este archivo recibe la respuesta del controlador y la genera en un json; realiza la comunicacion con el servidor */
/* logica de conexión con nuestro backend -Construcción del CRUD*/
const listProducts = () =>
    fetch('http://localhost:3000/products').then((response) => response.json()).catch((err) => console.log(err));

    /* los Fetch API, nos permiten conectarnos con el servidor, optener y enviar informacion; siempre necesita de un parametro que es en este caso La URL */
/* cuando no se define el metodo por default se implementa el metodo GET implicitamente */
    
const createProduct = (imageUrl, name, price, description) => { /* no se recibe el id como parametro, sino que se genera automaticamente */
return fetch("http://localhost:3000/products", {
    /* POST crear nuevo recurso */
    method: "POST",
    /* encabezado define que tipo de archivo se va a recibir y el cuerpo de la petición con estructura de objeto */
    headers: {
    "Content-Type": "application/json",
    },
    /* esta estructura debe coincidir con la registrada en el simulador del API (db.json) */
    body: JSON.stringify({
    imageUrl,
    name,
    price,
    description,
    id: uuid.v4(), /* se implementa función del script importado de la pàg uuid para generar un id único automáticamente */
    }),
});
};

const deleteProduct = (id) => {
return fetch(`http://localhost:3000/products/${id}`, { /* backticks para insertar variable */
    method: "DELETE", /* no interesa los headers ni body por que no estamos mandando información */
});
};

/* buscar producto */
const detailProduct = async (id) => {
    return fetch(`http://localhost:3000/products/${id}`).then((response) =>
        response.json()
).catch((err) => console.log(err));
};

/* modificar producto */
const updateProduct = (imageUrl, name, price, description, id) => {
fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    imageUrl,
    name,
    price,
    description,
    }),
}).then((resp) => resp).catch((err) => console.log(err));
};

      export const productsServices = {
        listProducts,
        createProduct,
        deleteProduct,
        detailProduct,
        updateProduct,
      };