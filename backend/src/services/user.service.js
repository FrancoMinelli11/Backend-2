import { userDAO } from "../dao/userDAO.js"

class UserService {
    constructor(DAO){
        this.userDAO = DAO
    }

    getUser (filter) {
        return this.userDAO.get(filter)
    }

    createUser (user) {
        return this.userDAO.post(user)
    }
}

export const userService = new UserService(userDAO)