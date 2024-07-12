import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Product title is required']
      },
      description: {
        type: String,
        required: [true, 'Product description is required']
      },
      code: {
        type: String,
        required: [true, 'Product code is required'],
      },
      price: {
        type: Number,
        required: [true, 'Product price is required']
      },
      status: {
        type: Boolean,
        default: true
      },
      stock: {
        type: Number,
        required: [true, 'Product stock is required']
      },
      category: {
        type: String,
        required: [true, 'Product category is required']
      },
      thumbnails: {
        type: [String],
        default: []
      }
    });        

    productSchema.plugin(paginate);

    const ProductModel = model("products", productSchema)

    export default ProductModel;
