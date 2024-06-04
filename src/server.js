
import express from "express";
import productsRouter from "./routes/products.route.js"
import cartRouter from "./routes/carts.route.js"
import ProductManager from "./controllers/productManager.js";
import CartManager from "./controllers/cartManager.js";

const HOST = "localhost";

const port = 8080;
const app = express();


app.use(express.json());


//Exportando productManager y cartManager para  para routers
//¿Esto es buena practica? 
export const productManager = new ProductManager;
export const cartManager = new CartManager;

//Home
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});


// Ruta productos
app.use('/api/products', productsRouter)

// Ruta carrito
app.use('/api/carts', cartRouter)


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
