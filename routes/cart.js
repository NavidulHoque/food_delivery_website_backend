import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controller/cart.js'

const router = express.Router()

router.get("/get/:userID", getCart)

router.post("/add/:userID/:food", addToCart)

router.post("/remove/:userID/:food", removeFromCart)

export default router