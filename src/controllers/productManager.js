
import {v4 as uuidv4} from 'uuid'
import fs from "fs";
import path from "path";


export default class ProductManager{
    constructor(){
        this.path = path.join("src/files", "products.json");
        this.products = []
        this.checkFile()
    }

    
    checkFile = async () =>{
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, "[]");
            console.log("Archivo Creado")
        }
    }
    
    getProducts = async (limit) => {
        try{
            const productsJSON = await fs.promises.readFile(this.path, "utf8")    
            const products = JSON.parse(productsJSON)

            // ¿Está bien que trate esta lógica acá o debería hacerlo desde el products.route?
            if(Number.isInteger(limit) && limit > 0){
                const limitedProducts = products.slice(0, limit);
                return limitedProducts
            }

            return products
        } catch(error){
            console.error('Error al obtener los products', error)
        }
    }

    getProductById = async (id) => {
        try{
            const products = await this.getProducts()
            return products.find(product => product.id === id)

        } catch(error){
            console.error('Error al obtener producto por ID', error)
        }

    }


    //Todos los campos deben son obligatorios a expepción de thumbnails
    addProducts = async ({title, description, code, price, status, stock, category, thumbnails}) => {
        try{
            if (!title || !description || !code || !price || !status || !stock || !category) {
                throw new Error("Todos los campos son obligatorio excepto los thumbnails")
            }

            const id = uuidv4();
            let newProduct = {id, title, description, code, price, status, stock, category, thumbnails}
    
            this.products = await this.getProducts();
            this.products.push(newProduct)
    
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            return newProduct
        } catch(error){
            console.error('Error al agregar el producto', error)
            return null;
        }
    }


    deleteProducts= async (id) =>{
        try{
            const products = await this.getProducts();
            const index = products.findIndex(product=> product.id === id)
            
            if(index !== -1){
                products.splice(index, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return true
            } else{
                console.log("Producto no encontrado")
                return false
            }
        } catch(error){
            console.error('Error al eliminar el producto', error)
            return false
        }


    }

    updateProduct = async (id, data) =>{
        try{
            const products = await this.getProducts();
            const index = products.findIndex(product=> product.id === id)
    
            if(index !== -1){
                products[index] = {id, ...data}
                await fs.promises.writeFile(this.path, JSON.stringify(products))
            } else{
                console.log("Producto no encontrado")
            }

            return "Producto actualizado"
        } catch(error){
            console.error("Error al actualizar el producto")
        }
        
    }
}
    


