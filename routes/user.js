import express from 'express'
import { readUser } from './../controller/user.js';

const router = express.Router()

router.post("/read", readUser)

export default router