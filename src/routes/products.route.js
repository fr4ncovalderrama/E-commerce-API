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
    const id = parseInt(req.params.pid) // ¿Esto sería buena practica? o es mejor hacer destructuring y luego crear una nueva constante para hacer el parseInt?
    const product =  await productManager.getProductById(id);
    res.json(product)
})


//La ruta raíz POST / deberá agregar un nuevo producto con los campos:
// ID (Autogenerado), title, description, code, price, status, stock, category, thumbnails, status
router.post("/", (req, res) => {
    console.log(req.query)
    res.send("Intentando agregar un elemento")
})


// La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 
router.delete("/:pid", (req, res) =>{   
    const id = parseInt(req.params.pid)

    const index = products.findIndex(product=> product.id === id)
    
    if(index === -1){
        return res.status(404).json({error:'Item no encontrado'});
    }

    products.splice(index, 1);

    res.send(`Producto ${id} eliminado`)
})

export default router