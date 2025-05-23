import { userModel } from "./models/userModel.js";

export class userDAO {

    static async get(filter) {
        return await userModel.findOne(filter).lean()
    }
    static async post(user) {
        const newUser = await userModel.create(user)
        return newUser.toJSON()
    }



}