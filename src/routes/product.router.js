import { Router } from "express";
import { ProductManager } from "../dao/productManager.js";
import { uploader } from "../utilsMulter.js";
import { auth } from "../middlewares/auth.js";
import passport from "passport";

export const router = Router()

router.post('/createProduct', uploader.single('thumbnail'),passport.authenticate('current', {session:false}),auth, async (req, res) => {
    let {title, description, price, thumbnail, code, stock, category} = req.body
    const img = req.file.filename
    thumbnail = img
    if(!title || !description || !price || !thumbnail || !code || !stock || !category) return res.status(400).json({ status: 'error', error: 'Incomplete values', payload: req.body })
    const newProduct = await ProductManager.createProduct({
    title, 
    description, 
    price, 
    thumbnail,
    code, 
    stock, 
    category
})
    res.json({status: 'success', payload: newProduct})
})

router.get('/', async (req, res) => {
    const products = await ProductManager.getProducts()
    res.json({status: 'success', payload: products})
})

router.delete('/:pid',passport.authenticate('current', {session:false}),auth, async (req, res) => {
    const { pid } = req.params
    if(!pid) return res.status(400).json({ status: 'error', error: 'Incomplete values' })
    const product = await ProductManager.getProductById(pid)
    if(!product) return res.status(404).json({ status: 'error', error: 'Product not found' })
    await ProductManager.deleteProduct(pid)
    res.json({status: 'success', payload: product})
})