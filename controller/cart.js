import { User } from './../models/User.js'

export const getCart = async (req, res) => {

    const { userID } = req.params

    try {

        const user = await User.findById(userID)

        return res.json({
            status: true,
            cart: user.cart
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

export const addToCart = async (req, res) => {

    const { userID, food } = req.params

    try {
        const {cart} = await User.findById(userID)

        cart[food] = (cart[food] || 0) + 1;

        await User.findByIdAndUpdate(userID, { cart })

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

export const removeFromCart = async (req, res) => {

    const { userID, food } = req.params

    try {

        const {cart} = await User.findById(userID)

        if (cart[food] === 0) {

            return res.json({
                status: false,
                message: "The requested food is not available in the cart"
            })
        }

        cart[food] = cart[food] - 1;

        if (cart[food] === 0) {
            delete cart[food]
        }

        await User.findByIdAndUpdate(userID, { cart })

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