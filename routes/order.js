import express from 'express'
import { placeOrder, readAllOrders, readUserOrders, updateDeliveryStatus } from '../controller/order.js'

const router = express.Router()

router.post("/place", placeOrder)
router.put("/update", updateDeliveryStatus)
router.get("/userOrders/:id", readUserOrders)
router.get("/allOrders", readAllOrders)

export default router