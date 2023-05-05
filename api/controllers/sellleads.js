import { getAllSellleads } from "../models/sellleadsModel.js";
export const getAllExchangeLeads = (req, res) => {
    getAllSellleads((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.send({"status":1,"records":results,"nxt_pg":0,"nxt_min":0});
        }
    });
}