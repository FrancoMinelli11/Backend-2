import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        unique: true,
        immutable: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})


export const ticketModel = mongoose.model('Ticket', ticketSchema);