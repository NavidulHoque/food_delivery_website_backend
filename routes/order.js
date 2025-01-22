import express from 'express'
import { placeOrder, readAllOrders, readUserOrders, updateDeliveryStatus } from '../controller/order.js'
import { checkAdmin, checkUser } from '../middleware/role.js'

const router = express.Router()

router.post("/place/:role", checkUser, placeOrder)

router.put("/update/:role", checkAdmin, updateDeliveryStatus)

router.get("/userOrders/:id/:role", checkUser, readUserOrders)

router.get("/allOrders/:role", checkAdmin, readAllOrders)

export default router