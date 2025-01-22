import express from 'express'
import { getCart, updateCart } from '../controller/cart.js'
import { checkUser } from '../middleware/role.js'

const router = express.Router()

router.get("/get/:userID/:role", checkUser, getCart)

router.put("/update/:userID/:role", checkUser, updateCart)

export default router