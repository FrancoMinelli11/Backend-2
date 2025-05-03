import { Router } from "express";
import { uploader } from "../utilsMulter.js";
import { auth } from "../middlewares/auth.js";
import passport from "passport";
import { ProductController } from "../controllers/product.controller.js";

export const router = Router()

router.post('/createProduct', uploader.single('thumbnail'),passport.authenticate('current', {session:false}),auth,ProductController.createProduct )

router.get('/', ProductController.getProducts)

router.delete('/:pid',passport.authenticate('current', {session:false}),auth,ProductController.deleteProduct)

router.put('/:pid', uploader.single('thumbnail'),passport.authenticate('current', {session:false}),auth,ProductController.updateProduct)