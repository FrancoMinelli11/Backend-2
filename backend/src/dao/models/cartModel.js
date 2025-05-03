import mongoose from "mongoose";

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
    this.populate({
        path: 'user',
        select: 'email'
    })
    next()
})

export const cartModel = mongoose.model('carts', cartSchema)