import mongoose from "mongoose";

const { Schema } = mongoose

const OrderSchema = new Schema({

    foodItems: {
        type: Array,
        required: [true, 'Items are required']
    },

    totalPrice: {
        type: Number,
        required: [true, 'price is required']
    },

    customerDetails: {
        type: Object,
        required: [true, 'address is required']
    },

    status: {
        type: String,
        default: "Food is processing"
    },

    date: {
        type: Date,
        default: Date.now()
    },

    paymentType: {
        type: String,
        required: true
    },

    isPaymentDone: {
        type: Boolean,
        default: false
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

export const Order = mongoose.model('Order', OrderSchema)