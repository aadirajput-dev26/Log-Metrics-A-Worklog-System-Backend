import mongoose from "mongoose";

const workDaySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    workDate : {
        type : Date,
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
        type : String,
        required : true
    }
}, {
    timestamps : true
});

const WorkDay = mongoose.model("WorkDay", workDaySchema);
export default WorkDay;