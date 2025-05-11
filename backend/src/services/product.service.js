import { productDAO } from "../dao/productDAO.js"

class ProductService {
    constructor (DAO) {
        this.productDAO = DAO
    }

    getProducts () {
        return this.productDAO.get()
    }

    getProductById (id) {
        return this.productDAO.getById(id)
    }

    createProduct (product) {
        return this.productDAO.post(product)
    }

    updateProduct (id,product) {
        return this.productDAO.put(id,product)
    }

    deleteProduct (id) {
        return this.productDAO.delete(id)
    }
}

export const productService = new ProductService(productDAO)