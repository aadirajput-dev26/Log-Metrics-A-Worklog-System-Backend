import { ActivityRecord } from "../models/activityRecord.js";
import { WorkDay } from "../models/workDay.js";

export const createActivityRecord = async (req, res) => {
    const { workDayId, startTime, endTime, description, activityType } = req.body;
    
    try{
        // check if all the fields are present 
        if(!workDayId || !startTime || !endTime || !description || !activityType){
            return res.status(400).json({ message : "All fields are required" });
        }
        
        // create activity record
        const activityRecord = await ActivityRecord.create({
            workDayId,
            startTime,
            endTime,
            description,
            activityType
        });
        
        return res.status(201).json({ message : "Activity record created successfully", activityRecord });
    } catch (error) {
        console.log("Error in createActivityRecord controller:", error);
        return res.status(500).json({ message : "Internal Server Error" });
    }
}

export const getActivityRecords = async (req, res) => {
    const userId = req.userId; // from JWT middleware
    const { workDate } = req.query; // from query params

    try {
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
            
        if (!workDate) {
            return res.status(400).json({ message: "Date is required in query params" });
        }

        // find the workDay for this user and date
        const workDay = await WorkDay.findOne({ userId, workDate });
        if (!workDay) {
            return res.status(404).json({ message: "No work day found for given date" });
        }

        // get activity records linked to this workDay
        const activityRecords = await ActivityRecord.find({ workDayId: workDay._id });

        return res.status(200).json({ message: "Activity records fetched successfully", activityRecords});

    } catch (error) {
        console.log("Error in getActivityRecords controller:", error);
        return res.status(500).json({ message : "Internal Server Error" });
    }
}

export const updateActivityRecord = async (req, res) => {
    const activityRecordId = req.params.id;
    const description = req.body.description;
    
    try {
        if (!activityRecordId) {
            return res.status(400).json({ message: "Activity record ID is required" });
        }
        
        // find the activity record
        const updatedActivityRecord = await ActivityRecord.findByIdAndUpdate(activityRecordId, { $set : { description } }, { returnDocument : "after" });
        
        if (!updatedActivityRecord) {
            return res.status(404).json({ message: "Activity record not found" });
        }
        
        return res.status(200).json({ message: "Activity record updated successfully", updatedActivityRecord });
    } catch (error) {
        console.log("Error in updateActivityRecord controller:", error);
        return res.status(500).json({ message : "Internal Server Error" });
    }
}