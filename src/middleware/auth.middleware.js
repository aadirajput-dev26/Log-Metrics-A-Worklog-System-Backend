import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        
        // If not in cookies, check Authorization header
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        
        // check if the token is present
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId).select("-password");

        // check if the user exists
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}