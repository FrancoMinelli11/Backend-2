import express from 'express'
import mongoose from 'mongoose'
import { config } from './config/config.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { initializePassport } from './config/passport.config.js'
import methodOverride from 'method-override'
import cors from 'cors'
import { router as sessionRouter } from './routes/session.router.js'
import { router as productRouter } from './routes/product.router.js'
import { router as cartRouter } from './routes/cart.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('backend/src/public'))
initializePassport()
app.use(passport.initialize())
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(cors())

const connect = async () => {
    try {
        await mongoose.connect(config.MONGO_URL, {
            dbName: 'session'
        });
        console.log('Connected to MongoDB')
        app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}!`))
    } catch (error) {
        console.log(error)
    }
};

connect();

app.use('/api/sessions', sessionRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
