
import express from "express";
import { productsRouter, cartRouter } from './routes/index.js';
import { ProductManager, CartManager } from './controllers/index.js';
import handlebarsConfig from "./config/handlebars.config.js";


const app = express();
const port = 8080;


handlebarsConfig.config(app)

app.use(express.json());

export const productManager = new ProductManager();
export const cartManager = new CartManager();


//Este habría que pasarlo al  productsRouter
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {})
})

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
