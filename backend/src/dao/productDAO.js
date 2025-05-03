import { productModel } from "./models/productModel.js";

export class productDAO {
    static async post(product) {
        const newProduct = await productModel.create(product)
        return newProduct.toJSON()
    }

    static async get() {
        return await productModel.find().lean()
    }

    static async getById(id) {
        return await productModel.findById(id).lean()
    }

    static async put(id, product) {
        return await productModel.findByIdAndUpdate(id, product, { new: true }).lean()
}
    
        static async delete(id) {
            return await productModel.findByIdAndDelete(id).lean()
        }
    }