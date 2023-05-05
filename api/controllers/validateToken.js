import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
export const validateToken = (req, res) => {
try {
    let jwtSecretKey=process.env.JWT_SECRET_KEY
    const token = req.headers['authorization'];
    const verified = jwt.verify(token, jwtSecretKey);
    if(verified){
        res.send("Successfully Verified");
    }else{
        // Access Denied
        res.status(401).send(error);
    }
} catch (error) {
    // Access Denied
    res.status(401).send(error);
}
}