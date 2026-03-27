import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
    const { email, userName, password , product , role } = req.body;

    try{
        // check if all the required fields are provided
        if(!email || !userName || !password || !product || !role){
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        // check if password length is more than 8 characters
        if(password.length < 8){
            return res.status(400).json({success: false, message: "Password must be at least 8 characters long"});
        }

        // check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success: false, message: "Invalid email"});
        }

        // check if the user already exists
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({success: false, message: "User already exists"});
        }

        // store the password in hashed manner
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            product,
            role
        })

        // if new user is created, then create a new token for other api to run
        if(newUser){
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                message : "User created successfully",
                success : true,
            })
        } else {
            return res.status(400).json({
                success : false,
                message : "User not created"
            })
        }
    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({
            success: false, 
            message: "Internal server error"
        });
    }
}

export const login = async (req, res) => {
    const { userName, password } = req.body;

    try{
            // check if both the fields are present or not
        if(!userName || !password){
            return res.status(400).json({ message : "All the fields are required" });
        } 

        // check if user exists
        const user = await User.findOne({ userName });
        if(!user){
            return res.status(400).json({ message : "Invalid credentials" });
        }

        // check if the password is correct or not
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message : "Invalid credentials" });
        }

        // generate token
        generateToken(user._id, res);

        // send response
        res.status(200).json({
            message : "User logged in successfully",
            success : true,
        })
    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({
            success: false, 
            message: "Internal server error"
        });
    }
}

export const logout = async (_ , res) => {
    try{
        res.clearCookie("token");
        res.status(200).json({
            message : "User logged out successfully",
            success : true,
        })
    } catch (error) {
        console.log("Error in logout controller", error);
        res.status(500).json({
            success: false, 
            message: "Internal server error"
        });
    }
}