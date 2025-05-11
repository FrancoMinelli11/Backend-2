import { ticketModel } from "./models/ticket.model.js"

export class TicketDAO {

    static async post (amount, purchaser) {
        try {
            const ticket = await ticketModel.create({amount,purchaser})
            return ticket
        } catch (error) {
            console.log(error)
            return error
        }
    }
}