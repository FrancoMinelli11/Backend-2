import { Router } from "express";
import passport from "passport";
import { UserController } from "../controllers/user.controller.js";

export const router = Router();

// router.post('/register', async (req, res) => {
//     try {
//         let { first_name, last_name, email, password } = req.body
//         if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' })
//         password = passwordHash(password)
//         const user = { first_name, last_name, email, password }
//         if(await userManager.findUser({email: user.email})) return res.status(400).send({ status: 'error', error: 'User already exists' })
//         const newUser = await userManager.createUser(user)
//         res.render('index', {user:newUser})
// } catch (error) {
//         console.log(error);
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body
//         if (!email || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' })
//         const user = await userManager.findUser({email: email})
//         if(!user || !validateHash(password, user.password)) return res.status(400).send({ status: 'error', error: 'Unauthorized' })
//         req.user = user
//         const token = jwt.sign(user, 'secret', {expiresIn: 60 * 60})
//         res.json({status: 'success', payload: {user, token}})
//     } catch (error) {
//         console.log(error);
//     }
// });

router.post('/register', passport.authenticate('register', {session:false}), UserController.register)

router.post('/login', passport.authenticate('login', {session:false}), UserController.login)

router.get('/perfil',passport.authenticate('current', {session:false}), UserController.loadProfile)

router.get('/current', passport.authenticate('current', {session:false}), UserController.current)

router.get('/logout', UserController.logout)

