import { Router } from "express";
import { cartManager } from "../server.js";
const router = Router();

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";


const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    return res.status(500).json({ status: false, message });
};


router.get("/", async (req, res) => {
    try{
        const cartsFound = await cartManager.getCarts()
        res.status(200).json({ status: true, payload: cartsFound });
    } catch(error){
        res.status(500).json({message: 'Error al obtener los carritos', error: error.message})
    }
})

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cartFound = await cartManager.getCartProducts(cid);
        res.status(200).json({ status: true, payload: cartFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
})


router.post("/", async (req, res) => {
    try{
        const response = await cartManager.createCart();
        res.status(200).json({ status: true, payload: response });
    } catch(error){
        errorHandler(res, error.message);
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params
    
    try{
        const response = await cartManager.addProductToCart(cid, pid)
        res.status(200).json({ status: true, payload: response });
    } catch (error){
        errorHandler(res, error.message);
    }


})


router.delete("/:cid/products/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    try {
        const currentCart = await cartManager.deleteProductFromCart(cid, pid);
        res.status(200).json({ status: true, payload: currentCart });
        return currentCart;
    } catch (error) {
        errorHandler(res, error.message);
    }
})

// PUT api/carts/:cid deberá actualizar todos los productos del carrito con un arreglo de productos.
router.put("/:cid", async (req,res) =>{
    const { cid } = req.params;
    const productsToUpdate = req.body;

    try {
        const updatedCart = await cartManager.updateAllProducts(cid, productsToUpdate);
        res.status(200).json({ status: true, payload: updatedCart });
    } catch (error) {
        errorHandler(res, error.message);
    }

}) ///////////////////////////

router.put("/:cid/products/:pid", async (req,res) =>{
     const {cid, pid} = req.params;
     const { quantity } = req.body;
     try {
        const updatedCart = await cartManager.updateQuantity(cid, pid, quantity);   
        res.status(200).json({ status: true, payload: updatedCart });
     } catch (error) {
        errorHandler(res, error.message);
     }
     
})

router.delete("/:cid", async (req,res) =>{

    const { cid } = req.params;
    
    try {
        const updatedCart = await cartManager.deleteAllProductsOfCart(cid)
        res.status(200).json({ status: true, payload: updatedCart });
    } catch (error) {
        errorHandler(res, error.message);
    }
})


export default router