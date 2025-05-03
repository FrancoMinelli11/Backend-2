import { cartModel } from './models/cartModel.js'
export class cartDAO {
    static async get(id) {
        try {
            const cart = await cartModel.findById(id).lean()
            return cart
        } catch (error) {
            console.error(`Error al obtener el carrito con ID ${id}:`, error)
            throw new Error('No se pudo obtener el carrito')
        }
    }

    static async put(id, update, options) {
        try {
            const cart = await cartModel.findByIdAndUpdate(id, update, options)
            return cart?.toObject()
        } catch (error) {
            console.error(`Error al actualizar el carrito con ID ${id}:`, error)
            throw new Error('No se pudo actualizar el carrito')
        }
    }
}
