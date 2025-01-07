import mongoose from "mongoose";

const { Schema } = mongoose

const FoodSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },

    image: {
        type: String,
        required: [true, 'photo is required']
    },

    price: {
        type: Number,
        required: [true, 'price is required']
    },

    description: {
        type: String,
        required: [true, 'description is required'],
        trim: String
    },

    category: {
        type: String,
        required: [true, 'category is required'],
        trim: true
    }
})

export const Food = mongoose.models.Food || mongoose.model('Food', FoodSchema)