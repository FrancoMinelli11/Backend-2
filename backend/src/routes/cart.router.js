import { Router } from "express";
import {authUser} from "../middlewares/auth.js";
import passport from "passport";
import { CartController } from "../controllers/cart.controller.js";
export const router = Router()

router.get('/',passport.authenticate('current', {session:false}),authUser,CartController.getCart)

router.put('/:cid/product/:pid',passport.authenticate('current', {session:false}),authUser,CartController.updateCart)

router.post('/:cid/purchase',passport.authenticate('current', {session:false}),authUser,CartController.purchaseCart)