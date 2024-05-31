
import fs from "fs";
import path from "path";


export default class ProductManager{
    constructor(){
        this.path = path.join("src/files", "products.json");
        this.products = []
    }

    checkFile = async () =>{
        //Si no existe archivo, lo crea.
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, "[]");
            console.log("Archivo Creado")
        }
    }

    getProducts = async (limit) => {
        await this.checkFile()
        //Lee el archivo y trae products
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
        await this.checkFile() //Si no estaba el archivo creado crasheaba el servidor, ¿está bien esto ?
        const productsJSON = await fs.promises.readFile(this.path, "utf8")    
        const products = JSON.parse(productsJSON)
        const foundProduct = products.find(product => product.id === id)
        return foundProduct
    }

    addProducts = async ({title, description, code, price, status, stock, category, thumbnails}) => {

    }


    deleteProducts(){

    }

    updateProduct(){

    }
}
    


