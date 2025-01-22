import express from 'express'
import { createFood, deleteFood, readFoods } from '../controller/food.js'
import { checkAdmin } from '../middleware/role.js'

const router = express.Router()

router.get("/readFoods", readFoods)

router.post("/createFood/:role", checkAdmin, createFood)

router.delete("/:id/:role", checkAdmin, deleteFood)

export default router