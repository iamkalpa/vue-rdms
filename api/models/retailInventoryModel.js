import dbcon from "../config/database.js";
export const getAllRetailInventory = (result) => {
    dbcon.query("SELECT * FROM inventory order by id desc limit 0,10 ", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
export const getRetailInventoryData = (mystock_edit_id,result) => {
    dbcon.query("SELECT * FROM inventory where id = ?", [mystock_edit_id], (err, results) => {        
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
export const getRetailStockHistoryData = (mystock_edit_id,result) => {
    dbcon.query("SELECT * FROM inventory_status_history where inventory_id = ? order by id asc", [mystock_edit_id], (err, results) => {        
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
export const saveRetailStatusData = (rdata,result) => {
    //console.log(rdata);return false;
    var upd_query = 'UPDATE inventory SET q1 = ?, q1 =?, q3 =?, q4 =?, refurb_date =?, car_listing_price =?, certification_date =?, status_remarks =?  WHERE id=?';
    dbcon.query(upd_query,[rdata.q1,rdata.q2,rdata.q3,rdata.q4,rdata.refurb_date,rdata.car_listing_price,rdata.certification_date,rdata.status_remarks,rdata.mystock_edit_id], function (err, results, rows, fields) {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(results);
            result(null, results);
        }
    });   
}
export const updateRetailStatusData = (rdata,result) => {
    //console.log(rdata);return false;
    var upd_query = 'UPDATE inventory SET status = ?,prev_status = ?, u_date =?  WHERE id=?';
    dbcon.query(upd_query,[rdata.new_status,rdata.status,rdata.u_date,rdata.mystock_edit_id], function (err, results, rows, fields) {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(results);
            result(null, results);
        }
    });   
}
export const saveRetailStockData = (rdata,result) => {
    console.log(rdata);return false;
    var ins_qry = "INSERT INTO customers (name, address) VALUES ?";
    var values = ['',''];
    dbcon.query(ins_qry, [values], function (err, result) {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, result);
        }
    });   
}