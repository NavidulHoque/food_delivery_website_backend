import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDatabase from './config/connectDatabase.js'
import { FRONTEND_URL, ADMIN_URL, PORT } from './config/config.js'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import foodRoute from './routes/food.js'
import cartRoute from './routes/cart.js'
import orderRoute from './routes/order.js'
import { createServer } from 'node:http';
import { Server } from "socket.io"
import socketEvents from './socketEvents.js'

const app = express()

// socket connection
const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        credentials: true
    }
})

socketEvents(io)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: [FRONTEND_URL, ADMIN_URL],
    credentials: true
}))


app.use(cookieParser())
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/food", foodRoute)
app.use("/cart", cartRoute)
app.use("/order", orderRoute)


async function startServer() {

    await connectDatabase()

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startServer()