import { User } from './../models/User.js'

export const getCart = async (req, res) => {

    const { email, provider } = req.body

    try {

        const user = await User.findOne({ email, provider })

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
            message: "Something went wrong, please reload the page"
        })
    }
}

export const updateCart = async (req, res) => {

    const { email, provider, cart } = req.body

    try {

        await User.findOneAndUpdate({ email, provider }, { cart })
        
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

export const addToCart = async (req, res) => {

    const { email, provider, food } = req.body

    try {
        const {cart} = await User.findOne({ email, provider })

        cart[food] = (cart[food] || 0) + 1;

        await User.findOneAndUpdate({ email, provider }, { cart })

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

    const { email, provider, cart, food } = req.body

    try {

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

        await User.findOneAndUpdate({ email, provider }, { cart })

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