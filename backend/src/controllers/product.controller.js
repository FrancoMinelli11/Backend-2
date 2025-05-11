import { productService } from "../services/product.service.js"

export class ProductController {

    static async createProduct (req, res) {
        let {title, description, price, thumbnail, code, stock, category} = req.body
        const img = req.file.filename
        thumbnail = img
        if(!title || !description || !price || !thumbnail || !code || !stock || !category) return res.status(400).json({ status: 'error', error: 'Incomplete values', payload: req.body })
        const newProduct = await productService.createProduct({
        title, 
        description, 
        price, 
        thumbnail,
        code, 
        stock, 
        category
    })
        res.json({status: 'success', payload: newProduct})
    }

    static async getProducts (req, res) {
        const products = await productService.getProducts()
        res.json({status: 'success', payload: products})
    }

    static async deleteProduct (req, res) {
        const { pid } = req.params
        if(!pid) return res.status(400).json({ status: 'error', error: 'Incomplete values' })
        const product = await productService.getProductById(pid)
        if(!product) return res.status(404).json({ status: 'error', error: 'Product not found' })
        await productService.deleteProduct(pid)
        res.json({status: 'success', payload: product})
    }

    static async updateProduct (req, res) {
    const { pid } = req.params
    let {title, description, price, thumbnail, code, stock, category} = req.body
    const img = req.file.filename || null
    if(img) thumbnail = img
    if(!pid) return res.status(400).json({ status: 'error', error: 'Incomplete values' })
    const product = await productService.getProductById(pid)
    if(!product) return res.status(404).json({ status: 'error', error: 'Product not found' })
    const updatedProduct = await productService.updateProduct(pid, {
        title : title || product.title, 
        description : description || product.description, 
        price : price || product.price, 
        thumbnail : thumbnail || product.thumbnail,
        code : code || product.code, 
        stock : stock || product.stock, 
        category : category || product.category
})
    res.json({status: 'success', payload: updatedProduct})
}
}