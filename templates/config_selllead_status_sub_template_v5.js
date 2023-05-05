{
	"10": {
		"name": "Fresh",
		"title": "Do you want to schedule evaluation?",
		"q1": {
			"a": {
				"name": "Yes, set appointment for evaluation",
				"sub": false
			},
			"b": {
				"name": "Conduct Evaluation",
				"sub": {
					"a": {
						"name": "Inspection Doing at :",
						"sub": {
							"a": {
								"name": "Showroom",
								"sub": false
							},
							"b": {
								"name": "Field",
								"sub": false
							}
						}
					}
				}
			},
			"c": {
				"name": "Evaluation done already",
				"sub": false
			},
			"d": {
				"name": "Couldn't speak to customer",
				"sub": false
			},
			"e": {
				"name": "Plan Postponed",
				"sub": false
			},
			"z": {
				"name": "Close the Lead",
				"sub": false
			}
		},
		"fields": {
			"a": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Executive Quote",
						"db-field": "exe_quote",
						"type": "number"
					},
					{
						"name": "Customer Expectations",
						"db-field": "cust_exp",
						"type": "number"
					},
					{
						"name": "Other Expenses",
						"db-field": "other_expenses",
						"type": "number"
					},
					{
						"name": "Expected Selling Price",
						"db-field": "expected_selling_price",
						"type": "number"
					}
				],
				"next-status": "20"
			},
			"b-a-a": {
				"fields": [{
					"name": "message",
					"db-field": "message",
					"type": "message",
					"message": "Please open evaluation,accessories,car image"
				}],
				"next-status": ""
			},
			"b-a-b": {
				"fields": [{
					"name": "message",
					"db-field": "message",
					"type": "message",
					"message": "Please open evaluation,accessories,car image"
				}],
				"next-status": ""
			},
			"c": {
				"fields": [{
						"name": "Inspection done at",
						"db-field": "inspection_at",
						"type": "dropdown",
						"dropdown": [{
							"1": "Showroom",
							"2": "Field"
						}]
					},
					{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Executive Quote",
						"db-field": "exe_quote",
						"type": "number"
					},
					{
						"name": "Customer Expectations",
						"db-field": "cust_exp",
						"type": "number"
					},
					{
						"name": "Other Expenses",
						"db-field": "other_expenses",
						"type": "number"
					},
					{
						"name": "Expected Selling Price",
						"db-field": "expected_selling_price",
						"type": "number"
					}
				],
				"next-status": "30"
			},
			"d": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "10"
			},
			"e": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "10"
			}
		}
	},
	"20": {
		"name": "Appointment Confirmed",
		"title": "Did you evaluate the car?",
		"q1": {
			"a": {
				"name": "Conduct Evaluation",
				"sub": {
					"a": {
						"name": "Inspection Doing at :",
						"sub": {
							"a": {
								"name": "Showroom",
								"sub": false
							},
							"b": {
								"name": "Field",
								"sub": false
							}
						}
					}
				}
			},
			"b": {
				"name": "Yes, Evaluation done",
				"sub": false
			},
			"c": {
				"name": "Couldn't speak to customer",
				"sub": false
			},
			"d": {
				"name": "Plan Postponed",
				"sub": false
			},
			"z": {
				"name": "Close the Lead",
				"sub": false
			}
		},
		"fields": {
			"a-a-a": {
				"fields": [{
					"name": "message",
					"db-field": "message",
					"type": "message",
					"message": "Please open evaluation,accessories,car image"
				}],
				"next-status": ""
			},
			"a-a-b": {
				"fields": [{
					"name": "message",
					"db-field": "message",
					"type": "message",
					"message": "Please open evaluation,accessories,car image"
				}],
				"next-status": ""
			},
			"b": {
				"fields": [{
						"name": "Inspection done at",
						"db-field": "inspection_at",
						"type": "dropdown",
						"dropdown": [{
							"1": "Showroom",
							"2": "Field"
						}]
					},
					{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Executive Quote",
						"db-field": "exe_quote",
						"type": "number"
					},
					{
						"name": "Customer Expectations",
						"db-field": "cust_exp",
						"type": "number"
					},
					{
						"name": "Other Expenses",
						"db-field": "other_expenses",
						"type": "number"
					},
					{
						"name": "Expected Selling Price",
						"db-field": "expected_selling_price",
						"type": "number"
					}
				],
				"next-status": "30"
			},
			"c": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "10"
			},
			"d": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "10"
			}
		}
	},
	"30": {
		"name": "Need Price Approval",
		"title": "Is the executive buying price quote OK?",
		"q1": {
			"a": {
				"name": "Yes, Accept the price",
				"sub": false
			},
			"b": {
				"name": "Revise the price",
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
				"next-status": "40"
			},
			"b": {
				"fields": [
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Approved Buying Quote",
						"db-field": "mg_exp_price",
						"type": "number"
					}
				],
				"next-status": "40"
			}
		}
	},
	"40": {
		"name": "Price Quote pending",
		"title": "Did you quote price to customer?",
		"q1": {
			"a": {
				"name": "Yes, Price shared with customer",
				"sub": false
			},
			"b": {
				"name": "Yet to give price",
				"sub": false
			},
			"c": {
				"name": "Couldn't speak to customer",
				"sub": false
			},
			"d": {
				"name": "Plan Postponed",
				"sub": false
			},
			"z": {
				"name": "Close the lead",
				"sub": false
			}
		},
		"fields": {
			"a": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Executive Quote",
						"db-field": "exe_quote",
						"type": "number"
					},
					{
						"name": "Customer Expectations",
						"db-field": "cust_exp",
						"type": "number"
					}
				],
				"next-status": "50"
			},
			"b": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "40"
			},
			"c": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "40"
			},
			"d": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "10"
			}
		}
	},
	"50": {
		"name": "Under Negotiation",
		"title": "Did Customer accept the quoted price?",
		"q1": {
			"a": {
				"name": "Yes, Customer accepted the offer",
				"sub": false
			},
			"b": {
				"name": "Re-negotiated the price",
				"sub": false
			},
			"c": {
				"name": "Couldn't speak to customer",
				"sub": false
			},
			"d": {
				"name": "Plan Postponed",
				"sub": false
			},
			"z": {
				"name": "Close the lead",
				"sub": false
			}
		},
		"fields": {
			"a": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Final Buying Price",
						"db-field": "actual_bp",
						"type": "number"
					},
					{
						"name": "Expected date of Trade-in",
						"db-field": "trade_in_date",
						"type": "date"
					},
					{
						"name": "Price Agreement",
						"db-field": "price_agreement",
						"type": "radio",
						"options": ["online", "offline"]
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
				"next-status": "60"
			},
			"b": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Executive Quote",
						"db-field": "exe_quote",
						"type": "number"
					},
					{
						"name": "Customer Expectations",
						"db-field": "cust_exp",
						"type": "number"
					}
				],
				"next-status": "30"
			},
			"c": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "50"
			},
			"d": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "10"
			}
		}
	},
	"60": {
		"name": "Pending Stock in",
		"title": "Is the possession done?",
		"q1": {
			"a": {
				"name": "No, Possession Pending",
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
				"name": "Yes, Possession Done",
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
			"c": {
				"name": "Couldn't speak to customer",
				"sub": false
			},
			"d": {
				"name": "Plan Postponed",
				"sub": false
			},
			"z": {
				"name": "Close the lead",
				"sub": false
			}
		},
		"fields": {
			"a-a": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Expected date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					}
				],
				"next-status": "80"
			},
			"a-b": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Expected date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					}
				],
				"next-status": "70"
			},
			"b-a": {
				"fields": [{
						"name": "Mode Of Sale",
						"db-field": "sales_mode",
						"type": "mos_dropdown"
					},
					{
						"name": "Date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "999"
			},
			"b-b": {
				"fields": [{
						"name": "Mode Of Sale",
						"db-field": "sales_mode",
						"type": "mos_dropdown"
					},
					{
						"name": "Date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					},
					{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "90"
			},
			"c": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "60"
			},
			"d": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "10"
			}
		}
	},
	"70": {
		"name": "Possession Pending, Documents Pending",
		"title": "Did you take posession of the Car?",
		"q1": {
			"a": {
				"name": "Yes, Possession Done",
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
				"name": "No, Possession pending",
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
			"z": {
				"name": "Close the lead",
				"sub": false
			}
		},
		"fields": {
			"a-a": {
				"fields": [{
						"name": "Mode Of Sale",
						"db-field": "sales_mode",
						"type": "mos_dropdown"
					},
					{
						"name": "Date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "999"
			},
			"a-b": {
				"fields": [{
						"name": "Mode Of Sale",
						"db-field": "sales_mode",
						"type": "mos_dropdown"
					},
					{
						"name": "Date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					},
					{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "90"
			},
			"b-a": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Expected date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					}
				],
				"next-status": "80"
			},
			"b-b": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Expected date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					}
				],
				"next-status": "70"
			}
		}
	},
	"80": {
		"name": "Possession Pending, Documents Received",
		"title": "Did you take posession of the Car?",
		"q1": {
			"a": {
				"name": "Yes, Possession Done",
				"sub": false
			},
			"b": {
				"name": "No, Possession pending",
				"sub": false
			},
			"z": {
				"name": "Close the lead",
				"sub": false
			}
		},
		"fields": {
			"a": {
				"fields": [{
						"name": "Mode Of Sale",
						"db-field": "sales_mode",
						"type": "mos_dropdown"
					},
					{
						"name": "Date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "999"
			},
			"b": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					},
					{
						"name": "Expected date of Possession",
						"db-field": "pocession_date",
						"type": "date"
					}
				],
				"next-status": "80"
			}
		}
	},
	"90": {
		"name": "Possession Done, Documents Pending",
		"title": "Did you collect all the documents?",
		"q1": {
			"a": {
				"name": "Yes, checklist completed",
				"sub": false
			},
			"b": {
				"name": "No, few documents pending",
				"sub": false
			}
		},
		"fields": {
			"a": {
				"fields": [{
					"name": "Remarks",
					"db-field": "status_remarks",
					"type": "text"
				}],
				"next-status": "999"
			},
			"b": {
				"fields": [{
						"name": "Next FUP",
						"db-field": "status_followup_date",
						"type": "datetime"
					},
					{
						"name": "Remarks",
						"db-field": "status_remarks",
						"type": "text"
					}
				],
				"next-status": "90"
			}
		}
	},
	"999": {
		"name": "Possession Done, Documents Received",
		"title": "Possession is Done.",
		"q1": {},
		"fields": {}
	},
	"9999": {
		"name": "Closed",
		"title": "Lead status is Closed",
		"q1": {},
		"fields": {}
	}
	
}