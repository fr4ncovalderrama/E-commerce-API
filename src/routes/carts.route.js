import { Router } from "express";
import { cartManager } from "../server.js";
const router = Router();

router.get("/", async (req, res) => {
    try{
        const carts = await cartManager.getCarts()
        res.status(200).json(carts)
    } catch(error){
        res.status(500).json({message: 'Error al obtener los carritos', error: error.message})
    }
})

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try{
        const cart = await cartManager.getCartProducts(cid)
        if(cart){
            res.status(200).json(cart);
        } else{
            res.status(404).json(cart)
        }
    } catch(error){
        res.status(500).json({message: 'Error al obtener los productos del carrito', error: error.message})
    }
})


router.post("/", async (req, res) => {
    try{
        const response = await cartManager.createCart();
        res.status(201).json(response)
    } catch(error){
        res.status(500).json({status:500, message: "Error agregando el producto al carrito", error:error.message})
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params
    
    try{
        const response = await cartManager.addProductToCart(cid, pid)
        res.status(200).json(response)
    } catch (error){
        res.status(500).json({status:500, message: "Error agregando el producto al carrito", error:error.message})
    }


})


export default router