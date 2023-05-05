// import connection
import db from "../config/database.js";

// send otp to user 
export const sendOTP = (mobile, result) => {
    //console.log('databsee',mobile);return false;
    db.query("SELECT * FROM dealer_group_executives where active= 'y' and mobile = ?", [mobile], (err, results) => {   
    //db.query("SELECT * FROM dealer_group_executives where active= 'y' and mobile = 9999999999", (err, results) => {          
        if(err) {
            console.log(err);
            result(err, null);
        } else {
           // console.log(results,'  dfdfs')
            result(null, results);
        }
    });   
}


// user login
export const userLogin = (mobile, result) => {
    //console.log('databsee',mobile);return false;
    db.query("SELECT * FROM dealer_group_executives where active= 'y' and mobile = ?", [mobile], (err, results) => {          
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            //console.log(results,'  dfdfs')
            result(null, results);
        }
    });   
}