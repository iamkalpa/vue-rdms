import { getAllRetailInventory,getRetailStockHistoryData,getRetailInventoryData,saveRetailStatusData } from "../models/retailInventoryModel.js";
import { generateToken, validateToken}  from '../common/services.js'; 

export const getAllRetailStock = (req, res) => {
    getAllRetailInventory((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.send({"status":1,"records":results,"nxt_pg":0,"nxt_min":0});
        }
    });
}
export const getRetailStockData = (req, res) => {
    var token= req.query.token;
    if(token==''){
        let resp = {
            status: "fail",
            error: "Token Error",
            token: generateToken()
        }
        res.send(resp);
    }
    let mystock_edit_id=req.query.my_stock_edit_id;
    getRetailInventoryData(mystock_edit_id,(err, results) => {
        if (err){
            res.send(err);
        }else{
            res.send({"status":"success","record":results});
        }
    });
}
export const getRetailStockHistory = (req, res) => {
    var token= req.query.token;
    if(token==''){
        let resp = {
            status: "fail",
            error: "Token Error",
            token: generateToken()
        }
        res.send(resp);
    }
    let mystock_edit_id=req.query.my_stock_edit_id;
    getRetailStockHistoryData(mystock_edit_id,(err, results) => {
        if (err){
            res.send(err);
        }else{
            res.send({"status":"success","status_history":results,"token":generateToken()});
        }
    });
}
export const saveRetailStatusFields = (req, res) => {
    var token= req.query.token;
    if(token==''){
        let resp = {
            status: "fail",
            error: "Token Error",
            token: generateToken()
        }
        res.send(resp);
    }
    let rdata=[];
    rdata=req.body;
    rdata['mystock_edit_id'] = req.query.my_stock_edit_id;
    //console.log(req);return false;
    //let mystock_edit_id=req.query.my_stock_edit_id;
    saveRetailStatusData(rdata,(err, results) => {
        if (err){
            res.send(err);
        }else{
            res.send({"status":"success","record":results});
        }
    });
}