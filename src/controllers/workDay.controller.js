import { WorkDay } from "../models/workDay.js";

export const createWorkDay = async (req, res) => {
    const { workDate , dayStatus , dayStartTime , dayEndTime } = req.body;
    const userId = req.userId;

    try{
        // check if all the information is present in the body 
        if(!workDate || !dayStatus || !dayStartTime ){
            return res.status(400).json({ message: "All fields are required" });
        }

        // if the dayStatus is OPEN then dayEndTime should not be provided
        if(dayStatus === "OPEN" && dayEndTime){
            return res.status(400).json({ message: "Day end time should not be provided for open day status" });
        }

        // if the dayStatus is CLOSED then dayEndTime should be provided
        if(dayStatus === "CLOSED" && !dayEndTime){
            return res.status(400).json({ message : "Day end time is required for closed day status" });
        }

        // check if the work date is already present
        const workDay = await WorkDay.findOne({ workDate, userId });
        if(workDay){
            return res.status(400).json({ message: "Work day already exists" });
        }

        // create the work day
        const newWorkDay = await WorkDay.create({
            userId,
            workDate,
            dayStatus,
            dayStartTime,
            dayEndTime
        });

        return res.status(201).json({ message: "Work day created successfully", workDay: newWorkDay });
    } catch (error) {
        console.error("Error in createWorkDay controller", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getWorkDay = async (req, res) => {
    const { workDate } = req.query; // coming from the query params
    const userId = req.userId; 

    try{
        // check if all the information is present in the body 
        if(!workDate){
            return res.status(400).json({ message: "Work date is required" });
        }

        // check if the work date is already present
        const workDay = await WorkDay.findOne({ workDate, userId });
        if(!workDay){
            return res.status(404).json({ message: "Work day not found" });
        }

        return res.status(200).json({ message: "Work day found", workDay });
    } catch (error) {
        console.error("Error in getWorkDay controller", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateWorkDay = async (req , res) => {
    const { dayStatus , dayEndTime , workDate } = req.body;
    const userId = req.userId;

    try{
        // check if the payload fields are present or not
        if(!dayStatus || !dayEndTime){
            return res.status(400).json({ message : "All the fields are required" });
        }

        const updatedWorkDay = await WorkDay.findOneAndUpdate({ workDate, userId }, { $set : { dayStatus , dayEndTime} }, { returnDocument : "after" });

        if(!updatedWorkDay){
            res.status(400).json({ message : "Error in updating dayStatus" });
        }

        res.status(200).json({ message : "Work Day Updated Successfully", updatedWorkDay });
    } catch (error) {
        console.log("Error in updateWorkDay controller:", error);
        res.status(500).json({ message : "Internal Server Error" });
    }
}