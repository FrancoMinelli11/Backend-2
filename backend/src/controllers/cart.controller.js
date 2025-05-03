import { cartDAO } from "../dao/cartDAO.js";
export class CartController {
    static async getCart (req, res) {
        const cart = await cartDAO.get({_id:req.user.cart._id})
        res.json({status: 'success', payload: cart})
    }

    static async updateCart (req, res) {
        try {
            const cid = req.user.cart
            const { product, quantity } = req.body;
    
            const cart = await cartDAO.get(cid)  
            if (!cart) {
                return res.status(404).json({ status: 'error', message: 'El carrito no existe' });
            }
    
            const quantityNumber = Number(quantity);
            if (isNaN(quantityNumber) || quantityNumber <= 0) {
                return res.status(400).json({ status: 'error', message: 'La cantidad debe ser un número válido y mayor a 0' });
            }
    
            const existingProduct = cart.products.find(p => p.product && p.product._id && p.product._id.toString() === product);
    
            if (existingProduct) {
                const updatedCart = await cartDAO.put(
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
    
            const updatedCart = await cartDAO.put(
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
    }
}