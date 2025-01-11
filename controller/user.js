import { User } from "../models/User.js"

export const readUser = async (req, res) => {

    const {email, provider} = req.body

    try {

        const user = await User.findOne({email, provider})

        const {username, photo, cart} = user

        return res.json({
            status: true,
            user: {email, username, photo, provider, cart}
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