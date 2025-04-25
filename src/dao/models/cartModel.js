import mongoose from "mongoose";
import { userManager } from '../userManager.js'

const cartSchema = new mongoose.Schema({
    products: {
        type : [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})


cartSchema.pre(/^find/, function(next) {
    this.populate('products.product')
    // this.populate('user')
    next()
})

export const cartModel = mongoose.model('carts', cartSchema)