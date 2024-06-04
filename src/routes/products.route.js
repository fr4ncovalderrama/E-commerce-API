import { Router } from "express";
import { productManager } from "../server.js";
const router = Router();


router.get("/", async (req, res) => {
    const { limit } = req.query;
    const limitInt = parseInt(limit);

    if (limit && isNaN(limitInt)) {
        return res.status(400).json({ status: "error", message: "Limit debe ser un número entero" });
    }

    try {
        const products = await productManager.getProducts(limitInt);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al obtener los productos", error: error.message });
    }
});


router.get("/:pid", async (req, res) => {
    const { pid } = req.params; //string

    try{
        const product =  await productManager.getProductById(pid);
        res.status(200).json(product)
    } catch( error){
        res.status(500).json({ status: "error", message: `Error al obtener el producto con el id: ${id}`, error: error.message });
    }
})



router.post("/", async (req, res) => {
    const {title, description, code, price, status=true, stock, category, thumbnails=[]} = req.body;
    try{
        const response = await productManager.addProducts({title, description, code, price, status, stock, category, thumbnails})
        res.status(201).json(response)
    } catch(error){
        res.status(500).json({ status: "error", message: `No se pudo agregar el producto`, error: error.message });
    }
})


// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 
router.delete("/:pid", async (req, res) =>{   
    const { pid } = req.params


    try{
        const response = await productManager.deleteProducts(pid)

        if(response){
            res.status(200).send({ message: 'Producto eliminado' })
        } else{
            res.status(404).send({ message: 'Producto no encontrado' })
        }
    } catch(error){
        res.status(500).send({ status: 500, message: 'Error al eliminar el producto', error: error.message });
    }

})


router.put("/:pid", async (req, res) => {
    const { pid } = req.params
    const newData = req.body

    try{
        const response = await productManager.updateProduct(pid, newData);
        if(response){
            res.status(200).json(response)
        } else{
            res.status(404).json({ status: 404, message: 'Producto no encontrado' })
        }
    } catch(error){
        res.status(500).json({ status: 504, message: 'Error al actualizar el producto', error: error.message })
    }
    
})

export default router