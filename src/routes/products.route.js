import { Router } from "express";
import { productManager } from "../server.js";
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
    try {
        const productsFound = await productManager.getProducts(req.query);
        res.status(200).json({ status: true, payload: productsFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});


router.get("/:pid", async (req, res) => {
    const { pid } = req.params; //string

    try{
        const product =  await productManager.getProductById(pid);
        res.status(200).json({ status: true, payload: product });
    } catch( error){
        errorHandler(res, error.message);
    }
})


router.post("/", async (req, res) => {
    // const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    try{
        // const response = await productManager.addProducts({title, description, code, price, status, stock, category, thumbnails})
        const productCreated = await productManager.addProducts(req.body)
        res.status(201).json({ status: true, payload: productCreated });
    } catch(error){
        errorHandler(res, error.message);
    }
})



router.delete("/:pid", async (req, res) =>{   
    const { pid } = req.params

    try{
        const productDeleted = await productManager.deleteProducts(pid)
        res.status(200).json({ status: true, payload: productDeleted });

    } catch(error){
        errorHandler(res, error.message);
    }

})


router.put("/:pid", async (req, res) => {
    const { pid } = req.params
    const newData = req.body

    try{
        const productUpdated = await productManager.updateProduct(pid, newData);
        res.status(200).json({ status: true, payload: productUpdated });
    } catch(error){
        errorHandler(res, error.message);
    }
    
})

export default router