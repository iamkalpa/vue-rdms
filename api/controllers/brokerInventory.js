import { getAllBrokerInventory } from "../models/brokerInventoryModel.js";
export const getAllBrokerStock = (req, res) => {
    getAllBrokerInventory((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.send({"status":1,"records":results,"nxt_pg":0,"nxt_min":0});
        }
    });
}