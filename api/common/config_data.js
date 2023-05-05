let selllead_status_list={
	9: "Plan Postponed",
	10: "Fresh",
	20: "Appointment Confirmed",
	30: "Need Price Approval",
	40: "Price Quote pending",
	50: "Under Negotiation",
	60: "Pending Stock in",
	70: "Possession Pending, Documents Pending",
	80: "Possession Pending, Documents Received",
	90: "Possession Done, Documents Pending",
	999: "Possession Done, Documents Received",
	1111: "Auctions",
	7777: "Auctions RC Transfered And Delivered",
	9999: "Closed"
};

let mystock_status_list={
    //"100: "Possession Done, Documents Pending",
    200: "Refurbishment Details Pending",
    300: "Under Certification",
    400: "Need certification approval",
    500: "Ready For Sale",
    600: "Car Booked",
    700: "Pending Stock Out (Docs Pending)",
    800: "Pending Stock Out (No Docs Pending)",
    900: "Car Delivered",
    1000: "RC Transfer Complete",
    1111: "Auctions",
    7777: "Auctions RC Transfered And Delivered"
};

let mystock_b2b_status_list={
    100: "Pocession Done, Documents Pending",
    111: "Ready For Sale",
    222: "Vehicle Booked",
    333: "Vehicle Delivered",
    444: "RC Transfer Completed",
    1111: "Auctions",
    7777: "Auctions RC Transfered And Delivered"
};
    
let buylead_status_list={
    900:"Plan Postponed",
    1000: "Fresh",
    2000: "Appointment Fixed",
    3000: "Test Drive Pending",
    4000: "Under Follow up",
    5000: "Approve Price",
    6000: "Under Booking Process",
    7000: "Car Booked",
    8000: "Pending Stock Out (Docs Pending)",
    9000: "Pending Stock Out (No Docs Pending)",
    10000: "Car Delivered",
    11000: "RC Transferred",
    99999: "Closed",
};

let auctions_status_list={
    1111: "Auctions Pending",
    2222: "Auction in Progress",
    3333: "Successful Bids",
    4444: "Unsold",
    5555: "Stock For Delivery",
    6666: "Delivered, Pending RC Transfer",
    7777: "Delivered, RC Transferred",
    8888: "Cancel Auction.",
    9990: "Rescheduled",
    9991: "Reject and Reschedule",
    9992: "Reject and Unlist",
    9993: "Buyer Backed Out / Cancelled",
    9994: "Rejected by CTE"
};

let auctions_cte_list={
    "Received by CTE":"1111",
    "Live now in CTE":"2222",
    "Rejected by CTE":"9994",
    //"Withdrawal Accepted":"8888",
    //"Withdrawal Rejected":"1111"
};

let sources_list={
    "004":"TELE-IN",
    "005":"TELE-OUT",
    "Z03":"DIGITAL",
    "Z10":"Airport",
    "Z2":"WALK-IN",
    "Z3":"EVENT",
    "Z6":"Pulse Hub",
    "Z8":"Dealer Digital",
    "Z9":"Referral",
    "Z7":"Email"
};

let sub_sources_list={
        "004":{
            "121":"Print Ad",
            "131":"Website",
            "141":"Hoardings",
            "RDMS":"Reassure",
            "RP":"Reassure Portal"
           },
        "005":{
            "151":"TELE-OUT",
            "RDMS":"Reassure",
            "RP":"Reassure Portal"
        },
        "Z03":{
            "221":"MG Website",
            "231":"Cardekho.com",
            "241":"CarConfigurator",
            "251":"Car Wale",
            "301":"App E-Booking",
            "311":"Website E-Booking",
            "321":"Facebook",
            "331":"MG App",
            "381":"KMI",
            "391":"Auto-Expo",
            "401":"Booking-Form-Dropoff",
            "411":"Google",
            "431":"Ebuy",
            "441":"MG V Phy",
            "471":"MG APP REF BY DEL CUSTOMER",
            "481":"MG APP REF BY OTHERS",
            "491":"E-Buy Drop off",
            "501":"Facebook Messanger",
            "CM":"Call me now",
            "LK":"Linkedin",
            "SE":"Smart Emi 360",
            "WA":"Whatsapp",
            "RDMS":"Reassure",
            "RP":"Reassure Portal",
            "521":"Google Business Messages",
            "551":"Olx",
            "561":"Zero Miles",
            "AB":"MG Expert",
            "PRS":"Pre-Reserve"
        },
        "Z10":{
            "341":"Delhi Airport",
            "351":"Bangalore Airport",
            "361":"Mumbai Airport",
            "RDMS":"Reassure",
            "RP":"Reassure Portal"
        },
        "Z2":{
            "101":"Walk-in",
            "RDMS":"Reassure",
            "RP":"Reassure Portal"
        },
        "Z3":{
            "161":"Mail",
            "171":"Upcountry",
            "181":"Bank",
            "PE":"Event",
            "PR":"Roadshow",
            "RDMS":"Reassure",
            "RP":"Reassure Portal"
        },
        "Z6":{
            "201":"EMAIL",
            "221":"MG Website",
            "PE":"Event",
            "PM":"MG Employee",
            "PP":"Phone call",
            "PR":"Roadshow",
            "RDMS":"Reassure",
            "RP":"Reassure Portal",
            "511":"Lost Lead"
        },
        "Z7":{
            "201":"Email",
            "SE":"Smart Emi 360",
            "RDMS":"Reassure",
            "RP":"Reassure Portal"
        },
        "Z8":{
            "211":"Dealer Digital",
            "RDMS":"Reassure",
            "RP":"Reassure Portal"
        },
        "Z9":{
            "261":"Exisiting Customer",
            "271":"Friends & Family",
            "281":"Management",
            "291":"Employee",
            "RDMS":"Reassure",
            "RP":"Reassure Portal"
        }
    };
let buyleads_sources_list={

    "004":"TELE-IN",
    "005":"TELE-OUT",
    "Z03":"DIGITAL",
    "Z10":"Airport",
    "Z2":"WALK-IN",
    "Z3":"EVENT",
    "Z6":"Pulse Hub",
    "Z8":"Dealer Digital",
    "Z9":"Referral",
    "Z7":"Email"
};
let buyleads_sub_sources_list={
    "004":{
        "121":"Print Ad",
        "131":"Website",
        "141":"Hoardings",
        "RDMS":"Reassure",
        "RP":"Reassure Portal"
    },
    "005":{
        "151":"TELE-OUT",
        "RDMS":"Reassure",
        "RP":"Reassure Portal"
    },
    "Z03":{
        "221":"MG Website",
        "231":"Cardekho.com",
        "241":"CarConfigurator",
        "251":"Car Wale",
        "301":"App E-Booking",
        "311":"Website E-Booking",
        "321":"Facebook",
        "331":"MG App",
        "381":"KMI",
        "391":"Auto-Expo",
        "401":"Booking-Form-Dropoff",
        "411":"Google",
        "431":"Ebuy",
        "441":"MG V Phy",
        "471":"MG APP REF BY DEL CUSTOMER",
        "481":"MG APP REF BY OTHERS",
        "491":"E-Buy Drop off",
        "501":"Facebook Messanger",
        "CM":"Call me now",
        "LK":"Linkedin",
        "SE":"Smart Emi 360",
        "WA":"Whatsapp",
        "RDMS":"Reassure",
        "RP":"Reassure Portal",
        "521":"Google Business Messages",
        "551":"Olx",
        "561":"Zero Miles",
        "AB":"MG Expert",
        "PRS":"Pre-Reserve"
    },
    "Z10":{
        "341":"Delhi Airport",
        
        "351":"Bangalore Airport",
        "361":"Mumbai Airport",
        "RDMS":"Reassure",
        "RP":"Reassure Portal"
    },
    "Z2":{
        "101":"Walk-in",
        "RDMS":"Reassure",
        "RP":"Reassure Portal"
    },
    "Z3":{
        "161":"Mail",
        "171":"Upcountry",
        "181":"Bank",
        "PE":"Event",
        "PR":"Roadshow",
        "RDMS":"Reassure",
        "RP":"Reassure Portal"
    },
    "Z6":{
        "201":"EMAIL",
        "221":"MG Website",
        "PE":"Event",
        "PM":"MG Employee",
        "PP":"Phone call",
        "PR":"Roadshow",
        "RDMS":"Reassure",
        "RP":"Reassure Portal",
        "511":"Lost Lead"
    },
    "Z7":{
        "201":"Email",
        "SE":"Smart Emi 360",
        "RDMS":"Reassure",
        "RP":"Reassure Portal"
    },
    "Z8":{
        "211":"Dealer Digital",
        "RDMS":"Reassure",
        "RP":"Reassure Portal"
    },
    "Z9":{
        "261":"Exisiting Customer",
        "271":"Friends & Family",
        "281":"Management",
        "291":"Employee",
        "RDMS":"Reassure",
        "RP":"Reassure Portal"
    }
};


let config_position_images={"0" : "Front",
    "1" : "Front LHS",
    "2" : "Front RHS",
    "3" : "Rear",
    "4" : "Rear LHS",
    "5" : "Rear RHS",
    "6" : "Dicky Floor",
    "7" : "Dashboard",
    "8" : "Speedometer(with display 'ON')",
    "9" : "Upholstery",
    "10": "Engine Compartment",
    "11" : "RC Copy",
    "12" : "Insurance copy",
};

let insurance_types={
    "1" : "Comprehensive",
    "2" : "Corporate",
    "3" : "Expired",
    "4" : "Third Party"
};


let config_list_on={
    "1":" MG UC Portal",
    "2":"Cartrade",
    "3":"Carwale",
    "4":"All",
};
                 
let config_mg_uc_fueltpe={
    "101": "Diesel",
    "111": "Petrol",
    "121": "Hybrid",
    "131": "Petrol + CNG",
    "141": "Petrol + LPG",
    "151": "Electric"
};
    
let config_mg_uc_VehicleCondition={
    "101": "Non Accidental with Minimal Refurbishment",
    "111": "Non Accidental with High Refurbishment",
    "121": "Accidental with Minimal Refurbishment",
    "131": "Accidental with High Refurbishment"
};
    
let config_mg_uc_owners={
    "101": "First",
    "111": "Second",
    "121": "Third",
    "131": "Fourth",
    "141": "Fifth",
    "151" : "More than 5"
};
//  /*"1": "Broker - Auction",*/
let config_mg_mode_of_sale={
    "1": "Retail",
    "2": "Sale to Broker (B2B - Offline)",
    //"3": "Sale to End Customer (B2B - Online)",
    //"4": "Sale to Broker (B2B - Online)(Auctions)",
};

let config_inspection_at={
    "1":"Showroom",
    "2":"Customers Place"
};
let config_partner_category={
    "1":"Person",
    "2":"Organization"
};
let config_partner_grp={
    "ZRTL":"Retail Customer",
    "ZINS":"Institutional Customer",
};
let config_car_overlayImages={
    "0":"front1.jpg",
    "1":"Front-LHS.jpg",
    "2":"Front-RHS.jpg",
    "3":"rear.jpg",
    "4":"Rear-LHS.jpg",
    "5":"Rear-RHS.jpg",
    "6":"dicky-floor.jpg",
    "7":"dashboard.jpg",
    "8":"speedometer.jpg",
    "9":"upholstery.jpg",
    "10":"Engine-Compartment.jpg",
    "11":"rc.jpg",
    "12":"insurance.jpg",
            
};

let config_c4c_model_variant_details={
    "ASTOR" : {
        "SAVVY": "281",
        "SHARP": "291",
        "SHARP EX": "295",
        "SMART": "293",
        "SMART EX": "296",
        "STYLE": "292",
        "STYLE EX": "298",
        "SUPER": "294",
        "SUPER EX": "297"
    },
    "GLOSTER" : {
        "SUPER-7S-4x2":"191",
        "SHARP-6S-4x4":"201",
        "SHARP-7S-4X2":"341",
        "SHARP-7S-4x4":"211",
        "SMART-6S-4x2":"221",
        "SAVVY-7S-4X2-ADAS":"331",
        "SAVVY-7S-4x4-ADAS":"271",
        "SAVVY-6S-4x4-ADAS":"SAVVY",
        "SAVVY-6S-4X2-ADAS":"321"   
    },
    "HECTOR" : {
        
        "SHARP":"SHARP",
        "SHARP EX":"311",
        "SHARP PRO EX":"451",
        "SHARP PRO":"361", 

        "SHINE":"SHINE",
        "SHINE EX":"431",

        "SMART":"SMART",
        "SMART PRO EX":"461",
        "SMART EX":"441",
        "SMART PRO":"491",

        "STYLE":"STYLE",
        "SUPER":"SUPER",                
               
        "SAVVY PRO":"371",   

        "PLUS SAVVYPRO 6S":"401",
        "PLUS SAVVYPRO 7S":"421",

        "PLUS SHARP 6S":"161",
        "PLUS SHARPPRO 6S":"391",
        "PLUS SHARPPRO 7S":"411",               
        "PLUS SHARPPRO EX 6S":"471",
        "PLUS SHARP PRO EX 6S":"471",

        "PLUS SMART 6S":"151",
        "PLUS SMARTPRO 6S":"381",
        "PLUS SMART EX 7S":"481",
        "PLUS SMART 7S":"251",
        
        "PLUS SUPER 6S":"171",        
        "PLUS SUPER 7S":"241",

        "PLUS STYLE 7S":"231",
        "PLUS SELECT 7S":"261",      
        
    },
    "MG_ZS_EV" : {
        "EXCLUSIVE":"EXCLUSIVE",
        "EXCITE":"EXCITE",
    },
    "MG_COMET_EV" : {
        "Pace" : "Pace",
        "Play" : "Play",
        "Plush" : "Plush"
    }
};

let config_executive_roles={
    "1":"Used Car Manager",
    "2":"Used Car Evaluator",
    "3":"Used Car Seller",
    "4":"ASM",
    "5":"ZM",
};

let config_amc_codes = {"A1" :"1",
    "A2" : "1",
    "A3" : "1",
    "A4" : "1",
    "A5" : "1",
    "A6" : "1",
    "A7" : "1",
    "A8" : "1",
    "A9" : "1",
    "AB" : "1",
    "AC" : "1",
    "AD" : "1",
    "AE" : "1",
    "AF" : "1"
};
  //popular makes start
 let makespop = array(
    "MG",
    "Maruti Suzuki",
    "Hyundai",
    "Toyota",
    "Kia",
    "Honda",
    "Tata",
    "Mahindra",
    "Ford",
    "Chevrolet",
    "Skoda",
    "Jeep",
    "Nissan",
    "Renault",
    "Volkswagen"
);
//popular makes end
let sellead_usrRig_buk_lst={
    "9":"plan_postponed",
    "10":"fresh",
    "20":"appointment_confirmed",
    "30":"need_price_approval",
    "40":"price_quote_pending",
    "50":"under_negotiation",
    "60":"pending_stockin",
    "70":"pos_pend_doc_pend",
    "80":"pos_pend_doc_rec",
    "90":"pos_done_doc_pend",
    "999":"pos_done_doc_rec",
    "9999":"closed",
};
let mystock_retail_usrRig_buk_list={
    "200": "refurb_details_pend",
    "300": "under_certification",
    "400": "need_certification_approval",
    "500": "ready_for_sale",
    "600": "car_booked",
    "700": "pending_stockout_doc_pend",
    "800": "pending_stockout_nodocs_pend",
    "900": "car_delivered",
    "1000": "rc_transferred",
};

let mystock_b2b_usrRig_buk_list={
    "100": "pos_done_doc_pend",
    "111": "ready_for_sale",
    "222": "vehicle_booked",
    "333": "vehicle_delivered",
    "444": "rc_transferred",
};
    
let buylead_usrRig_buk_list={
    "900":"plan_postponed",
    "1000": "fresh",
    "2000": "appointment_fixed",
    "3000": "test_drive_pending",
    "4000": "under_followup",
    "5000": "approve_price",
    "6000": "under_booking_process",
    "7000": "car_booked",
    "8000": "pending_stockout_doc_pend",
    "9000": "pending_stockout_nodocs_pend",
    "10000": "car_delivered",
    "11000": "rc_transferred",
    "99999": "closed",
};
