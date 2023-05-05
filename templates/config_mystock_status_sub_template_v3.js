{
	"100": {
		"name": "Possession Done, Documents Pending",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"110": {
		"name": "Possession Done, Documents Received",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"200": {
		"name": "Refurbishment Details Pending",
		"title": "Is the Vehicle refurbished?",
		"q1": {
			"a": {
				"name": "Yes, refurbishment done & vehicle received",
				"sub": false
			},
			"b": {
			 	"name": "No, waiting for refurb details",
			 	"sub":false
			},
			"c": {
			 	"name": "Refurbishment details not required",
			 	"sub":false
			}
		},
		"fields": {
				"a" :{
					"fields": [
						{
							"name": "Car received date",
							"db-field": "refurb_date",
							"type": "date"
						},
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
							"name": "Expected date of Refurbishment",
							"db-field": "refurb_date",
							"type": "date"
						},
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "200"
				},
				"c" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "300"
				}
		}
	},
	"300": {
		"name": "Under Certification",
		"title": "Have you certified the Car?",
		"q1": {
			"a": {
				"name": "Yes, Cerification Done",
				"sub": false
			},
			"b": {
			 	"name": "Certification Can't be Done",
			 	"sub":false
			}
		},
		"fields": {
				"a" :{
					"fields": [
						{
							"name": "Certification Date",
							"db-field": "certification_date",
							"type": "datetime"
						},
						{
							"name": "Car Listing Price",
							"db-field": "car_listing_price",
							"type": "number"
						},
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
							"name": "Car Listing Price",
							"db-field": "car_listing_price",
							"type": "number"
						},
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
	"400": {
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
			 	"name": "Not Approved, Please Re-work",
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
					"next-status": "500"
				},
				"c" :{
					"fields": [
						{
							"name": "Remarks",
							"db-field": "status_remarks",
							"type": "text"
						}
					],
					"next-status": "300"
				}
		}
	},
	"500": {
		"name": "Ready For Sale",
		"title": "Listing is live on www.mgreassure.co.in",
		"q1": {},
		"fields": {}
	},
	"600": {
		"name": "Car Booked",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"700": {
		"name": "Pending Stock Out (Docs Pending)",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"800": {
		"name": "Pending Stock Out (No Docs Pending)",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"900": {
		"name": "Car Delivered",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"1000": {
		"name": "RC Transfer Complete",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"1111": {
		"name": "Auctions",
		"title": "",
		"q1": {},
		"fields": {}
	},
	"7777": {
		"name": "Auctions",
		"title": "Auctions RC Transfered And Delivered",
		"q1": {},
		"fields": {}
	}
}