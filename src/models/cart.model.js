import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
        }
    }
],
});



const CartModel = model("cart", cartSchema);

export default CartModel;