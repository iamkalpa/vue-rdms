{
	"100": {
		"name": "Pocession Done, Documents Pending",
		"title": "Pocession Done, Documents Pending",
		"fields": [],
		"next-status": ""
	},
	"111": {
		"name": "Ready For Sale",
		"title": "Ready For Sale",

		"fields": [
			{
				"name": "Select Broker",
				"db-field": "broker_id",
				"type": "dropdown"
			},
			{
				"name": "Total Selling Price",
				"db-field": "total_sp",
				"type": "number"
			},
			{
				"name": "Refurbishment Amount (if any)",
				"db-field": "final_refurb_cost",
				"type": "number"
			},
			{
				"name": "Next FUP",
				"db-field": "status_followup_date",
				"type": "datetime"
			},
			{
				"name": "Remarks",
				"db-field": "status_remarks",
				"type": "textarea"
			}
		],
		"next-status": "222"
	},
	"222": {
		"name": "Vehicle Booked",
		"title": "Vehicle Booked",

		"fields": [
			{
				"name": "Delivery Date",
				"db-field": "car_delivery_date",
				"type": "date"
			},
			{
				"name": "Amount Received",
				"db-field": "recieved_amount",
				"type": "number"
			},
			{
				"name": "Upload Receipt",
				"db-field": "upload_receipt",
				"type": "file"
			},
			{
				"name": "Next FUP",
				"db-field": "status_followup_date",
				"type": "datetime"
			},
			{
				"name": "Remarks",
				"db-field": "status_remarks",
				"type": "textarea"
			}
		],
		"next-status": "333"
	},
	"333": {
		"name": "Vehicle Delivered",
		"title": "Vehicle Delivered",

		"fields": [
			{
				"name": "Vehicle Registration Date",
				"db-field": "post_sale_reg_date",
				"type": "date"
			},
			{
				"name": "Registration Number",
				"db-field": "post_sale_reg_num",
				"type": "text"
			},
			{
				"name": "Upload RC Copy",
				"db-field": "rc_file",
				"type": "file"
			},
			{
				"name": "Remarks",
				"db-field": "status_remarks",
				"type": "textarea"
			}
		],
		"next-status": "444"
	},
			
	"444": {
		"name": "RC Transfer Completed",
		"title": "RC Transfer Completed",
		"fields": [],
		"next-status": "444"
	},
	"1111": {
		"name": "Auctions",
		"title": "Auctions",
		"fields": [],
		"next-status": ""
	},
	"7777": {
		"name": "Auctions",
		"title": "Auctions RC Transfered And Delivered",
		"fields": [],
		"next-status": ""
	}
}