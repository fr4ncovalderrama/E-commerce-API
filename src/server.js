
import express from "express";
// Routers
import { productsRouter, cartRouter, viewsRouter } from './routes/index.js';
// Managers
import { ProductManager, CartManager } from './controllers/index.js';
//Config
import handlebars from "./config/handlebars.config.js";
import serverSocket from './config/socket.config.js'


const app = express();
const port = 8080;

// Seteando handlebars
handlebars.config(app)


//Middleware
app.use(express.json('public'));

// Inicializando y exportando Managers
export const productManager = new ProductManager();
export const cartManager = new CartManager();

//Routers
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)


const serverHTTP = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


//Configurand Web Socket
serverSocket.config(serverHTTP)
