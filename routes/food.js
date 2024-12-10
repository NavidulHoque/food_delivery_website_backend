import express from 'express'
import { createFood, deleteFood, readFoods } from '../controller/food.js'

const router = express.Router()

router.get("/readFoods", readFoods)

router.post("/createFood", createFood)

router.delete("/deleteFood", deleteFood)

export default router