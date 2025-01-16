import { io } from "../index.js"
import { Order } from "../models/Order.js"
import { User } from "../models/User.js"


export const placeOrder = async (req, res) => {

    const { foodItems, totalPrice, customerDetails, paymentType, userID } = req.body

    try {

        const newOrder = new Order({
            foodItems,
            totalPrice,
            customerDetails,
            paymentType,
            userID
        })

        await newOrder.save()

        await User.findByIdAndUpdate(userID, {cart: {}}, {new: true})

        io.emit('orderCreated')

        return res.json({
            status: true
        })
    }

    catch (error) {

        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please try again"
        })
    }
}

export const updateDeliveryStatus = async (req, res) => {

    const { id, status } = req.body

    try {

        if (status === "Delivered") {
            await Order.findByIdAndUpdate(id, { status, isPaymentDone: true })
        }

        else{
            await Order.findByIdAndUpdate(id, { status })
        }

        io.emit('updateOrderStatus')

        return res.json({
            status: true
        })
    }

    catch (error) {

        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please try again"
        })
    }
}

export const readUserOrders = async (req, res) => {

    const { id } = req.params

    try {

        const userOrders = await Order.find({ userID: id })

        if (userOrders.length === 0) {

            return res.json({
                status: false,
                orders: [],
                message: "No Orders to show"
            })
        }

        const orders = await Promise.all(userOrders.map(async (userOrder) => {

            const { _id, foodItems, totalPrice, status } = userOrder

            return { id: _id.toString(), foodItems, totalPrice, status }
        }))

        return res.json({
            status: true,
            orders: orders.reverse()
        })
    }

    catch (error) {

        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please reload the page"
        })
    }
}

export const readAllOrders = async (req, res) => {

    try {

        const allOrders = await Order.find({})

        if (allOrders.length === 0) {

            return res.json({
                status: false,
                message: "No Orders to show"
            })
        }

        const orders = await Promise.all(allOrders.map(async (allOrder) => {

            const { _id, foodItems, totalPrice, customerDetails, status } = allOrder

            return { id: _id.toString(), foodItems, totalPrice, customerDetails, status }
        }))

        return res.json({
            status: true,
            orders: orders.reverse()
        })
    }

    catch (error) {

        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please reload the page"
        })
    }
}