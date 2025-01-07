import mongoose from "mongoose";

const { Schema } = mongoose

const OrderSchema = new Schema({

    items: {
        type: Array,
        required: [true, 'Items are required']
    },

    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },

    address: {
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

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)