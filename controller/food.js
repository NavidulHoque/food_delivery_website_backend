import { Food } from "../models/food.js"

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
            message: "Something went wrong, please reload the page"
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

export const deleteFood = async (req, res) => {

    const { id } = req.params

    try {
        await Food.findByIdAndDelete(id)

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