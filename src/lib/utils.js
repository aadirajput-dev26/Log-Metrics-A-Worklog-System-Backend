import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET, {
        expiresIn : "3d"
    });

    res.cookie("jwt" , token, {
        httpOnly : true, // prevent XSS attacks: cross-sites attack
        secure : process.env.NODE_ENV === "development" ? false : true,
        sameSite : "none", // required for cross-origin cookie support
        maxAge : 3 * 24 * 60 * 60 * 1000 // 7 days in ms
    });

    return token;
}