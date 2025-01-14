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
