import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        index:true
    },
    price:{
        type: Number,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type: Number,
        required:true
    },
    thumbnail:{
        type: String,
    },
    category:{
        type: String,
        required:true,
        index:true
    }
})

export const productModel = mongoose.model('products', productSchema)