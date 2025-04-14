import passport from "passport";
import local from 'passport-local'
import passportJWT from 'passport-jwt'
import { userManager } from "../dao/userManager.js";
import { passwordHash, validateHash } from "../utils.js";
import { config } from "./config.js";

function cookieExtractor(req) {
    let token = null
    if(req && req.cookies) {
        token = req.cookies.token   
    }
    return token
}
export const initializePassport = () => {
    
    passport.use('register', new local.Strategy(
        {
        usernameField:'email',
        passReqToCallback:true
        },
    async (req, username, password, done) => {
        try {
            const {first_name, last_name, age} = req.body
            if(!first_name || !last_name || !age) return done(null, false)
            let user = await userManager.findUser({email:username})
            if(user) return done(null, false)
            password = passwordHash(password)
            user = await userManager.createUser({first_name, last_name, age, email:username, password})
            return done(null, user)
        } catch (error) {
            done(error)
        }
    }))

    passport.use('login', new local.Strategy(
        {
            usernameField:'email'
        },
        async (username, password, done) => {
            try {
                const user = await userManager.findUser({email:username})
                if(!user || !validateHash(password, user.password)) return done(null, false)
                return done(null, user)
            } catch (error) {
                done(error)
            }
        }
    ))

    passport.use('current', new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            done(error)
        }
    }))
}