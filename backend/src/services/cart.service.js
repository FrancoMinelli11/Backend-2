import { cartDAO } from "../dao/cartDAO.js"

class CartService {
    constructor (DAO) {
        this.cartDAO = DAO
    }
    async getCartById(id) {
        return this.cartDAO.getById(id)
    }

    async updateCart(cartId, cartData, options) {

        return this.cartDAO.put(cartId, cartData, options)
    }
}

export const cartService = new CartService(cartDAO)