
import {v4 as uuidv4} from 'uuid'
import fs from "fs";
import path from "path";


export default class ProductManager{
    constructor(){
        this.path = path.join("src/files", "products.json");
        this.products = []
    }


    //No se si es correcto, pero si no hay archivo el server se cae
    checkFile = async () =>{
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFileSync(this.path, "[]");
            console.log("Archivo Creado")
        }
    }

    getProducts = async (limit) => {
        await this.checkFile()
        const productsJSON = await fs.promises.readFile(this.path, "utf8")    
        const products = JSON.parse(productsJSON)

        // ¿Está bien que trate esta lógica acá o debería hacerlo desde el products.route?
        if(Number.isInteger(limit) && limit > 0){
            const limitedProducts = products.slice(0, limit);
            return limitedProducts
        }

        return products
    }

    getProductById = async (id) => {
        await this.checkFile() 
        const products = await this.getProducts()
        const foundProduct = products.find(product => product.id === id)
        return foundProduct
    }

    addProducts = async ({title, description, code, price, status, stock, category, thumbnails}) => {
        await this.checkFile()
        const id = uuidv4();
        let newProduct = {id, title, description, code, price, status, stock, category, thumbnails}

        this.products = await this.getProducts();
        this.products.push(newProduct)

        await fs.writeFileSync(this.path, JSON.stringify(this.products))
        return newProduct
    }


    deleteProducts= async (id) =>{
        await this.checkFile()
        this.products = await this.getProducts();
        const index = this.products.findIndex(product=> product.id === id)
        
        if(index !== -1){
            this.products.splice(index,1)
            await fs.writeFileSync(this.path, JSON.stringify(this.products))
        } else{
            console.log("Producto no encontrado")
        }
    }

    updateProduct = async (id, data) =>{
        await this.checkFile()
        const products = await this.getProducts();
        const index = products.findIndex(product=> product.id === id)

        if(index !== -1){
            products[index] = {id, ...data}
            await fs.writeFileSync(this.path, JSON.stringify(products))
        } else{
            console.log("Producto no encontrado")
        }
    }
}
    


