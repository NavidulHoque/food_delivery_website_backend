import { User } from './../models/User.js'

export const getCart = async (req, res) => {

    const { userID } = req.params

    try {

        const user = await User.findById(userID)

        if (!user) {
            return res.json({
                status: false,
                message: "Cart not found"
            })
        }

        return res.json({
            status: true,
            cart: user.cart
        })
    }

    catch (error) {

        console.error(error)

        return res.json({
            status: false,
            error
        })
    }
}

export const updateCart = async (req, res) => {

    const { cart } = req.body
    const { userID } = req.params

    try {

        await User.findByIdAndUpdate(userID, { cart })

        return res.json({
            status: true
        })
    }

    catch (error) {
        console.error(error)

        return res.json({
            status: false,
            error
        })
    }
}
