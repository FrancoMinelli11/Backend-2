import { userModel } from "./models/userModel.js";

export class userManager {

    static async createUser(user) {
        const newUser = await userModel.create(user)
        return newUser.toJSON()
    }

    static async findUser(filter) {
        return await userModel.findOne(filter).lean()
    }


}