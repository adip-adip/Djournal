
const { number } = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        min: 2,
        max: 50,
        required: true
    },
    googleID: String,
    facebookId: String, 
    appleId: String,
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    activationToken: String,
    activeFor: Date, 
    address: String,  
    role: {
        type: String, 
        enum: ['admin', 'premium','customer'],
        default: "customer"
    },
    status: {
        type: String, 
        enum: ['active','inactive'],
        default: "inactive"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
}, {
    timestamps: true,
    autoIndex: true, 
    autoCreate: true
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel

