import fs from 'fs';

let code = fs.readFileSync('src/controllers/auth.controller.js', 'utf8');

code += `

export const checkUsername = async (req, res) => {
    const { userName } = req.body;
    try {
        if (!userName) {
            return res.status(400).json({ success: false, message: "Username is required" });
        }
        
        const user = await User.findOne({ userName });
        
        if (user) {
            return res.status(200).json({ success: true, available: false, message: "Username is taken" });
        }
        
        return res.status(200).json({ success: true, available: true, message: "Username is available" });
    } catch (error) {
        console.error("Error in checkUsername controller", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const setUsername = async (req, res) => {
    const { userName, email } = req.body;
    try {
        if (!userName || !email) {
            return res.status(400).json({ success: false, message: "Username and email are required" });
        }
        
        // First check if username is taken
        const existingUsername = await User.findOne({ userName });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: "Username is already taken" });
        }
        
        // Update user
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { userName } },
            { new: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        return res.status(200).json({ success: true, message: "Username set successfully", user: updatedUser });
    } catch (error) {
        console.error("Error in setUsername controller", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const googleAuth = async (req, res) => {
    const { email, name } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        
        let user = await User.findOne({ email });
        
        if (!user) {
            // New user, create them without username
            // They will be redirected to set username on frontend
            user = new User({
                email,
                userName: \`user_\${Date.now()}\`, // temporary username
                userRole: "EMPLOYEE",
            });
            await user.save();
        }
        
        generateToken(user._id, res);
        
        // If username starts with user_, they haven't set a real username yet
        const needsUsername = user.userName.startsWith('user_');
        
        return res.status(200).json({ 
            success: true, 
            message: "Authentication successful",
            user,
            needsUsername
        });
    } catch (error) {
        console.error("Error in googleAuth controller", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
`;

fs.writeFileSync('src/controllers/auth.controller.js', code);
console.log("Auth controller updated");
