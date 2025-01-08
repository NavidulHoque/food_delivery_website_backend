import { User } from "../models/User.js"

export const readUser = async (req, res) => {

    const {id} = req.params

    try {

        const user = await User.findById(id)

        const {email, username, photo, provider, cart, role} = user

        return res.json({
            status: true,
            user: {email, username, photo, provider, cart, role}
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