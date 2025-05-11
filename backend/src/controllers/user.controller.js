import jwt from 'jsonwebtoken'
import {config} from '../config/config.js'
export class UserController {
    static async register (req, res){
        res.send({status: 'success', payload: req.user})
    }

    static async login  (req, res) {
        const user = req.user
        delete user.password
        const token = jwt.sign(user, config.JWT_SECRET, {expiresIn: 60 * 60})
        res.cookie('token', token, {httpOnly: true})
        res.json({status: 'success', payload: {user}})
    }

    static loadProfile (req, res) {
        res.redirect('/profile.html')
    }

    static current (req, res) {
            res.json({payload: req.user})
    }

    static logout (req, res) {
        res.clearCookie('token')
        res.json({status: 'success', message: 'Logout successful'})
    }    
}
