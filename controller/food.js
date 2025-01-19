import { io } from "../index.js"
import { Food } from "../models/Food.js"


export const readFoods = async (req, res) => {

    try {
        const foods = await Food.find({})

        return res.json({
            status: true,
            foods
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

export const createFood = async (req, res) => {

    const {name, image, price, description, category} = req.body

    const newFood = new Food({
        name,
        image,
        price,
        description,
        category
    })

    try {
        await newFood.save()

        io.emit('newFood')

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

export const deleteFood = async (req, res) => {

    const { id } = req.params

    try {
        await Food.findByIdAndDelete(id)

        io.emit('deleteFood')

        return res.json({
            status: true,
            message: "Food deleted successfully"
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