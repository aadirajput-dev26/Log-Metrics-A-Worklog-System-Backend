import mongoose from "mongoose";

const activityRecordSchema = new mongoose.Schema({
    workDayId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "WorkDay",
        required : true
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    activityType : {
        type : String, 
        enum : ["TASK" , "BREAK"],
        default : "TASK",
        required : true,
    }
}, {
    timestamps : true
});

export const ActivityRecord = mongoose.model("ActivityRecord", activityRecordSchema);