import fs from 'fs';

let code = fs.readFileSync('src/controllers/workDay.controller.js', 'utf8');
code += `

export const getTodayWorkDay = async (req, res) => {
    const userId = req.userId;
    const today = new Date();
    const workDate = \`\${today.getFullYear()}-\${String(today.getMonth() + 1).padStart(2, '0')}-\${String(today.getDate()).padStart(2, '0')}\`;

    try {
        let workDay = await WorkDay.findOne({ workDate, userId });
        
        if (!workDay) {
            const dayStartTime = \`\${String(today.getHours()).padStart(2, '0')}:\${String(today.getMinutes()).padStart(2, '0')}\`;
            workDay = await WorkDay.create({
                userId,
                workDate,
                dayStatus: "OPEN",
                dayStartTime
            });
        }
        
        return res.status(200).json({ message: "Work day fetched successfully", workDay });
    } catch (error) {
        console.error("Error in getTodayWorkDay controller", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const endWorkDay = async (req, res) => {
    const userId = req.userId;
    const today = new Date();
    const workDate = \`\${today.getFullYear()}-\${String(today.getMonth() + 1).padStart(2, '0')}-\${String(today.getDate()).padStart(2, '0')}\`;
    const dayEndTime = \`\${String(today.getHours()).padStart(2, '0')}:\${String(today.getMinutes()).padStart(2, '0')}\`;

    try {
        const updatedWorkDay = await WorkDay.findOneAndUpdate(
            { workDate, userId, dayStatus: "OPEN" },
            { $set: { dayStatus: "CLOSED", dayEndTime } },
            { returnDocument: "after" }
        );

        if (!updatedWorkDay) {
            return res.status(400).json({ message: "Work day not found or already closed" });
        }

        return res.status(200).json({ message: "Work Day closed successfully", workDay: updatedWorkDay });
    } catch (error) {
        console.error("Error in endWorkDay controller", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}`;
fs.writeFileSync('src/controllers/workDay.controller.js', code);
console.log('Controller updated');
