// import express
import express from "express";

import {generateToken} from "../controllers/jwtGenerateToken.js";

import {loadTemplate,getCommonMastersList} from "../controllers/common_control.js";

import {getAllExchangeLeads} from "../controllers/sellleads.js";

import {getAllRetailStock, getRetailStockData, saveRetailStatusFields,getRetailStockHistory} from "../controllers/retailInventory.js";

import {getAllBrokerStock} from "../controllers/brokerInventory.js";

import { Logout, generateOTP, resendOTP, validateOTP, validateSession } from "../controllers/login.js";  //, validateOTP, userLogin
 
// init express router
const router = express.Router();

// Generate Token
router.get('/generate_token', generateToken);

// Logout
router.get('/logout', Logout);

// Generate OTP
router.post('/generate_otp', generateOTP);

// Generate OTP
router.post('/resend_otp', resendOTP);

// Login
router.post('/validate_otp', validateOTP);

// Session Exists
router.post('/sess_exists', validateSession);

// Load config Template
router.get('/load_template', loadTemplate);
router.get('/get_common_masters_list', getCommonMastersList);
 
// Get All Product
router.post('/getAllExchangeLeads',getAllExchangeLeads);

router.post('/getAllRetailStock',getAllRetailStock);
router.post('/getRetailStockData',getRetailStockData);
router.post('/getRetailStockHistory',getRetailStockHistory);
router.post('/saveRetailStatusFields',saveRetailStatusFields);

router.post('/getAllBrokerStock',getAllBrokerStock);

// export default router
export default router;