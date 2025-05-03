import mongoose from "mongoose";
import { cartModel } from "./cartModel.js";

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.cart ) {
        try {
            const newCart = await cartModel.create({user: this._id});
            this.cart = newCart._id
        } catch (err) {
            return next(err)
        }
    }
    next()
})

// UserSchema.pre(/^find/, function (next) {
//     this.populate('cart')
//     next()
// })



export const userModel = mongoose.model('users', UserSchema)