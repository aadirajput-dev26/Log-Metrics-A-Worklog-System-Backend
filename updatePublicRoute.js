import fs from 'fs';

let code = `import express from "express";
import { getPublicLog } from "../controllers/public.controller.js";

const router = express.Router();

router.get("/log/:userName/:date", getPublicLog);

export default router;
`;

fs.writeFileSync('src/routes/public.route.js', code);

let controllerCode = `import { User } from "../models/user.js";
import { WorkDay } from "../models/workDay.js";
import { ActivityRecord } from "../models/activityRecord.js";

export const getPublicLog = async (req, res) => {
    const { userName, date } = req.params;
    
    try {
        // 1. Find user by username
        const user = await User.findOne({ userName }).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        // 2. Find workday by user and date
        const workDay = await WorkDay.findOne({ userId: user._id, workDate: date });
        
        if (!workDay) {
            return res.status(404).json({ success: false, message: "No work log found for this date" });
        }
        
        // 3. Find all activities for this workday
        const activities = await ActivityRecord.find({ workDayId: workDay._id }).sort({ startTime: 1 });
        
        return res.status(200).json({
            success: true,
            data: {
                user: {
                    userName: user.userName,
                    role: user.userRole
                },
                workDay,
                activities
            }
        });
    } catch (error) {
        console.error("Error in getPublicLog controller", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
`;

fs.writeFileSync('src/controllers/public.controller.js', controllerCode);

// update server.js to include the route
let serverCode = fs.readFileSync('server.js', 'utf8');
serverCode = serverCode.replace(
    'import userProfileRoutes from "./src/routes/user.route.js"',
    'import userProfileRoutes from "./src/routes/user.route.js"\nimport publicRoutes from "./src/routes/public.route.js"'
);

serverCode = serverCode.replace(
    'app.use("/api/user" , userProfileRoutes);',
    'app.use("/api/user" , userProfileRoutes);\napp.use("/api/public", publicRoutes);'
);

fs.writeFileSync('server.js', serverCode);

console.log("Public endpoints created");
