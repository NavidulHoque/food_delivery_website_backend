import express from 'express'
import { getCart, updateCart } from '../controller/cart.js'

const router = express.Router()

router.get("/get/:userID", getCart)

router.put("/update/:userID", updateCart)

export default router