import { Router } from "express";
import { productManager } from "../server.js";
const router = Router();



// La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior)
router.get("/", async (req, res) => {

    const { limit } = req.query
    const limitInt = parseInt(limit)
    const products =  await productManager.getProducts(limitInt);

    if (limit && isNaN(limit)) {
        return res.status(400).send({ status: "error", message: "Limit should be a number" })
    }
    
    res.json(products)
})

// La ruta GET /:pid deberá traer sólo el producto con el id proporcionado [X]
router.get("/:pid", async (req, res) => {
    const { pid } = req.params; //string
    
    const product =  await productManager.getProductById(pid);
    
    res.json(product)
})


//La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// ID (Autogenerado), title, description, code, price, status, stock, category, thumbnails, status
router.post("/", async (req, res) => {
    const {title, description, code, price, status=true, stock, category, thumbnails} = req.body;
    const response = await productManager.addProducts({title, description, code, price, status, stock, category, thumbnails})
    res.json(response)
})


// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 
router.delete("/:pid", async (req, res) =>{   
    const id = req.params.pid
    const response = await productManager.deleteProducts(id)
    res.json(response)
})


router.put("/:pid", async (req, res) => {
    const { pid } = req.params
    const newData = req.body
    const response = await productManager.updateProduct(pid, newData);
    res.json(response)
})

export default router