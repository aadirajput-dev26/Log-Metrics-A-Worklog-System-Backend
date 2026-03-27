import { User } from "../models/user.js"

export const getUserProfile = async (req , res) => {
    const userId = req.userId;

    try{
        // check if userId is present
        if(!userId){
            return res.status(400).json({ message : "UserId not provided" });
        }

        const userProfile = await User.findById(userId).select("-password");
        
        if(!userProfile){
            return res.status(400).json({ message : "User does not exists" });
        }

        return res.status(200).json({ message : "User Profile get successfully" , userProfile });
    } catch (error) {
        console.log("Error in getUserProfile controller");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addCustomDescription = async (req, res) => {
  const userId = req.userId; // from JWT middleware
  const { description } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }
    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "Description is required" });
    }

    // update user by pushing new description
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { customDescriptions: description } },
      { returnDocument : "after" } // return updated document
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Custom description added successfully",
      userProfile: updatedUser
    });
  } catch (error) {
    console.error("Error in addCustomDescription controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};