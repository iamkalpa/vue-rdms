import dbcon from "../config/database.js";
export const getAllSellleads = (result) => {
    dbcon.query("SELECT * FROM sellleads order by id desc limit 0,10 ", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}