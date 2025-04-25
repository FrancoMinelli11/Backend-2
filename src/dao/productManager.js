import { productModel } from "./models/productModel.js";

export class ProductManager {
    static async createProduct(product) {
        const newProduct = await productModel.create(product)
        return newProduct.toJSON()
    }

    static async getProducts() {
        return await productModel.find().lean()
    }

    static async getProductById(id) {
        return await productModel.findById(id).lean()
    }

    static async updateProduct(id, product) {
        return await productModel.findByIdAndUpdate(id, product, { new: true }).lean()
}
    
        static async deleteProduct(id) {
            return await productModel.findByIdAndDelete(id).lean()
        }
    }