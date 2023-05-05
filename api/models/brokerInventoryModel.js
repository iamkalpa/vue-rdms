import dbcon from "../config/database.js";
export const getAllBrokerInventory = (result) => {
    dbcon.query("SELECT * FROM broker_inventory order by id desc limit 0,10 ", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}