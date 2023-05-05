{
	"100": {
		"name": "Deal done (Docs pending)",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"110": {
		"name": "Deal Done (No Docs Pending)",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"200": {
		"name": "Deal Done (Possession done)",
		"title": "Has work order been generated?",
		"q1": {
			"a": {
				"name": "Yes, RO Received",
				"sub": false
			},
			"b": {
			 	"name": "No, Under process",
			 	"sub":false
			}
		},
		"fields": {
				"a" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "300"
				},
				"b" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "200"
				}
		}
	},
	"300": {
		"name": "RO Approval",
		"title": "Have you checked the final refurbishment cost?",
		"q1": {
			"a": {
				"name": "Yes, Approve the refurb components",
				"sub": false
			},
			"b": {
			 	"name": "Few components pending",
			 	"sub":false
			}
		},
		"fields": {
				"a" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "400"
				},
				"b" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "200"
				}
		}
	},
	"400": {
		"name": "Under Certification",
		"title": "Have you certified the Car?",
		"q1": {
			"a": {
				"name": "Yes, Cerification Done",
				"sub": false
			},
			"b": {
			 	"name": "No, working on it",
			 	"sub":false
			}
		},
		"fields": {
				"a" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "500"
				},
				"b" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "400"
				}
		}
	},
	"500": {
		"name": "Need certification approval",
		"title": "Approve vehicle certification?",
		"q1": {
			"a": {
				"name": "Yes, Approve Certification",
				"sub": false
			},
			"b": {
			 	"name": "No, Proceed without certification",
			 	"sub":false
			},
			"c": {
			 	"name": "No, Please Re-check",
			 	"sub":false
			}
		},
		"fields": {
				"a" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "600"
				},
				"b" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "600"
				},
				"c" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "400"
				}
		}
	},
	"600": {
		"name": "Ready For Sale",
		"title": "Listing will go live on MG portal",
		"q1": {},
		"fields": {}
	},
	"700": {
		"name": "Car Booked",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"800": {
		"name": "Pending Stock Out (Docs Pending)",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"900": {
		"name": "Pending Stock Out (No Docs Pending)",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"1000": {
		"name": "Car Delivered",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"1100": {
		"name": "RC Transfer Complete",
		"title": "",
		"q1": {},
		"fields": {}
	}
}