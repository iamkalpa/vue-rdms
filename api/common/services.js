import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import CryptoJS from 'crypto-js';
import redis_client from "../config/redis.js";
import nodemailer from "nodemailer";


var transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});

//Crypto Encryption
export function crypto_encryption(vdata){
    let key= CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
    let iv= CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);
    let encrypted = CryptoJS.AES.encrypt(vdata, key, {iv:iv});
    encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    return encrypted;
}

//Crypto Decryption
export function crypto_decryption(enc_data){
    let key= CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
    let iv= CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);
    let decrypted = CryptoJS.AES.decrypt(enc_data, key, { iv: iv });
    let dec_data = decrypted.toString(CryptoJS.enc.Utf8);
    return dec_data;
}


//generate jwt token
export  function generateToken(req=''){
    let jwtSecretKey =process.env.JWT_SECRET_KEY
    let data = {
        userId: 12,
        exp: Math.floor(Date.now() / 1000) + (1 * 60),
    }
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}

//validate jwt token
export function validateToken(req){
    try {
        let jwtSecretKey=process.env.JWT_SECRET_KEY
        const token = req.headers['authorization'];
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return 1;
        }else{
            // Access Denied
            return 0;
        }
    } catch (error) {
        // Access Denied
        return 0;
    }
}

//get Redis data
export async function getRedis(rkey){
    let rs=await redis_client.hGetAll(rkey);
    return rs.otp;
 }


 //send Email
export  function sendMail(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return info.response;
        }
    }); 
}