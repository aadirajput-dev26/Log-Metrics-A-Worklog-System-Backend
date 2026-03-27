import mongoose from "mongoose";

const workDaySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    workDate : {
        type : String,
        required : true
    },
    dayStatus : {
        type : String, 
        enum : ["OPEN" , "CLOSED"],
        default : "OPEN",
        required : true
    },
    dayStartTime : {
        type : String,
        required : true
    },
    dayEndTime : {
        type : String
    }
}, {
    timestamps : true
});

export const WorkDay = mongoose.model("WorkDay", workDaySchema);