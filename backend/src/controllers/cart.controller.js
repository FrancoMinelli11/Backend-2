import { TicketDAO } from "../dao/ticketDAO.js"
import { cartService } from "../services/cart.service.js"
export class CartController {
    static async getCart (req, res) {
        const cart = await cartService.getCartById({_id:req.user.cart})
        res.json({status: 'success', payload: cart})
    }

    static async updateCart (req, res) {
        try {
            const { cid, pid: product } = req.params
            if (!cid || !product) {
                return res.status(400).json({ status: 'error', message: 'El carrito y el producto son obligatorios' })
            }
            const { quantity } = req.body
    
            const cart = await cartService.getCartById(cid)  
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'El carrito no existe' })
            }
    
            const quantityNumber = Number(quantity)
            if (isNaN(quantityNumber) || quantityNumber <= 0) {
                return res.status(400).json({ status: 'error', message: 'La cantidad debe ser un número válido y mayor a 0' })
            }
    
            const existingProduct = cart.products.find(p => p.product && p.product._id && p.product._id.toString() === product)
    
            if (existingProduct) {
                const updatedCart = await cartService.updateCart(
                    cid,
                    {
                        $inc: { "products.$[elem].quantity": quantityNumber }
                    },
                    {
                        new: true,
                        arrayFilters: [{ "elem.product": product }] 
                    }
                )
                return res.json({
                    status: 'success',
                    payload: updatedCart
                })
            } 
    
            const updatedCart = await cartService.updateCart(
                cid,
                { $push: { products: { product, quantity: quantityNumber } } },
                { new: true }   
            )
    
            return res.json({
                status: 'success',
                payload: updatedCart
            })
    
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message })
        }
    }

    static async purchaseCart (req, res) {
        try {
            const cartId = req.params.cid
            const cart = await cartService.getCartById(cartId)
    
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'El carrito no existe' })
            }
    
            if (cart.products.length === 0) {
                return res.status(400).json({ status: 'error', message: 'El carrito está vacío' })
            }
            
            const amount = cart.products.reduce((acc, product) => {
                if(product.quantity > product.product.stock) {
                    return acc 
                }
                const productPrice = product.product.price || 0 
                return acc + (productPrice * product.quantity)
            }, 0)
            const ticket = await TicketDAO.post(amount,cart.user.email)
            await cartService.updateCart(
                cartId,
                { $set: { products: cart.products.filter(product => product.quantity > product.product.stock) } },
                { new: true }
            )

            return res.status(201).json({
                status: 'success',
                payload: ticket
            })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message })
        }
    }
}

