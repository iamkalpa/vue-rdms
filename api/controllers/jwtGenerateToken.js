import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
export const generateToken = (req, res) => {
    let jwtSecretKey =process.env.JWT_SECRET_KEY
    let data = {
        userId: 12,
        exp: Math.floor(Date.now() / 1000) + (1 * 60),
    }
    const token = jwt.sign(data, jwtSecretKey);
    let result = {
        status: "success",
        token: token
    }
    res.send(result);
}