import { io } from "../index.js"
import { Order } from "../models/Order.js"


export const placeOrder = async (req, res) => {

    const { items, amount, address, paymentType, payment, userID } = req.body

    try {

        const newOrder = new Order({
            items,
            amount,
            address,
            paymentType,
            payment,
            userID
        })

        await newOrder.save()

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

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true })

        const { _id, items, amount } = updatedOrder

        io.emit('updateDeliveryStatus', { id: _id.toString(), items, amount, status })

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

        let userOrders = await Order.find({ userID: id })

        if (userOrders.length === 0) {

            return res.json({
                status: false,
                message: "No Orders to show"
            })
        }

        userOrders = await Promise.all(userOrders.map(async (userOrder) => {

            const { _id, items, amount, status } = userOrder

            return { id: _id.toString(), items, amount, status }
        }))

        return res.json({
            status: true,
            userOrders
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

        let allOrders = await Order.find({})

        if (allOrders.length === 0) {

            return res.json({
                status: false,
                message: "No Orders to show"
            })
        }

        allOrders = await Promise.all(allOrders.map(async (allOrder) => {

            const { _id, items, amount, address, status } = allOrder

            return { id: _id.toString(), items, amount, address, status }
        }))

        return res.json({
            status: true,
            allOrders
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