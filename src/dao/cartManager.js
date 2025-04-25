import { cartModel } from "./models/cartModel.js";

export class cartManager {
    static async getCart(id) {
        const cart = await cartModel.findById(id).lean()
        return cart
    }

    static async getAndUpdateCart (id,options,options2) {
        const cart = await cartModel.findByIdAndUpdate(id, options, options2).lean()
        return cart
    }
}
