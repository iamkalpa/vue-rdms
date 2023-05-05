import {loadMasters} from "../models/commonControlModel.js";
export const loadTemplate = (req, res) => {
    res.sendFile('/xampp/htdocs/vue-rdms-project/templates/config_mystock_status_sub_template_v3.js');
}
export const getCommonMastersList = (req, res) => {
    var token= req.query.token;
    if(token==''){
        let resp = {
            status: "fail",
            error: "Token Error",
            token: generateToken()
        }
        res.send(resp);
    }
    loadMasters((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.send({"status":1,"records":results,"nxt_pg":0,"nxt_min":0});
        }
    });
}