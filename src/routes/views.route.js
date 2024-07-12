import { Router } from "express";
import { productManager, cartManager } from "../server.js";
const router = Router();




router.get('/', async (req, res) => {
    try {
        const products =  await productManager.getProducts(req.query); 
        res.render('home', { products });
    } catch (error){
        console.error(error);
        res.status(500).send('Error del servidor')
    }
});



router.get('/products', async (req, res) => {
    try {
        const products =  await productManager.getProducts(req.query); 
        res.render('home', { products });
    } catch (error){
        console.error(error);
        res.status(500).send('Error del servidor')
    }
});

router.get('/carts/:cid', async (req, res) => {

    const {cid} = req.params;

    try {
        const products =  await cartManager.getCartProducts(cid);
        const cartProducts = products.products;
        res.render('cart', { cartProducts });
    } catch (error) {
        res.status(500).send('Error del servidor')
    }
})

  
router.get('/realtimeproducts', async (req, res) => {
    try{
        res.status(200).render('realTimeProducts', {
            style: 'styles',
            title: 'Productos',
        })
    } catch (error){
        console.error(error);
        res.status(500).send("Error del servidor")
    }
})

export default router;