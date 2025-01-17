import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema } = mongoose

const UserSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },

    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minLength: [1, 'Username must be at least 1 characters long'],
        maxLength: [39, 'Username cannot exceed 39 characters']
    },

    password: {
        type: String,
        default: ""
    },

    photo: {
        type: String,
        default: ""
    },

    provider: {
        type: String,
        required: [true, 'Provider is required'],
        trim: true
    },

    cart: {
        type: Object,
        default: {}
    },

    role: {
        type: String,
        required: [true, "Role is required"],
        trim: true
    }

    // {minimize: false} defines that if it is not given then cart's empty object won't be created
}, {minimize: false})

UserSchema.pre('save', async function (next) {

    if (this.password) {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
    }
    
    next()
})

UserSchema.methods.comparePassword = async function (plainPassword, hashedPassword) {

    const isMatched = await bcrypt.compare(plainPassword, hashedPassword)

    return isMatched
}

export const User = mongoose.models.User || mongoose.model('User', UserSchema)