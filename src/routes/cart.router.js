import { Router } from "express";
import { cartModel } from "../dao/models/cartModel.js";
import passport from "passport";
import { cartManager } from "../dao/cartManager.js";
import mongoose from "mongoose";
export const router = Router()

router.get('/',passport.authenticate('current', {session:false}), async (req, res) => {
    const cart = await cartModel.find({_id:req.user.cart._id}).lean()
    res.json({status: 'success', payload: cart})
})

router.put('/add',passport.authenticate('current', {session:false}), async (req, res) => {
    try {
        const cid = req.user.cart._id
        const { product, quantity } = req.body;

        const cart = await cartManager.getCart(cid)  
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'El carrito no existe' });
        }

        const quantityNumber = Number(quantity);
        if (isNaN(quantityNumber) || quantityNumber <= 0) {
            return res.status(400).json({ status: 'error', message: 'La cantidad debe ser un número válido y mayor a 0' });
        }

        const existingProduct = cart.products.find(p => p.product && p.product._id && p.product._id.toString() === product);

        if (existingProduct) {
            const updatedCart = await cartManager.getAndUpdateCart(
                cid,
                {
                    $inc: { "products.$[elem].quantity": quantityNumber }
                },
                {
                    new: true,
                    arrayFilters: [{ "elem.product": product }] 
                }
            );
            return res.json({
                status: 'success',
                payload: updatedCart
            });
        } 

        const updatedCart = await cartManager.getAndUpdateCart(
            cid,
            { $push: { products: { product, quantity: quantityNumber } } },
            { new: true }   
        );

        return res.json({
            status: 'success',
            payload: updatedCart
        });

    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
});