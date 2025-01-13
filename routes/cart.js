import express from 'express'
import { getCart, updateCart } from '../controller/cart.js'

const router = express.Router()

router.post("/get", getCart)

router.put("/update", updateCart)

export default router