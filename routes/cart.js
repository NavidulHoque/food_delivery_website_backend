import express from 'express'
import { addToCart, getCart, removeFromCart, updateCart } from '../controller/cart.js'

const router = express.Router()

router.post("/get", getCart)

router.put("/update", updateCart)

router.put("/addAndUpdate", addToCart)

router.put("/removeAndUpdate", removeFromCart)

export default router