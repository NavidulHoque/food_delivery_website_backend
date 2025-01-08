import express from 'express'
import { readUser } from './../controller/user.js';

const router = express.Router()

router.get("/read/:id", readUser)

export default router