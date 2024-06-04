
import {v4 as uuidv4} from 'uuid'
import fs from "fs";
import path from "path";


export default class CartManager{
    constructor(){
        this.path = path.join("src/files", "carts.json")
        this.carts = []
        this.checkFile()
    }

    checkFile = async () =>{
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, "[]")
            console.log("Archivo Creado")
        }
    }

    getCarts = async () =>{
        try{
            const cartsJSON = await fs.promises.readFile(this.path, "utf8")    
            return JSON.parse(cartsJSON)
        } catch(error){
            console.error('No se pudo leer el archivo', error)
            throw new Error('Error al obtener los carritos');
        }

    }

    getCartProducts = async (id) => {
        try{
            const carts = await this.getCarts()
            const cart = carts.find(cart => cart.id == id)
    
            if(cart){
                return cart.products
            } else{
                throw new Error('Carrito no encontrado')
            }
        } catch(error){
            console.error('Error al obtener los productos del carrito:', error);
            return false
        }
      
    }


    createCart = async () => {

        try{
            const id = uuidv4();
            const newCart = {id, products:[]}
            const carts = await this.getCarts()
            carts.push(newCart)

            await fs.promises.writeFile(this.path, JSON.stringify(carts))

            return newCart
        } catch(error){
            console.error('Error al crear el nuevo carrito', error)   
        }
    }
    
    addProductToCart = async (cid, pid) =>{
        try{
            const carts = await this.getCarts()
            const cartIndex = carts.findIndex(cart => cart.id === cid)

            if(cartIndex === -1){
                throw new Error("No se encontró un carrito con ese id")
            }

            const productsInCart = await this.getCartProducts(cid)
            const productIsInCart = productsInCart.findIndex(product => product.id=== pid);

            if(productIsInCart === -1){
                carts[cartIndex].products.push({id: pid, quantity: 1}) 
            } else{
                carts[cartIndex].products[productIsInCart].quantity++
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return carts[cartIndex]
        }  catch(error){
            console.error('Error al agregar el producto al carrito', error)
    }
}
}
