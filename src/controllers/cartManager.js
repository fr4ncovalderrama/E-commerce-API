import mongoDB from "../config/mongoose.config.js"
import CartModel from '../models/cart.model.js';

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";


export default class CartManager{
    
    #cartModel

    constructor(){
        this.#cartModel = CartModel;
    }

    getCarts = async () =>{
        try {
            const carts = await this.#cartModel.find().lean()
            return carts;
        } catch (error) {
            throw new Error(error.message);
        }


    }

    getCartProducts = async (id) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }
            const cartFound = await this.#cartModel.findById(id).populate('products.product')

            if(!cartFound){
                throw new Error(ERROR_NOT_FOUND_ID);
            }
            return cartFound;
            
        } catch (error) {
            throw new Error(error.message); 
        }
    }


    createCart = async () => {
        try {
            const cartCreated = new CartModel();
            await cartCreated.save();
            return cartCreated;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    addProductToCart = async (cid, pid) =>{
        const newProduct = { product: pid, quantity: 1 };

        try {   
            if (!mongoDB.isValidID(cid)) {
                throw new Error("El id del carrito es invalido");
            }

            if (!mongoDB.isValidID(pid)) {
                throw new Error("El id del producto es invalido");
            }

            const cartFound = await this.#cartModel.findById(cid)
            
            if(!cartFound){
                throw new Error(ERROR_NOT_FOUND_ID);
            }
            
            const indexProduct = cartFound.products.findIndex((item) => item.product == pid);

            if (indexProduct < 0) {
                cartFound.products.push(newProduct);
            } else {
                cartFound.products[indexProduct].quantity += 1;
            };

            await cartFound.save();

            return cartFound;

        } catch (error) {
            throw new Error(error.message);
        }

    }

    deleteProductFromCart = async ( cid,pid ) => {
        try {
            if (!mongoDB.isValidID(cid)) {
                throw new Error("El id del carrito es invalido");
            }

            if (!mongoDB.isValidID(pid)) {
                throw new Error("El id del producto es invalido");
            }

            const updatedCart = await this.#cartModel.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { product: pid } } },
                { new: true }
              ).lean()
              
              if(!updatedCart){
                throw new Error(ERROR_NOT_FOUND_ID);
            }
            return updatedCart
        } catch (error) {
            throw new Error(error.message);
        }
    }

    
    updateQuantity = async (cid, pid, quantity) => {
        try {

            if (!mongoDB.isValidID(cid)) {
                throw new Error("El id del carrito es invalido");
            }

            if (!mongoDB.isValidID(pid)) {
                throw new Error("El id del producto es invalido");
            }

            if(!isNaN(quantity) && quantity < 0){
                throw new Error("La cantidad no es valida");
            }

            const currentCart = await this.getCartProducts(cid);
            const indexProduct = currentCart.products.findIndex((item) => item.product.id === pid);

            if (indexProduct !== -1) {
                currentCart.products[indexProduct].quantity = quantity;
                await currentCart.save();
                return currentCart;
            } else {
                return 'Product not found on cart'
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };


    deleteAllProductsOfCart = async ( cid ) => {
        try {
            if (!mongoDB.isValidID(cid)) {
                throw new Error(ERROR_INVALID_ID);
            }
    
            const updatedCart = await this.#cartModel.findOneAndUpdate(
                { _id: cid },
                { $set: { products: [] } },
                { new: true }
              ).populate("products.product");
            
              
            return updatedCart;

        } catch (error) {
            throw new Error(error.message);
        }
    }



    updateAllProducts = async (cid, products) => {
        try {

            
            if (!mongoDB.isValidID(cid)) {
                throw new Error("El id del carrito es invalido");
            }

            if(products.length < 0){
                throw new Error("Tiene que ser un array de productos");
            }

           await this.deleteAllProductsOfCart(cid);

           await products.forEach((product) => {
                this.addProductToCart(cid, product.id)
           });
    
         return this.getCartProducts(cid);
        } catch (error) {
          console.error(`Error trying to update all products from the cart: ${error}`);
        };
      };
}
