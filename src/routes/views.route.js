import { Router } from "express";
import { productManager } from "../server.js";
const router = Router();



router.get('/', async (req, res) => {
    try {
        const products =  await productManager.getProducts(); 
        res.render('home', { products });
    } catch (error){
        console.error(error);
        res.status(500).send('Error del servidor')
    }
});


  
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