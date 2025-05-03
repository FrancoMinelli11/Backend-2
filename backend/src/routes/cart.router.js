import { Router } from "express";
import passport from "passport";
import { CartController } from "../controllers/cart.controller.js";
export const router = Router()

router.get('/',passport.authenticate('current', {session:false}),CartController.getCart)

router.put('/add',passport.authenticate('current', {session:false}),CartController.updateCart)