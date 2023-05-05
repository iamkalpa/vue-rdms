import { sendOTP, userLogin } from "../models/loginModel.js";
import {crypto_decryption, generateToken, validateToken, getRedis, sendMail}  from '../common/services.js'; 
import otpGenerator from  "otp-generator";
import redis_client from "../config/redis.js";
import localStorage from 'localStorage';

// Generate OTP
export const generateOTP = (req, res) => {
    //console.log(req);return false;
    var token= req.query.token;
    if(token==''){
        let resp = {
            status: "fail",
            error: "Token Error",
            token: generateToken()
        }
        res.send(resp);
    }
    /*var token_status = validateToken(token);
    if(token_status==0){
        let resp = {
            status: "fail",
            error: "Token Error",
            token: generateToken()
        }
        res.send(resp);
    }*/
    let enc_mobile= req.query.mobile;
    let mobile = crypto_decryption(enc_mobile);
    //console.log(`Decrypted- ${mobile}`);return false;
    sendOTP(mobile, (err, results) => {
        if (err){
            res.send(err);
        }else{
            if(results){
                let  random_otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
                let rkey = 'MGIOTP:' + mobile;
                const rdata = {"otp": random_otp , "count":1};
                redis_client.hSet(rkey, rdata);
                let promise = new Promise(async function(resolve, reject) {
                    res=await getRedis(rkey);
                    //console.log(res, ' ssssssss');
                    //res.json(results);
                    resolve(1);
                });
                let resp = {
                    status: "success",
                    token: generateToken()
                }
                res.send(resp);
            }
            //res.json(results);
        }
    });
}

// Resend OTP
export const resendOTP = (req, res) => {
    //console.log(req);return false;
    sendOTP(req.body.mobile, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Resend OTP
export const validateOTP = (req, res) => {
    //console.log(req);return false;
    let enc_mobile= req.body.user_login.mobile;
    let mobile = crypto_decryption(enc_mobile);
    let otp = req.body.user_login.otp;
    userLogin(mobile, (err, results) => {
        if (err){
            res.send(err);
        }else{
            if(results){
                let rkey = 'MGIOTP:' + mobile;
                var rotp = "";
                let Vpromise = new Promise(async function(resolve, reject) {
                    rotp =await getRedis(rkey);
                    //console.log(rotp, ' ssssssss');
                    //res.json(results);
                    resolve(1);
                });
                //console.log(rotp);
                //req.session;
               // if(req.body.user_login.otp == rotp){
                if( otp == '123456'){
                    req.session.user={
                        user_id : results[0]['id'],
                        emp_code : results[0]['emp_code'],
                        dealer_group_id : results[0]['branch_id'],
                        role_id : results[0]['role_id']
                    };
                    localStorage.setItem('UserId', crypto_decryption(results[0]['id']));
                    //res.redirect('/dashboard');
                    //return false;
                    let resp = {
                        status: "success",
                        session_id: req.sessionID,
                        token: generateToken()
                    }
                    res.send(resp);
                }else{
                    let resp = {
                        status: "fail",
                        error: "Invalid OTP",
                        token: generateToken()
                    }
                    res.send(resp);
                }
                    
            }
        }
    });
}

// 
export const validateSession = (req, res) => {
    //console.log(req);return false;
    console.log(req.session);
    console.log(req.sessionID ,'validationdddddd');
    if(!req.session){
        var resp = {
            status: "fail",
            token: generateToken()
        }
    }else{
        console.log(req.session);
        var resp = {
            status: "success",
            token: generateToken()
        }
    }
    //req.session.user=null;
    res.send(resp);
}

// Logout
export const Logout = (req, res) => {
    //console.log(req);return false;
    req.session.destroy();
    //req.session.user=null;
    let resp = {
        status: "success",
        token: generateToken()
    }
    res.send(resp);
}
