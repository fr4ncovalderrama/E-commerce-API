

import mongoDB from "../config/mongoose.config.js"
import ProductModel from '../models/product.model.js';

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";


export default class ProductManager{

    #productModel

    constructor(){
        this.#productModel = ProductModel;
    }
    
    getProducts = async (paramFilters = {}) => {
        try {
            
            const $and = [];
                
            if (paramFilters?.title) $and.push({ title:  paramFilters.title });
            if (paramFilters?.category) $and.push({ category:  paramFilters.category });
            if (paramFilters?.status) $and.push({ status:  paramFilters.status });
            
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { price: 1 },
                desc: { price   : -1 },
            };

            const paginationOptions = {
                limit: paramFilters.limit ?? 10,
                page: paramFilters.page ?? 1,
                sort: sort[paramFilters?.sort] ?? {},
                lean: true,
                // populate: "courses",
            };

            const productsFound = await this.#productModel.paginate(filters, paginationOptions);
            return productsFound;


        } catch (error) {
            throw new Error(error.message);
        }
    }

    getProductById = async (id) => {
        try{
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }
            const productFound = await this.#productModel.findById(id);

            if (!productFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }
            
            return productFound;
        } catch(error){
            throw new Error(error.message);
        }

    }


    addProducts = async (data) => {
        try{
            const productCreated = new ProductModel(data)
            await productCreated.save();

            return productCreated;
        } catch(error){
            throw new Error(error.message);
        }
    }


    deleteProducts= async (id) =>{
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const productFound = await this.#productModel.findById(id);

            if(!productFound){
                throw new Error(ERROR_NOT_FOUND_ID);
            }
            
            await this.#productModel.findByIdAndDelete(id);
            return productFound;

        } catch (error) {
            throw new Error(error.message);
        }

    }

    updateProduct = async (id, data) =>{

        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const productFound = await this.#productModel.findById(id);

            if (!productFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            productFound.title = data.title;
            productFound.description = data.description;
            productFound.code = data.code;
            productFound.price = data.price;
            productFound.status = data.status;
            productFound.stock = data.stock;
            productFound.category = data.category;
            
            await productFound.save();

            return productFound;

        } catch (error) {
            throw new Error(error.message);
        }
    }

}
    


