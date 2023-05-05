import dbcon from "../config/database.js";
export const loadMasters = (result) => {
    let masters=[];
    dbcon.query("SELECT * FROM states where active != 'n' order by state asc", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            masters['states']=results;
        }
    });
    dbcon.query("SELECT * FROM states where active != 'n' order by state asc", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            masters['states']=results;
        }
    });
    dbcon.query("SELECT * FROM states where active != 'n' order by state asc", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            masters['states']=results;
        }
    });
    result(null, masters);   
}