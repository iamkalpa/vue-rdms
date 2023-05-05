{
	"1000": {
		"name": "Fresh",
		"title": "Have you fixed an appointment with the customer?",
		"q1": {
			"a": {
				"name": "Yes, Appointment Fixed",
				"sub": {
					"a": {
						"name": "Visit at the Dealership",
						"sub": false
					},
					"b": {
						"name": "Visit Customer's address",
						"sub": false
					}
				}
			},
			"b": {
			 	"name": "Couldn't speak to customer",
			 	"sub": {
					"a": {
						"name": "Call Busy",
						"sub": false
					},
					"b": {
						"name": "Number Not Available",
						"sub": false
					},
					"c": {
						"name": "Didn't pick up the call",
						"sub": false
					},
					"d": {
						"name": "Other",
						"sub": false
					}
				}
			 },
			 "c": {
			 	"name": "Plan Postponded",
			 	"sub": false
			 },
			"z": {
			 	"name": "Close the Lead",
			 	"sub": false
			 }
		},
		"fields": {
			"a-a": {
				"fields": [
					{
						"name": "Visit Date",
						"db-field": "visit_date",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "2000"
			},
			"a-b": {
				"fields": [
					{
						"name": "Visit Date",
						"db-field": "visit_date",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "2000"
			},
			"b-a": {
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "1000"
			},
			"b-b": {
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "1000"
			},
			"b-c": {
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "1000"
			},
			"b-d": {
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "1000"
			},
			"c":{
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "1000"
			}
		}
	},
	"2000": {
		"name": "Appointment Fixed",
		"title": "Did you visit customer?",
		"q1": {
			"a": {
				"name":"Yes, Customer Visited",
			 	"sub": {
					"a": {
						"name": "Test Drive Taken",
						"sub": false
					},
					"b": {
						"name": "Test Drive pending",
						"sub": false
					},
					"c": {
						"name": "No Need of Test Drive",
						"sub": false
					}
				}
			},
			"b": {
				"name":"No, Reshedule appointment",
				"sub": false
			},
			"c": {
			 	"name": "Plan Postponded",
			 	"sub": false
			 },
			"z": {
			 	"name": "Close the Lead",
			 	"sub": false
			 }
		},
		"fields": {
			"a-a": {
				"fields": [
					{
						"name": "Selected Car(s)",
						"db-field": "selected_car",
						"type": "multiselect_dropdown"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "4000"
			},
			"a-b": {
				"fields": [
					{
						"name": "Interest Shown in",
						"db-field": "interested_car",
						"type": "dropdown"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "3000"
			},
			"a-c": {
				"fields": [
					{
						"name": "Interest Shown in",
						"db-field": "interested_car",
						"type": "dropdown"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "4000"
			},
			"b": {
				"fields": [
					{
						"name": "Visit Date",
						"db-field": "visit_date",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "2000"
			},
			"c":{
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "1000"
			}
		}
	},
	"3000": {
		"name": "Test Drive Pending",
		"title": "Did customer take a test drive?",
		"q1": {
			"a": {
				"name":"Yes, Test Drive Taken",
				"sub": false
			},
			"b": {
				"name":"No Need of Test Drive",
				"sub": false
			},
			"c": {
			 	"name": "Plan Postponded",
			 	"sub": false
			 },
			"z": {
				"name":"Close the lead",
				"sub": false
			} 
		},
		"fields": {
			"a": {
				"fields": [
					{
						"name": "Selected Car(s)",
						"db-field": "selected_car",
						"type": "multiselect_dropdown"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "4000"
			},
			"b": {
				"fields": [
					{
						"name": "Selected Car",
						"db-field": "selected_car",
						"type": "multiselect_dropdown"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "4000"
			},
			"c":{
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "1000"
			}
		}
	},
	"4000": {
		"name": "Under Follow up",
		"title": "Did customer finalized the Car to be purchased?",
		"q1": {
			"a": {
				"name":"Yes, Car is finalized",
				"sub": false
			},
			"b": {
				"name":"Need more test drives",
				"sub": false
			},
			"c": {
			 	"name": "Plan Postponded",
			 	"sub": false
			 },
			"z": {
				"name":"Close the lead",
				"sub": false
			}
		},
		"fields": {
			"a": {
				"fields": [
					{
						"name": "Finalized Car",
						"db-field": "finalized_car",
						"type": "dropdown"
					},
					{
						"name": "Quoted selling Price",
						"db-field": "quoted_sp",
						"type": "number"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "5000"
			},
			"b": {
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "3000"
			},
			"c":{
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "1000"
			}
		}
	},
	"5000": {
		"name": "Approve Price",
		"title": "is the Price Breakup OK?",
		"q1": {
			"a": {
				"name":"Yes, I approve the price",
				"sub": false
			},
			"b": {
				"name":"No, Negotiate more",
				"sub": false
			}
		},
		"fields": {
			"a": {
				"fields": [
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "6000"
			},
			"b": {
				"fields": [
					{
						"name": "MG Expectated Price",
						"db-field": "mg_exp_price",
						"type": "number"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "4000"
			}
		}
	},
	"6000": {
		"name": "Under Booking Process",
		"title": "Has customer booked the Car?",
		"q1": {
			"a": {
				"name": "Yes, Car is booked, Price agreement done",
				"sub": {
					"a": {
						"name": "Token Amount paid",
						"sub": false
					},
					"b": {
						"name": "Paid in Full",
						"sub": false
					}
				}
			},   
			"b": {
				"name": "Price Agreement Pending",
				"sub": false
			},
			"c": {
			 	"name": "Plan Postponded",
			 	"sub": false
			 },
			 "z": {
				"name":"Close the lead",
				"sub": false
			}
		},
		"fields": {
			"a-a": {
				"fields": [
					{
						"name": "Booked Car",
						"db-field": "booked_car",
						"type": "input_text"
					},
					{
						"name": "Token Amount",
						"db-field": "token_amount",
						"type": "number"
					},
					{
						"name": "Upload Receipt",
						"db-field": "token_receipt",
						"type": "file"
					},
					{
						"name": "Expected Date of payment",
						"db-field": "expect_date_payment",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Price Agreement",
						"db-field": "price_agreement",
						"type": "radio",
						"options":["online","offline"]
					},
					{
						"name": "Vehicle Contract button",
						"db-field": "button",
						"type": "vehicle-contract"
					},
					{
						"name": "Upload Price Agreement",
						"db-field": "price_agreement_doc",
						"type": "agreement_file"
					}
				],
				"next-status": "7000"
			},
			"a-b": {
				"fields": [
					{
						"name": "Booked Car",
						"db-field": "booked_car",
						"type": "input_text"
					},
					{
						"name": "Paid Amount",
						"db-field": "paid_amount",
						"type": "number"
					},
					{
						"name": "Upload Receipt",
						"db-field": "upload_receipt",
						"type": "file"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Price Agreement",
						"db-field": "price_agreement",
						"type": "radio",
						"options":["online","offline"]
					},
					{
						"name": "Vehicle Contract button",
						"db-field": "button",
						"type": "vehicle-contract"
					},
					{
						"name": "Upload Price Agreement",
						"db-field": "price_agreement_doc",
						"type": "agreement_file"
					}
				],
				"next-status": "7000"
			},
			"b": {
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Price Agreement",
						"db-field": "price_agreement",
						"type": "radio",
						"options":["online","offline"]
					},
					{
						"name": "Vehicle Contract button",
						"db-field": "button",
						"type": "vehicle-contract"
					},
					{
						"name": "Upload Price Agreement",
						"db-field": "price_agreement_doc",
						"type": "agreement_file"
					}
				],
				"next-status": "6000"
			},
			"c":{
				"fields": [
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "1000"
			}
		}
	},
	"7000": {
		"name": "Car Booked",
		"title": "Has Sales Contract signed by the customer?",
		"q1": {
			"a": {
				"name": "Yes, money received, Delivery Pending",
				"sub": {
					"a": {
						"name": "Checklist completed",
						"sub": false
					},
					"b": {
						"name": "Checklist incomplete",
						"sub": false
					}
				}
			},   
			"b": {
				"name": "Yes, money received, Delivery Done",
				"sub": {
					"a": {
						"name": "Checklist completed",
						"sub": false
					},
					"b": {
						"name": "Checklist incomplete",
						"sub": false
					}
				}
			}
		},
		"fields": {
			"a-a": {
				"fields": [
					{
						"name": "Received Amount",
						"db-field": "recieved_amount",
						"type": "number"
					},
					{
						"name": "Upload Receipt",
						"db-field": "upload_receipt",
						"type": "file"
					},
					{
						"name": "Expected Date of delivery",
						"db-field": "expect_delivery_date",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "9000"
			},
			"a-b": {
				"fields": [
					{
						"name": "Received Amount",
						"db-field": "recieved_amount",
						"type": "number"
					},
					{
						"name": "Upload Receipt",
						"db-field": "upload_receipt",
						"type": "file"
					},
					{
						"name": "Expected Date of delivery",
						"db-field": "expect_delivery_date",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "8000"
			},
			"b-a": {
				"fields": [
					{
						"name": "Received Amount",
						"db-field": "recieved_amount",
						"type": "number"
					},
					{
						"name": "Upload Receipt",
						"db-field": "upload_receipt",
						"type": "file"
					},
					{
						"name": "Upload Delivery Note",
						"db-field": "delivery_note",
						"type": "file"
					},
					{
						"name": "Car Delivery Date",
						"db-field": "car_delivery_date",
						"type": "date"
					}
				],
				"next-status": "10000"
			},
			"b-b": {
				"fields": [
					{
						"name": "Received Amount",
						"db-field": "recieved_amount",
						"type": "number"
					},
					{
						"name": "Upload Receipt",
						"db-field": "upload_receipt",
						"type": "file"
					},
					{
						"name": "Car Delivery Date",
						"db-field": "car_delivery_date",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "8000"
			}
		}
	},
	"8000": {
		"name": "Pending Stock Out (Docs Pending)",
		"title": "Did you collect all the documents?",
		"q1": {
			"a": {
				"name":"Yes, checklist completed",
				"sub": {
					"a": {
						"name": "Car Delivered",
						"sub": false
					},
					"b": {
						"name": "Car Delivery Pending",
						"sub": false
					}
				}
			},
			"b": {
				"name":"No, few documents pending",
				"sub": false
			},
	        	"z": {
				"name":"Close the lead",
				"sub": false
			}
		},
		"fields": {
			"a-a": {
				"fields":[
					{
						"name": "Upload Delivery Note",
						"db-field": "delivery_note",
						"type": "file"
					},
					{
						"name": "Car Delivery Date",
						"db-field": "car_delivery_date",
						"type": "date"
					}
				],
				"next-status": "10000"
			},
			"a-b": {
				"fields": [
					{
						"name": "Expected Date of delivery",
						"db-field": "expect_delivery_date",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "9000"
			},
			"b": {
				"fields": [
					{
						"name": "Expected Date of delivery",
						"db-field": "expect_delivery_date",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "8000"
			}
		}
	},
	"9000": {
		"name": "Pending Stock Out (No Docs Pending)",
		"title": "Did you deliver the Car?",
		"q1": {
			"a": {
				"name":"Yes, Car Delivered",
				"sub": false
			},
			"b": {
				"name":"No, Car Delivery Pending",
				"sub": false
			},
	        	"z": {
				"name":"Close the lead",
				"sub": false
			}
		},
		"fields": {
			"a": {
				"fields":[
					{
						"name": "Upload Delivery Note",
						"db-field": "delivery_note",
						"type": "file"
					},
					{
						"name": "Car Delivery Date",
						"db-field": "car_delivery_date",
						"type": "date"
					}
				],
				"next-status": "10000"
			},
			"b": {
				"fields": [
					{
						"name": "Expected Date of delivery",
						"db-field": "expect_delivery_date",
						"type": "date"
					},
					{
						"name": "Next Follow up",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "9000"
			}
		}
	},
	"10000":{
		"name": "Car Delivered",
		"title": "Car is delivered.",
		"q1": {},
		"fields": {}
	},
	"99999":{
		"name": "Closed",
		"title": "Lead status is Closed",
		"q1": {},
		"fields": {}
	}
}