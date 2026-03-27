import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    }, 
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    product : {
        type : String,
        required : true
    },
    userRole : {
        type: String,
        enum: ["MANAGER", "INTERN", "EMPLOYEE"],
        default: "EMPLOYEE",
        required: true,
    },
    customDescriptions : {
        type : Array,
        default : []
    }
}, {
    timestamps : true
});

export const User = mongoose.model("User", userSchema);