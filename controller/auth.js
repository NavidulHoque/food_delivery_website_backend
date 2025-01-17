import { SECRET } from '../config/config.js';
import { User } from './../models/User.js'
import jwt from 'jsonwebtoken'

export const createAnUser = async (req, res) => {
    const { username, email, password, provider, photo, role } = req.body

    try {

        const user = await User.findOne({ email, provider, role });

        if (provider === "credentials") {

            if (user) {
                return res.json({
                    status: false,
                    message: "Email already exists"
                })
            }

            const newUser = new User({ username, email, password, provider, role })

            await newUser.save()

            return res.json({
                status: true,
                message: "Account created successfully"
            })
        }

        else if (provider === "google" || provider === "github") {

            if (!user) {

                const newUser = new User({ username, email, provider, photo, role })

                await newUser.save()

                res.json({
                    status: true
                })
            }

            else {

                res.json({
                    status: true
                })
            }
        }
    }

    catch (error) {

        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please try again"
        })
    }
}

export const loginAnUser = async (req, res) => {

    const { email, password, role } = req.body

    try {

        const user = await User.findOne({ email, provider: "credentials", role })

        if (!user) {
            return res.json({
                status: false,
                message: "Email invalid, create an account first"
            })
        }

        const isMatched = await user.comparePassword(password, user.password)

        if (!isMatched) {
            return res.json({
                status: false,
                message: "Password invalid"
            })
        }

        const { provider, username, photo, _id } = user

        return res.json({
            status: true,
            user: { id: _id.toString(), email, provider, username, photo, role }
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

export const protect = async (req, res, next) => {

    const token = req.cookies.token

    console.log(token)

    if (!token) {
        return res.json({
            status: false,
            message: "No token provided, please login"
        })
    }

    jwt.verify(token, SECRET, async (err) => {

        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.json({
                    status: false,
                    message: "Token expired, please login again"
                })
            }

            return res.json({
                status: false,
                message: "Invalid token, please login again"
            })
        }

        next()
    })
}
