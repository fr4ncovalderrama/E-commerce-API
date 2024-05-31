
import express from "express";
import productsRouter from "./routes/products.route.js"
import cartRouter from "./routes/carts.route.js"
import ProductManager from "./controllers/productManager.js";

const HOST = "localhost";
const port = 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Exportando productManager para routers
export const productManager = new ProductManager;

//Home
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});


// Ruta productos
app.use('/api/products', productsRouter)

// Ruta carrito
app.use('/api/cart', cartRouter)


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
