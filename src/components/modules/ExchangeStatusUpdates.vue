<template>
<div  style="min-height:400px;">
	<div v-if="success_alert" class="pt-3">
		 <div v-bind:class="{'alert alert-success alert-sm w-100':(success_alert)}" id="success-alert" role="alert">
			  <strong>Success!</strong> Data {{success_msg}}!
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			    <span aria-hidden="true">&times;</span>
			  </button>
		</div>
	</div>
	<div class="row">
		<div v-bind:class="{'alert alert-danger alert-sm m-2 w-100':(global_error)}" v-if="global_error">
		{{global_error}}
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
	</div>
	<div v-if="'status' in lead ==false">
		<h3>Loading Lead Details...</h3>
	</div>
	<div v-else-if="'10' in template ==false">
		<h3>Loading Template...</h3>
	</div>
	<div v-else>
	<div class="mt-3 ml-4">
		<div>
		<span style="font-size:22px;margin-right:15px;">
		<b>
		<span v-if="lead['status']==999" style="color:#059805">{{ template[ lead['status'] ]['name'] }}</span>
                  <span v-else-if="lead['status']==9999" style="color:#CF2230">{{ template[ lead['status'] ]['name'] }}</span>
                  <span v-else style="color:#056BA6">{{ template[ lead['status'] ]['name'] }}</span>
                  </b>
                  </span>
		 <span> (<b>Next FUP:</b> <span v-if="lead['status']!=9999">{{lead['next_followup_date']}}</span><span v-else >NA</span>) </span>
		  <span>(<b>Old Remarks:</b> <span v-if="lead['prev_status_remarks']!=''">{{ lead['prev_status_remarks'] }}</span>
		  <span v-else>NA</span>) </span>
		  </div>
		<div class="mt-3"><h5 v-if="lead['status']==30&&lead['role_id']!='1'"></h5><h5 v-else>{{ template[ lead['status'] ]['title'] }} </h5></div>
		<!--<div>Old Remarks: <span v-if="lead['prev_status_remarks']!=''">{{ lead['prev_status_remarks'] }}</span><span v-else>NA</span></div>-->
	</div>
	
		<div v-if="float_error" style="position:fixed; bottom:50px; right:20px; box-shadow:2px 2px 5px #333; z-index:500; ">
			<div class="card card-info">
				<div class="card-header">There was an error</div>
				<div class="card-body">
					<p>{{ float_error }}</p>
					<div><input type="button" value="CLOSE" class="btn btn-info btn-sm" v-on:click="float_error=false"></div>
				</div>
			</div>
		</div>
	<div class="mt-3 ml-4" v-if="leadview==0">
                <div v-if="lead['status']==30&&lead['role_id']!='1'">
                
                </div>
                <div v-else>
		<div v-for="q1q,q1i in template[ lead['status'] ]['q1']" >
			<label>
            <input type="radio" name="q1" v-model="lead['q1']" v-bind:value="q1i"  v-bind:disabled="restrict_updates('q1_'+q1i)" v-bind:class="{ radio_diselement : restrict_updates('q1_'+q1i) }"  class="mx-1" v-on:change="q1_changed"> {{ q1q['name'] }} </label>
			<template v-if="lead['q1']==q1i&&template[ lead['status'] ]['q1'][ lead['q1'] ]['sub']!=false">
			<div  style="margin-left:20px;">
			<div v-for="q2q,q2i in template[ lead['status'] ]['q1'][ lead['q1'] ]['sub']">
				<label> <input name="q2"  type="radio" v-model="lead['q2']" v-bind:value="q2i" class="mx-1" v-on:change="q2_changed"> {{ q2q['name'] }} </label>
				<template v-if="lead['q2']==q2i&&template[ lead['status'] ]['q1'][ lead['q1'] ]['sub'][ lead['q2'] ]['sub']!=false">
				<div style="margin-left:20px;">
					<div v-for="q3q,q3i in template[ lead['status'] ]['q1'][ lead['q1'] ]['sub'][ lead['q2'] ]['sub']">
						<label> <input name="q3"  type="radio" v-model="lead['q3']" v-bind:value="q3i" class="mx-1" v-on:change="q3_changed"> {{ q3q['name'] }} </label>
						<template v-if="lead['q3']==q3i&&template[ lead['status'] ]['q1'][ lead['q1'] ]['sub'][ lead['q2'] ]['sub'][ lead['q3'] ]['sub']!=false">
						<div style="margin-left:100px;">
							<div v-for="q4q,q4i in template[ lead['status'] ]['q1'][ lead['q1'] ]['sub'][ lead['q2'] ]['sub'][ lead['q3'] ]['sub']">
								<label> <input name="q4"  type="radio" v-model="lead['q4']" v-bind:value="q4i" class="mx-1" v-on:change="q4_changed"> {{ q4q['name'] }} </label>
							</div>
						</div>	
						</template>
					</div>
				</div>	
				</template>
			</div>
			</div>	
			</template>
		</div>
    </div>
    </div>
</div>
</div>
</template>
<script>
import router from "../../router"    
import axios from "axios"    
export default {    
    name: "ExchangeStatus Updates", 
    data: function() {
		return {
			max_date: '',
			min_date: '',
			props: {},
			float_error: "",
			form_error: "",
			form_errors: "",
			//user_rights: JSON.parse(user_rights),
			success_alert: false,
			success_msg: "",
			global_error: "",
			global_token: "",
			template: {},
			hide_loader: false,
			save_btn: true,
			close_template: {},
			status_date: "",
			status_time: "",
			status_field_option: "",
			status_history: [],
			salesmode_list: [],
			history_count: 0,
			next_status: "",
			show_update_btn: false,
			vshow: false,
			cnt: 0,
			exchange_edit_id: this.$route.params.id,
			vtab: this.$route.params.vtab,
			validation_error: false,
			api_calls_queue: [],
			api_call_busy: false,
			lead: {},
			dealership_details: {},
			total: "",
			contract_signdate: "",
			contract_signtime: "",
			lead_values: {},
			update_msg: "",
			status_list: [],
			next_fup: "",
			timestamp: "",
			fup_date: "",
			uploadfile_name: "",
			uploadedfile: "",
			vcont_url: "",
			customer_expec: 0,
			executive_quote: 0,
			validate_lead_details: {
				"title": false,
				"first_name": false,
				//"middle_name":"",
				"last_name": false,
				"mobile": false,
				"email": false,
				"res_addr": false,
				"pincode": false,
				"reason_for_sell": false,
				"enc_emake_id": false,
				"enc_emodel_id": false,
				"enc_evariant_id": false,
				"enc_state_id": false,
				"enc_city_id": false,
				"enc_source_id": false,
				"enc_source_sub_id": false,
				"enc_branch_id": false,
				"enc_executive_id": false

			},
			"img_file": {
				"price_agreement_doc": {
					"filename": "",
					"filepath": "",
					"selected_file": false,
					"uploaded": false,
					"uploading": false,
					"error": "",
					"msg": "",
				},
				"rel_proof": {
					"filename": "",
					"filepath": "",
					"selected_file": false,
					"uploaded": false,
					"uploading": false,
					"error": "",
					"msg": "",
				}
			},
			isActive: false,
			leadview:0,
		};
	},
	props: ['props'],
	mounted: function() {
        console.log(this.$route);
		if(this.exchange_edit_id!=''){
			this.call_api("generate_global_token");
		}
	},
	created: function() {
		const interval = setInterval(() => {
			this.fup_date = this.lead['status_followup_date'];
			if (this.lead['status'] == '50' && this.next_status == '60' && this.lead['price_agreement']=='online' && this.lead['contract_sent']==1) {
				this.call_api("generate_global_token", false, 1);
				bsCustomFileInput.init();
			}
		}, 15000);
	},
	methods: {
		edited_date: function(vf, v) {
			this.$set(this.lead, vf, v);
			this.validate_fields();
			this.save_status_fields();

		},
		edited_field: function(vf) {
			this.validate_fields();
			this.save_status_fields();

		},
		isNumber($event) {
			let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
			if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
				$event.preventDefault();
			}
		},
		datefreez: function() {
			var date = new Date()
			y = date.getFullYear()
			m = date.getMonth();
			var firstDay = new Date(y, m, 1);
			var lastDay = new Date(y, m + 1, 0);
			this.min_date = new Date(firstDay.getTime() - firstDay.getTimezoneOffset() * 60000).toISOString().split("T")[0];
			this.max_date = new Date(lastDay.getTime() - lastDay.getTimezoneOffset() * 60000).toISOString().split("T")[0];
			
		},

		echo: function(v) {
			if (typeof(v) == "object") {
				console.log(JSON.stringify(v, null, 4));
			} else {
				console.log(v);
			}
		},
		q1_changed: function() {
			this.$set(this.lead, 'q2', "");
			this.$set(this.lead, 'q3', "");
			this.$set(this.lead, 'q4', "");
			this.set_status_fields();
			this.save_status_fields();
			this.validate_fields();
		},
		q2_changed: function() {
			this.$set(this.lead, 'q3', "");
			this.$set(this.lead, 'q4', "");
			this.set_status_fields();
			this.save_status_fields();
			this.validate_fields();
		},
		q3_changed: function() {
			this.$set(this.lead, 'q4', "");
			this.set_status_fields();
			this.save_status_fields();
			this.validate_fields();
		},
		q4_changed: function() {
			this.set_status_fields();
			this.save_status_fields();
			this.validate_fields();
		},
		set_status_fields: function() {
			if (this.lead['q1'] != undefined) {
				var voption = this.lead['q1'];
				if (this.lead['q2']) {
					voption = voption + "-" + this.lead['q2'];
				}
				if (this.lead['q3']) {
					voption = voption + "-" + this.lead['q3'];
				}
				if (this.lead['q4']) {
					voption = voption + "-" + this.lead['q4'];
				}
				this.status_field_option = voption;
				if (voption in this.template[this.lead['status']]['fields']) {
					this.next_status = this.template[this.lead['status']]['fields'][voption]['next-status'] + '';
					if (this.next_status == '90' || this.next_status == '999') {
						this.datefreez();
						if (this.lead['pocession_date'] == '0000-00-00') {
							this.min_date = '';
							this.max_date = '';
						}
					} else {
						this.min_date = '';
						this.max_date = '';
					}

					this.show_update_btn = false;
				} else {
					this.next_status = '';
					this.show_update_btn = false;
				}
				if (this.next_status == '9') {
					this.lead['status_followup_date'] = '0000-00-00 00:00';
				} else {
					this.get_fup_date();
				}
				this.save_status_fields();
				this.validate_fields();
			}

		},
		formatCurrency: function(db_field) {
			var amount = '';
			var amount_out = '';
			var val_amount = '';
			amount = this.lead[db_field];
			amount = amount.replace(/,/g, '');
			let rupeeIndian = Intl.NumberFormat("en-IN", {
				// style: "currency",
				currency: "INR",

			});
			val_amount = rupeeIndian.format(Number(amount));
			this.lead[db_field] = val_amount;
		},
		getNow: function() {
			const today = new Date();
			const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			const dateTime = date + ' ' + time;
			this.timestamp = dateTime;
		},
		showreceiptModal: function(vfile,ty) {
			if(vfile!='' && vfile!=undefined){
				this.uploadedfile ="";
				this.uploadfile_name=ty;
				this.uploadedfile = vfile + "?rc_type=exch";
				$('#viewreceiptModal').modal('show');
			}
			
		},
		viewagreement: function(vfile,ty) {
			
			if(vfile!=''){
				this.uploadedfile ="";
				this.uploadfile_name=ty;
				this.uploadedfile = vfile + "?rc_type=exch";
				$('#viewagreement').modal('show');
			}
		},
		get_object_url: function(k) {
			if (this.img_file[k]['uploaded']) {
				return this.img_file[k]['filepath'] + '';
			} else {
				return URL.createObjectURL(this.img_file[k]['selected_file']);
			}
		},
		fileselect: function(v) {
			var theFormFile = $('#file_' + v).get()[0].files[0];
			if (theFormFile.type != "" && theFormFile.name.match(/(jpg|jpeg|JPG|JPEG|png|PNG|pdf)$/)) {
				this.$set(this.img_file[v], 'selected_file', theFormFile);
			} else {
				alert("Please upload jpg,png or pdf files only");
				this.$set(this.img_file[v], 'selected_file', false);
			}
			this.lead[v] = "";
		},
		upload_file: function(k) {
			this.$set(this.img_file[k], 'uploading', "Uploading...");
			var f = this.img_file[k]['selected_file'];
			var vform = new FormData();
			vform.append("action", "agreement_upload");
			vform.append("exchange_edit_id", this.exchange_edit_id);
			vform.append("filename", f.name);
			vform.append("field_name", k);
			vform.append("file", f);
			vform.append("token", this.global_token);

			axios({
				method: "POST",
				url: "/api_exchange_module.php",
				data: vform,
				onUploadProgress: progressEvent => this.set_progress(k, progressEvent)
			}).then((response) => {
				this.process_api_call_queue_next();
				if (response.data['status'] == "success") {
					var vdata = response.data;
					this.lead[vdata['view_file']]="";
					this.$set(this.img_file[vdata['field_name']], 'filepath', vdata['file_path']);
					this.$set(this.lead, vdata['field_name'], vdata['file_path']);
					this.$set(this.lead, vdata['view_file'], vdata['view_file_path']);
					this.$set(this.img_file[vdata['field_name']], 'uploaded', true);
					this.$set(this.img_file[vdata['field_name']], 'uploading', false);
					this.$set(this.img_file[vdata['field_name']], 'selected_file', false);
					if(vdata['field_name'] =='price_agreement_doc'){
						this.$set(this.lead, 'price_agreement', 'offline');
						this.$set(this.lead, 'contract_signed', 2);
						this.$set(this.lead, 'contract_signed_date', vdata['contract_signed_date']);
					}
					this.validate_fields();
					this.save_status_fields();
					this.global_token = response.data['token'];
				} else if (response.data['status'] == "fail"){
					if(response.data['error'] == "Session Expired"){
		                                this.float_error=response.data['error'];
		                                setTimeout(function(){
		                                    document.location = "/?event=SessionExpired";
		                                },500);

		                        }else if(response.data['error'] == "Concurrent Login"){
	            
		                                this.float_error=response.data['err_msg'];
		                                setTimeout(function(){
		                                    document.location = '/logout/?action=Logout&pg=multi';
		                                },500);

		                        }else{
				       		this.global_token = response.data['token'];
		                                this.float_error="Error uploading: \n" +response.data['error'];
		                        }
				}
			});
		},
		set_progress: function(k, p) {
			this.$set(this.img_file[k], 'uploading', "Uploading: " + ((Number(p.loaded) / Number(p.total)) * 100).toFixed(0) + "%");
		},
		remove_document: function(v) {
			this.$set(this.lead, v, "");
			this.$set(this.img_file[v], 'filepath', '');
			this.$set(this.img_file[v], 'uploaded', false);
			this.$set(this.img_file[v], 'uploading', false);
			this.$set(this.img_file[v], 'selected_file', false);
			this.uploadedfile="";
			if(v=='price_agreement_doc'){
				this.$set(this.lead, 'contract_signed', 0);
			}
			this.save_status_fields();
			this.validate_fields();
		},
		movetoFresh: function() {
			$('#alertModalCenter').modal({
				backdrop: 'static',
				keyboard: false
			});
			$("#alertModalCenter").modal("show");
		},
		confirm_movetoFresh: function() {
			axios.post("/api_exchange_module.php", {
				"action": "move_leadto_fresh",
				"enc_exchange_id": this.exchange_edit_id,
				"new_status": "10", //fresh status
				"token": this.global_token
			}).then(response => {
				this.process_api_call_queue_next();
				if (response.status == 200) {
					if (typeof(response.data) == "object") {
						if (response.data['status'] == "success") {
							document.location.reload();
						} else if (response.data['status'] == "fail"){
							if(response.data['error'] == "Session Expired"){
				                                this.float_error=response.data['error'];
				                                setTimeout(function(){
				                                    document.location = "/?event=SessionExpired";
				                                },500);

				                        }else if(response.data['error'] == "Concurrent Login"){
			            
				                                this.float_error=response.data['err_msg'];
				                                setTimeout(function(){
				                                    document.location = '/logout/?action=Logout&pg=multi';
				                                },500);

				                        }
							else if (response.data['error'] == "Token Error") {
								this.global_token = response.data['token'];
								this.call_api("confirm_movetoFresh");
							} else {
								this.float_error=response.data['error'];
								this.global_token = response.data['token'];
							}
						}else {
							this.float_error=response.data['error'];
							this.global_token = response.data['token'];
						}
					} else {
						this.float_error = 'Incorrect response recieved from server';
						this.global_token = response.data['token'];
					}
				} else {
					this.float_error = 'There was an error:' + response.err_msg;
					this.global_token = response.data['token'];
				}
			});
		},
		send_vehicle_contract: function() {
			this.global_error = '';
			if (this.validation_error == false) {
				var vpostdata = {
					"q1": this.lead['q1'],
					"q2": this.lead['q2'],
					"q3": this.lead['q3'],
					"q4": this.lead['q4'],
					"status_followup_date": this.lead['status_followup_date'],
					"status_remarks": this.lead['status_remarks'],
					"trade_in_date": this.lead['trade_in_date'],
					"actual_bp": this.lead['actual_bp'],
				}
				axios.post("/api_exchange_module.php", {
					"action": "send_vehicle_contract",
					"enc_exchange_id": this.exchange_edit_id,
					"contract_sent": '1',
					"postdata": vpostdata,
					"token": this.global_token
				}).then(response => {
					this.process_api_call_queue_next();
					if (response.status == 200) {
						if (typeof(response.data) == "object") {
							if (response.data['status'] == "success") {
								this.$set(this.lead, 'contract_sent', 1);
								this.$set(this.lead, 'contract_sent_date', response.data['contract_sent_date']);
								this.global_token = response.data['token'];
							}  else if (response.data['status'] == "fail"){ 
								if(response.data['error'] == "Session Expired"){
					                                this.global_error=response.data['error'];
					                                setTimeout(function(){
					                                    document.location = "/?event=SessionExpired";
					                                },500);

					                        }else if(response.data['error'] == "Concurrent Login"){
				            
					                                this.global_error=response.data['err_msg'];
					                                setTimeout(function(){
					                                    document.location = '/logout/?action=Logout&pg=multi';
					                                },500);

					                        }
								else if (response.data['error'] == "Token Error") {
									this.global_token = response.data['token'];
									this.call_api("send_vehicle_contract");
								} else if (response.data["error"] == "sms error") {
									this.global_error = "Error:" + response.data['msg'];
									this.global_token = response.data['token'];
								} else if (response.data["error"] == "email error") {
									this.global_error = "Email Error:" + response.data['msg'];
									this.global_token = response.data['token'];
								}else {
									this.global_error=response.data['error'];
									this.global_token = response.data['token'];
								}
							} else {
								this.float_error = 'Incorrect response recieved from server';
								this.global_token = response.data['token'];
							}
						} else {
							this.float_error = 'Incorrect response recieved from server';
							this.global_token = response.data['token'];
						}
					} else {
						this.float_error = 'There was an error:' + response.err_msg;
						this.global_token = response.data['token'];
					}
				});
			} else {
				this.validation_error = 'Please enter all the fields to send contract';
			}
		},
		resend_vehicle_contract: function() {
			var vpostdata = {
				"q1": this.lead['q1'],
				"q2": this.lead['q2'],
				"q3": this.lead['q3'],
				"q4": this.lead['q4'],
				"status_followup_date": this.lead['status_followup_date'],
				"status_remarks": this.lead['status_remarks'],
				"trade_in_date": this.lead['trade_in_date'],
				"actual_bp": this.lead['actual_bp'],
			}
			axios.post("/api_exchange_module.php", {
				"action": "send_vehicle_contract",
				"enc_exchange_id": this.exchange_edit_id,
				"contract_sent": '1',
				"postdata": vpostdata,
				"token": this.global_token
			}).then(response => {
				this.process_api_call_queue_next();
				if (response.status == 200) {
					if (typeof(response.data) == "object") {
						if (response.data['status'] == "success") {
							this.$set(this.lead, 'contract_sent', 1);
							this.$set(this.lead, 'contract_sent_date', response.data['contract_sent_date']);
							this.global_token = response.data['token'];
						} else if (response.data['status'] == "fail"){ 
							if(response.data['error'] == "Session Expired"){
				                                this.global_error=response.data['error'];
				                                setTimeout(function(){
				                                    document.location = "/?event=SessionExpired";
				                                },500);

				                        }else if(response.data['error'] == "Concurrent Login"){
			            
				                                this.global_error=response.data['err_msg'];
				                                setTimeout(function(){
				                                    document.location = '/logout/?action=Logout&pg=multi';
				                                },500);

				                        }
							else if (response.data['error'] == "Token Error") {
								this.global_token = response.data['token'];
								this.call_api("resend_vehicle_contract");
							} else if (response.data["error"] == "sms error") {
								this.global_error = "Error:" + response.data['msg'];
								this.global_token = response.data['token'];
							} else if (response.data["error"] == "email error") {
								this.global_error = "Email Error:" + response.data['msg'];
								this.global_token = response.data['token'];
							}else {
								this.global_error=response.data['error'];
								this.global_token = response.data['token'];
							}
							
						} else {
							this.float_error = response.data['error'];
							this.global_token = response.data['token'];
						}
					} else {
						this.float_error = 'Incorrect response recieved from server';
					}
				} else {
					this.float_error = 'There was an error:' + response.err_msg;
					this.global_token = response.data['token'];
				}
			});
		},
		vehicle_contract_signed: function() {
			this.$set(this.lead, 'contract_signed', 2);
			this.$set(this.lead, 'contract_signed_date', this.timestamp);
			this.save_status_fields();
		},
		call_api: function(vfunction, nextfunction,argument) {
			this.api_calls_queue.push({
				"function": vfunction,
				"next": nextfunction,
				"argument":argument
			});
			if (this.api_call_busy == false) {
				this.process_api_call_queue();
			}
		},
		process_api_call_queue_next: function() {
			this.api_call_busy = false;
			setTimeout(this.process_api_call_queue, 200);
		},
		process_api_call_queue: function() {
			if( this.api_calls_queue.length > 0 ){
				var api = this.api_calls_queue.splice(0,1)[0];
				try{
					 if(api['argument']!=undefined && api['argument']!=null)
					{
						this[ api['function'] ](api['argument']);
					}
					else{
						this[ api['function'] ]();
					}
					this.api_call_busy = true;
				}catch(e){
					console.log("Function name not found: " + api['function'] );
				}
			}
		},

		async generate_global_token(){
            try {
                await axios({
                    url: 'http://localhost:5000/generate_token',
                    method: 'get',
                }
                ).then(response => { 
                    this.global_token = response.data['token'];
                    if (this.exchange_edit_id != '') {
                        this.call_api("get_lead_details", false, false, false);
                    }
                    this.call_api("get_lead_status_history", false, false, false);
                    this.call_api("get_vehicle_contract_details");
                    this.validate_fields();
                    this.set_status_fields();
                    bsCustomFileInput.init(); /*Browse button name purpose*/
                    
                })
            }
            catch(error){
                    console.log(error.response)
            };
        }, 
		get_fup_date: function() {
			var currentDate = new Date();
			currentDate.setDate(currentDate.getDate() + 1);
			var day = currentDate.getDate();
			var month = currentDate.getMonth() + 1;
			var year = currentDate.getFullYear();
			if (month <= 9) {
				month = "0" + month;
			}
			if (day <= 9) {
				day = "0" + day;
			}
			var mdate = year + "-" + month + "-" + day;
			var tvar = "10:00";
			this.lead['status_followup_date'] = mdate + " " + tvar;

		},
		get_lead_details: function() {
			axios.post("/api_exchange_module.php", {
				"action": "get_lead_details_rec",
				"enc_exchange_id": this.exchange_edit_id,
				"token": this.global_token
			}).then(response => {
				this.process_api_call_queue_next();
				if (response.status == 200) {
					if (typeof(response.data) == "object") {
						if (response.data['status'] == "success") {
							this.lead = response.data['record'];
							if (this.lead['carimg_count'] == '' || this.lead['carimg_count'] == undefined) {
								this.lead['carimg_count'] = 0;
							}
							if (this.lead['pocession_date'] == '0000-00-00') {
								this.min_date = '';
								this.max_date = '';
							}
							this.next_fup = this.lead['status_followup_date'];
							this.get_fup_date();
							if (this.fup_date != '') {
								this.lead['status_followup_date'] = this.fup_date;
							}
							this.leadview=response.data['leadview'];
							this.customer_expec = this.lead['cust_exp'];
							this.executive_quote = this.lead['exe_quote'];
							this.img_file['price_agreement_doc']['filepath'] = this.lead['price_agreement_doc'];
							this.img_file['rel_proof']['filepath'] = this.lead['rel_proof'];
							this.global_token = response.data['token'];
							this.salesmode_list = response.data['salesmode_list'];

							this.data_formatCurrency();
							this.call_api("load_template", false, false, false);
						}else if (response.data['status'] == "fail"){ 
							if(response.data['error'] == "Session Expired"){
	                                this.global_error=response.data['error'];
	                                setTimeout(function(){
	                                    document.location = "/?event=SessionExpired";
	                                },500);

	                        }else if(response.data['error'] == "Concurrent Login"){
	        
	                                this.global_error=response.data['err_msg'];
	                                setTimeout(function(){
	                                    document.location = '/logout/?action=Logout&pg=multi';
	                                },500);
				                 
							} else if (response.data['error'] == "Token Error") {
								this.global_token = response.data['token'];
								this.call_api("get_lead_details");
							} else if (response.data['error'] == "Incorrect Lead Id") {
								document.location="/dashboard/exchange_module";
							} else {
								this.global_error=response.data['error'];
								this.global_token = response.data['token'];
							}
						} else {
							this.float_error = 'Incorrect response recieved from server - get lead details';
							this.global_token = response.data['token'];
						}

					} else {
						this.float_error = 'Incorrect response recieved from server - get lead details';
						this.global_token = response.data['token'];
					}
				} else {
					this.float_error = 'There was an error:' + response.err_msg;
					this.global_token = response.data['token'];
				}
			});
		},
		get_lead_status_history: function() {
			axios.post("/api_exchange_module.php", {
				"action": "selllead_status_history",
				"enc_exchange_id": this.exchange_edit_id,
				"token": this.global_token
			}).then(response => {
				this.process_api_call_queue_next();
				if (response.status == 200) {
					if (typeof(response.data) == "object") {
						if (response.data['status'] == "success") {
							this.status_history = response.data['status_history'];
							this.data_formatCurrency1();
							this.history_count = response.data['history_count'];
							this.status_list = response.data['status_list'];
							this.global_token = response.data['token'];
						} else if (response.data['status'] == "fail"){ 
							if(response.data['error'] == "Session Expired"){
				                                this.global_error=response.data['error'];
				                                setTimeout(function(){
				                                    document.location = "/?event=SessionExpired";
				                                },500);

				                        }else if(response.data['error'] == "Concurrent Login"){
			            
				                                this.global_error=response.data['err_msg'];
				                                setTimeout(function(){
				                                    document.location = '/logout/?action=Logout&pg=multi';
				                                },500);
				                 
							}
							else if (response.data['error'] == "Token Error") {
								this.global_token = response.data['token'];
								this.call_api("get_lead_status_history");
							}else {
								this.global_error=response.data['error'];
								this.global_token = response.data['token'];
							}
						} else {
							this.float_error = 'Incorrect response recieved from server - get lead status history';
							this.global_token = response.data['token'];
						}
					} else {
						this.float_error = 'Incorrect response recieved from server - get lead status history';
					}
				} else {
					this.float_error = 'There was an error:' + response.err_msg;
					this.global_token = response.data['token'];
				}
			});
		},
		get_vehicle_contract_details: function() {
			axios.post("/api_dealership_details.php", {
				"action": "get_lead_details_rec",
				"enc_exchange_id": this.exchange_edit_id,
				"token": this.global_token,
			}).then(response => {
				this.process_api_call_queue_next();
				if (response.status == 200) {
					if (typeof(response.data) == "object") {
						if (response.data['status'] == "success") {
							this.dealership_details = response.data['record'];
							this.total = this.inWords(this.dealership_details['exe_quote']);
							this.global_token = response.data['token'];
							this.contract_signdate = (this.dealership_details['contract_signed_date']).substr(0, 9);
							var dattime = (this.dealership_details['contract_signed_date']).substr(11, 2);
							this.contract_signtime = (this.dealership_details['contract_signed_date']).substr(11, 8);
							if (dattime < 12 && dattime != 0) {
								this.contract_signtime = this.contract_signtime + 'AM';
							} else if (dattime == 12) {
								this.contract_signtime = this.contract_signtime + 'PM';
							} else if (dattime > 12) {
								var dat = this.contract_signtime;
								this.contract_signtime = dat.replace(dattime, parseInt(dattime) - 12);
								this.contract_signtime = this.contract_signtime + 'PM';
							}
						} else if (response.data['status'] == "fail"){ 
							if(response.data['error'] == "Session Expired"){
				                                this.global_error=response.data['error'];
				                                setTimeout(function(){
				                                    document.location = "/?event=SessionExpired";
				                                },500);

				                        }else if(response.data['error'] == "Concurrent Login"){
			            
				                                this.global_error=response.data['err_msg'];
				                                setTimeout(function(){
				                                    document.location = '/logout/?action=Logout&pg=multi';
				                                },500);
				                 
							}
							else if (response.data['error'] == "Token Error") {
								this.global_token = response.data['token'];
								this.call_api("get_vehicle_contract_details");
							}else {
								this.global_error=response.data['error'];
								this.global_token = response.data['token'];
							}
						} else {
							this.global_error = 'Incorrect response recieved from server - get vehicle contract details';
							this.global_token = response.data['token'];
						}
					} else {
						this.global_error = 'Incorrect response recieved from server - get vehicle contract details';
					}
				} else {
					this.global_error = 'There was an error:' + response.err_msg;
					this.global_token = response.data['token'];
				}
			});
		},
		inWords: function(num) {
			var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
			var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

			if ((num = num.toString()).length > 9) return 'overflow';
			n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
			if (!n) return;
			var str = '';
			str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
			str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
			str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
			str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
			str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
			this.total = str;
			return str;
		},
		data_formatCurrency: function() {

			let rupeeIndian = Intl.NumberFormat("en-IN", {
				//style: "currency",
				currency: "INR",

			});

			if (this.lead['exe_quote'] != '' && this.lead['exe_quote'] > 0) {
				this.lead['exe_quote'] = rupeeIndian.format(Number(this.lead['exe_quote']));

			}

			if (this.lead['mg_grid_min'] != '' && this.lead['mg_grid_min'] > 0) {
				this.lead['mg_grid_min'] = rupeeIndian.format(Number(this.lead['mg_grid_min']));

			}
			if (this.lead['mg_grid_max'] != '' && this.lead['mg_grid_max'] > 0) {
				this.lead['mg_grid_max'] = rupeeIndian.format(Number(this.lead['mg_grid_max']));

			}


		},
		data_formatCurrency1: function() {

			let rupeeIndian = Intl.NumberFormat("en-IN", {
				//style: "currency",
				currency: "INR",

			});


			if (this.status_history.length > 0) {
				for (let i = 0; i < this.status_history.length; i++) {

					this.status_history[i]['data']['cust_exp'] = rupeeIndian.format(Number(this.status_history[i]['data']['cust_exp']));
					this.status_history[i]['data']['exe_quote'] = rupeeIndian.format(Number(this.status_history[i]['data']['exe_quote']));

					if (this.status_history[i]['data']['mg_exp_price'] != '' && this.status_history[i]['data']['mg_exp_price'] > 0) {
						this.status_history[i]['data']['mg_exp_price'] = rupeeIndian.format(Number(this.status_history[i]['data']['mg_exp_price']));

					}

					if (this.status_history[i]['data']['actual_bp'] != '' && this.status_history[i]['data']['actual_bp'] > 0) {
						this.status_history[i]['data']['actual_bp'] = rupeeIndian.format(Number(this.status_history[i]['data']['actual_bp']));

					}

					if (this.status_history[i]['data']['other_expenses'] != '' && this.status_history[i]['data']['other_expenses'] > 0) {
						this.status_history[i]['data']['other_expenses'] = rupeeIndian.format(Number(this.status_history[i]['data']['other_expenses']));
					}
					if (this.status_history[i]['data']['expected_selling_price'] != '' && this.status_history[i]['data']['expected_selling_price'] > 0) {
						this.status_history[i]['data']['expected_selling_price'] = rupeeIndian.format(Number(this.status_history[i]['data']['expected_selling_price']));
					}
				}

			}
		},
		load_template: function() {
			axios.get("/templates/config_selllead_status_sub_template_v6.js").then(response => {
				if (response.status == 200) {
					if (typeof(response.data) == "object") {
						try {
							this.template = response.data;
							this.load_close_template();
							
						} catch (e) {
							alert("There was an error loading configs! " + e);
						}
					} else {
						alert("incorrect response format! \n" + response.data);
					}
				} else {
					this.float_error = 'Configuration loading error:' + response.status;
					this.vshow = false;
				}
			});
		},
		load_close_template: function() {
			axios.get("/templates/config_sellleads_status_close_template_v4.js").then(response => {
				if (response.status == 200) {
					if (typeof(response.data) == "object") {
						try {
							this.close_template = response.data;
							for (var j in this.template) {
								if (j != "9" && j != "30" && j != "90" && j != "999" && j != "9999" && j != "1111" && j != "7777") {
									this.$set(this.template[j]['q1']['z'], 'sub', JSON.parse(JSON.stringify(this.close_template['z'])));
									for (var z in this.close_template['fields']) {
										this.$set(this.template[j]['fields'], z + '', JSON.parse(JSON.stringify(this.close_template['fields'][z])));
									}
								}
							}

							this.set_status_fields();
							this.check_leadupdates();
							this.restrict_updates();
						} catch (e) {
							alert("There was an error loading configs! " + e);
						}
					} else {
						alert("incorrect response format! \n" + response.data);
					}
				} else {
					this.float_error = 'Configuration loading error:' + response.status;
					this.vshow = false;
				}
			});
		},
		restrict_updates: function(opt) {
			if (this.lead['status'] == '10' && this.lead['evaluation_done'] == 1 && (this.lead['accessories_d'] != '' || this.lead['accessories_d'] != null) && (parseInt(this.lead['carimg_count']) >= '10')) {
				var st = false;
				if (opt == 'q1_a' || opt == 'q1_b') {
					st = true;
					//this.isActive=true;
				} else {
					st = false;
					// this.isActive=false;

				}
			}
			if (this.lead['status'] == '20' && this.lead['evaluation_done'] == 1 && (this.lead['accessories_d'] != '' || this.lead['accessories_d'] != null) && (parseInt(this.lead['carimg_count']) >= '10')) {

				if (opt == 'q1_a') {
					st = true;
					//this.isActive=true;
				} else {
					st = false;
					//this.isActive=false;
				}
			}
			if (this.lead['status'] == '50' && this.lead['contract_signed'] == '2') {
				if (opt == 'q1_b') {
					st = true;

				} else {
					st = false;
				}
			}
			if (st === true) {
				this.isActive = true;
			} else {
				this.isActive = false;
			}
			return st;
			this.set_status_fields();

		},
		check_leadupdates: function() {
			var edit_id = this.exchange_edit_id;
			if (this.lead['evaluation_done'] == 1 && (this.lead['accessories_d'] != '' || this.lead['accessories_d'] != null) && (parseInt(this.lead['carimg_count']) >= '10')) {
				if (this.lead['status'] == '10') {
					this.lead['q1'] = 'c';
					this.q1_changed();
					var oth_exp = this.lead['other_expenses'];
					var exp_sp = this.lead['expected_selling_price'];
					if (typeof(this.lead['other_expenses']) == 'string') {
						oth_exp = this.lead['other_expenses'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

					}
					if (typeof(this.lead['expected_selling_price']) == 'string') {
						exp_sp = this.lead['expected_selling_price'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

					}
					if (this.lead['status'] == '20') {
						this.lead['q1'] = 'b';
						this.q1_changed();
						if (typeof(this.lead['other_expenses']) == 'string') {
							var oth_exp = this.lead['other_expenses'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

						}
						if (typeof(this.lead['expected_selling_price']) == 'string') {
							var exp_sp = this.lead['expected_selling_price'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

						}
					}
				} else {
					if (this.lead['status'] == '10') {
						this.lead['q1'] = 'b';
						this.lead['q2'] = 'a';
						this.lead['q3'] = '';
					}
					if (this.lead['status'] == '20') {
						this.lead['q1'] = 'a';
						this.lead['q2'] = 'a';
						this.lead['q3'] = '';
					}
				}
			}
			if (this.lead['documents_checked'] == 'yes') {
				if (this.lead['status'] == '60' && this.lead['q1'] == 'a') {
					this.lead['q2'] = 'a';
				}
				if (this.lead['status'] == '60' && this.lead['q1'] == 'b') {
					this.lead['q2'] = 'a';
				}
			}

		},
		validate_fields: function() {
			//console.log(this.lead['status_followup_date']);
			var err_cnt = 0;
			this.validation_error = false;
			if ((this.lead['status'] == '10' && this.lead['q1'] == 'b' && this.lead['q2'] == 'a') || (this.lead['status'] == '20' && this.lead['q1'] == 'a' && this.lead['q2'] == 'a')) {
				if (this.lead['q3'] != '') {
					var edit_id = this.exchange_edit_id;
					if (this.lead['make'] == 'MG' && (this.lead['chassis_num'] == '' || this.lead['chassis_num'] == null)) {
						setTimeout(function() {
							window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/car_details"
						}, 1000);
					} else if ((this.lead['reg_type'] == '' || this.lead['manuf_year'] == '' || this.lead['color'] == '' || this.lead['fuel_type'] == '') ) {
						setTimeout(function() {
							window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/car_details"
						}, 1000);
					} else if (this.lead['evaluation_done'] != 1) {
						setTimeout(function() {
							window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/evaluation"
						}, 1000);
					} else if ((this.lead['accessories_d'] == '' || this.lead['accessories_d'] == null) && this.lead['template_values'] != '' && this.lead['is_mannual'] != '1' ) {
						setTimeout(function() {
							window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/accessories"
						}, 1000);
					} else if (parseInt(this.lead['carimg_count']) < '10') {
						//console.log('h1');
						setTimeout(function() {
							window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/car_images"
						}, 1000);
					}
					else {

					}
					return false;
				}
			}
			if (this.next_status >= '50' && (this.lead['actual_bp'] == "" || this.lead['actual_bp'] == 0)) {
				this.lead['actual_bp'] = this.lead['exe_quote'];
				this.save_status_fields();
			}
			if (this.lead['make'] == 'MG' && this.lead['status'] == '30' && this.next_status == '40') {
				var mg_grid_min = this.lead['mg_grid_min'];
				var mg_grid_max = this.lead['mg_grid_max'];
				if (typeof(this.lead['mg_grid_min']) == 'string') {
					mg_grid_min = this.lead['mg_grid_min'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

				}
				if (typeof(this.lead['mg_grid_max']) == 'string') {
					mg_grid_max = this.lead['mg_grid_max'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

				}
				if (mg_grid_min < 1 || mg_grid_max < 1) {
					this.validation_error = "MG grid price not given";
					return false;
				}
			}
			if (this.next_status != '9' && this.next_status != '10' && this.next_status != '9999') {
				if (((this.lead['status'] == '10' && this.lead['q1'] == 'c') || (this.lead['status'] == '20' && this.lead['q1'] == 'b'))) {
					var v_lead = 0;
					if (this.lead['reason_for_sell'] == 'Wants to buy another used car') {

					} else if (this.lead['reason_for_sell'] == 'Wants to buy new car' || this.lead['reason_for_sell'] == 'Already bought MG new car' || this.lead['reason_for_sell'] == 'Already bought MG used car') {
						delete this.validate_lead_details.enc_emake_id;
						delete this.validate_lead_details.enc_evariant_id;
					} else if (this.lead['reason_for_sell'] != 'Wants to buy new car' && this.lead['reason_for_sell'] != 'Already bought MG new car' && this.lead['reason_for_sell'] != 'Already bought MG used car') {
						delete this.validate_lead_details.enc_emake_id;
						delete this.validate_lead_details.enc_emodel_id;
						delete this.validate_lead_details.enc_evariant_id;
					}
					for (var i in this.validate_lead_details) {
						if (this.lead[i] == '') {
							v_lead = 1;
						}
					}
					if (v_lead == 1 && this.lead['q2'] != 'a') {
						this.validation_error = "Please update lead details to move lead to next status";
						return false;
					}
				}
				if (((this.lead['status'] == '10' && this.lead['q1'] == 'c') || (this.lead['status'] == '20' && this.lead['q1'] == 'b')) && (this.lead['reg_type'] == '' || this.lead['manuf_year'] == '' || this.lead['color'] == '' || this.lead['fuel_type'] == '')) {
					if (this.lead['q2'] != 'a') {
						this.validation_error = "Please update car details to move lead to next status";
						return false;
					}
				}

				if (((this.lead['status'] == '10' && this.lead['q1'] == 'c') || (this.lead['status'] == '20' && this.lead['q1'] == 'b')) && (this.lead['reg_type'] != 'Unregistered' && this.lead['reg_type'] != '' && (this.lead['reg_date'] == '' || this.lead['ins_id'] == '' || this.lead['reg_num'] == null))) {
					if (this.lead['q2'] != 'a') {
						this.validation_error = "Please update car details to move lead to next status";
						return false;
					}
				}
				if (((this.lead['status'] == '10' && this.lead['q1'] == 'c') || (this.lead['status'] == '20' && this.lead['q1'] == 'b')) && (this.lead['ins_id'] != '3' && this.lead['ins_id'] != '' && this.lead['ins_exp_dt'] == '')) {
					if (this.lead['q2'] != 'a') {
						this.validation_error = "Please update car details to move lead to next status";
						return false;
					}
				}
				if (((this.lead['status'] == '10' && this.lead['q1'] == 'c') || (this.lead['status'] == '20' && this.lead['q1'] == 'b')) && (this.lead['make'] == 'MG' && this.lead['chassis_num'] == null)) {
					if (this.lead['q2'] != 'a') {
						this.validation_error = "Please update car details to move lead to next status";
						return false;
					}
				}
				if ((this.lead['status'] == '10' && this.lead['q1'] == 'c' && this.lead['evaluation_done'] != 1) || (this.lead['status'] == '20' && this.lead['q1'] == 'b' && this.lead['evaluation_done'] != 1)) {
					if (this.lead['q2'] != 'a') {

						this.validation_error = "Please update evaluation details to move lead to next status";
						return false;
					}

				}
				if ((this.lead['status'] == '10' && this.lead['q1'] == 'c' && this.lead['damage_img'] == '' && this.lead['damage_img'] == null) || (this.lead['status'] == '20' && this.lead['q1'] == 'b' && this.lead['damage_img'] == '' && this.lead['damage_img'] == null)) {
					if (this.lead['q2'] != 'a') {
						this.validation_error = "Please upload damage image to move lead to next status";
						return false;
					}

				}
				if (((this.lead['status'] == '10' && this.lead['q1'] == 'c') || (this.lead['status'] == '20' && this.lead['q1'] == 'b')) && (parseInt(this.lead['carimg_count'])) < '10') {
					if (this.lead['q2'] != 'a') {
						this.validation_error = "Please upload all car images to move lead to next status";
						return false;
					}
				}
				if (((this.lead['status'] == '10' && this.lead['q1'] == 'c') || (this.lead['status'] == '20' && this.lead['q1'] == 'b')) && (this.lead['accessories_d'] == '' || this.lead['accessories_d'] == null)) {
					if (this.lead['q2'] != 'a' && (this.lead['is_mannual'] == '0' || this.lead['is_mannual'] == '3')) {
						this.validation_error = "Please update accessories data to move lead to next status";
						return false;
					}
				}
				if (this.lead['status'] == '30' && this.lead['role_id'] != '1') {
					this.validation_error = "Price Should be approved to move lead to next status";
					return false;
				}

				if (this.lead['status'] == '60' || this.lead['status'] == '70') {
					if (((this.lead['q1'] == 'a' && this.lead['q2'] == 'a') || (this.lead['q1'] == 'b' && this.lead['q2'] == 'a')) && (this.lead['documents_checked'] != 'yes')) {
						this.validation_error = "Please update documents to move lead to next status";
						return false;
					}
				}
				if ((this.next_status == '999' || this.next_status == '80') && this.lead['documents_checked'] != 'yes') {
					this.validation_error = "Please update documents to move lead to next status";
					return false;
				}
				if (this.status_field_option) {
					if (this.status_field_option in this.template[this.lead['status']]['fields']) {
						for (var fkey = 0; fkey < this.template[this.lead['status']]['fields'][this.status_field_option]['fields'].length; fkey++) {
							var fv = this.template[this.lead['status']]['fields'][this.status_field_option]['fields'][fkey];
							if (fv['type'] == 'agreement_file' || fv['type'] == 'file') {
								if (this.lead[fv['db-field']] != '' && this.img_file[fv['db-field']]['selected_file'] != false && this.img_file[fv['db-field']]['uploaded'] == false) {
									this.lead[fv['db-field']] = "";
									this.img_file[fv['db-field']]['selected_file'] = false;
								}
							}
						}
					}
				}
			}
			if (this.status_field_option) {
				if (this.status_field_option in this.template[this.lead['status']]['fields']) {
					for (var fkey = 0; fkey < this.template[this.lead['status']]['fields'][this.status_field_option]['fields'].length; fkey++) {
						var fv = this.template[this.lead['status']]['fields'][this.status_field_option]['fields'][fkey];
						if (fv['type'] == 'datetime') {
							if (this.lead[fv['db-field']] == 'NA') {
								this.lead[fv['db-field']] = '0000-00-00 00:00';
							}
							if (this.lead[fv['db-field']].substr(0, 4) == '0000' || this.lead[fv['db-field']]=='') {
								this.validation_error = fv['name'] + " required";
								break;
							} else if (this.lead[fv['db-field']].substr(11, 2) == '00') {
								this.validation_error = fv['name'] + " time required";
								break;
								var dt = new Date();
								var dt2 = new Date(this.lead[fv['db-field']]);

								if (dt >= dt2) {
									this.validation_error = fv['name'] + " Should be greater than today's date";
									break;
								}

							} else if (this.lead[fv['db-field']].substr(11, 2) != '00') {
								var dt = new Date();
								var dt2 = new Date(this.lead[fv['db-field']]);
								if (dt >= dt2) {
									this.validation_error = fv['name'] + " Should be greater than today's date";
									break;
								}
								var t1 = this.lead[fv['db-field']].substr(11, 2);
								var t2 = dt.getHours();
								if (t1 < t2 && dt == dt2) {
									this.validation_error = fv['name'] + " Should be greater than today's date and time";
									break;
								}
							}
						} else if (fv['type'] == 'date') {
							if (this.lead[fv['db-field']].substr(0, 4) == '0000' || this.lead[fv['db-field']]=='') {
								this.validation_error = fv['name'] + " required";
								break;
							} else {
								var dt = new Date();
								var dt2 = new Date(this.lead[fv['db-field']]);
								if (fv['db-field'] == 'pocession_date' && (this.next_status == '90' || this.next_status == '999')) {
									m1 = dt.getMonth();
									m2 = dt2.getMonth();
									dt = dt.getDate();
									dt2 = dt2.getDate();
									if (dt < dt2 || m1 != m2) {
										//	this.validation_error = fv['name'] + " Should be less than today's date";
										this.validation_error = fv['name'] + " should lie in between 1st day of the current month and today's date";
										break;
									}
								} else {
									if (dt >= dt2) {
										this.validation_error = fv['name'] + " Should be greater than today's date";
										break;
									}

								}
							}
						} else if (fv['type'] == 'number') {
							if (this.lead['status'] == '10' && this.lead['q1'] == 'a') {
								this.validation_error = false;
							} else {
								if (fv['db-field'] == 'other_expenses') {
									this.validation_error = false;
								} else if (this.lead[fv['db-field']] == '' || this.lead[fv['db-field']] <= '0' || this.lead[fv['db-field']] == '0') {
									this.validation_error = fv['name'] + " required";
									break;
								}
							}
						} else if (fv['type'] == 'vehicle-contract') {

							this.validation_error = false;
						} else if (fv['type'] == 'agreement_file' || fv['type'] == 'file') {

							this.validation_error = false;
						} else if (fv['type'] == 'text') {
							if (this.lead[fv['db-field']] != '') {
								var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
								this.lead[fv['db-field']] = this.lead[fv['db-field']].replace(regex, "");
								if (this.lead[fv['db-field']].match(regex) != null) {
									this.validation_error = 'please enter valid remarks.Emojis are not allowed.';
									break;
								} else {
									this.validation_error = false;
								}
								if (/<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE|a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|\/h1|\/h2|\/h3|\/h4|\/h5|\/h6|\/html|\/div|\/br|\/table|\/tr|\/td|\/span|\/li|\/ul|var|video).*?>|<(video).*?<\/\2>/i.test(this.lead[fv['db-field']]) == true) {
									this.validation_error = 'please enter valid remarks.Html tags are not allowed.';
									break;
								} else {
									this.validation_error = false;
								}

								var txt_regex = /^[a-zA-Z0-9 \\s,./()\n'-]*$/;
								if (this.lead[fv['db-field']].match(txt_regex) == null) {
									this.validation_error = 'please enter valid remarks.';
									break;
								}

							} else {
								this.validation_error = false;
							}
						} else {
							if (this.lead[fv['db-field']] == '') {
								//console.log( "empty: " + fv['db-field'] );
								this.validation_error = fv['name'] + " required";
								break;
							}
						}
					}
				}
			}
		},
		save_status_fields: function() {		
            if ((this.lead['status'] == '10' && this.lead['q1'] == 'b' && this.lead['q2'] == 'a') || (this.lead['status'] == '20' && this.lead['q1'] == 'a' && this.lead['q2'] == 'a')) {
                if (this.lead['q3'] != '') {
                    var edit_id = this.exchange_edit_id;
                    if (this.lead['make'] == 'MG' && (this.lead['chassis_num'] == '' || this.lead['chassis_num'] == null) ) {
                        setTimeout(function() {
                            window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/car_details"
                        }, 1000);
                    } else if ((this.lead['reg_type'] == '' || this.lead['manuf_year'] == '' || this.lead['color'] == '' || this.lead['fuel_type'] == '') ) {
                        setTimeout(function() {
                            window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/car_details"
                        }, 1000);
                    } else if (this.lead['evaluation_done'] != 1) {
                        setTimeout(function() {
                            window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/evaluation"
                        }, 1000);
                    } else if ((this.lead['accessories_d'] == '' || this.lead['accessories_d'] == null) && this.lead['template_values'] != '' && this.lead['is_mannual'] != '1') {
                        setTimeout(function() {
                            window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/accessories"
                        }, 1000);
                    } else if (parseInt(this.lead['carimg_count']) < '10') {
                        //console.log('h1');
                        setTimeout(function() {
                            window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/car_images"
                        }, 1000);
                    } else {

                    }
                    return false;
                }
            }
            if ((this.lead['status'] == '10' && this.lead['q1'] == 'b' && this.lead['q2'] == 'a') || (this.lead['status'] == '20' && this.lead['q1'] == 'a' && this.lead['q2'] == 'a')) {
                if (this.lead['q3'] == 'a') {
                    this.lead['inspection_at'] = '1';
                    this.lead['q3'] = '';
                } else if (this.lead['q3'] == 'b') {
                    this.lead['inspection_at'] = '2';
                    this.lead['q3'] = '';
                }
            }
            if (this.lead['status'] == '40' && this.next_status == '50') {
                this.lead['actual_bp'] = this.lead['exe_quote'];
            }
            var vpostdata = {
                "q1": this.lead['q1'],
                "q2": this.lead['q2'],
                "q3": this.lead['q3'],
                "q4": this.lead['q4'],
                "status_followup_date": this.lead['status_followup_date'],
                "new_status": this.next_status,
                "status": this.lead['status'],
                "cust_exp": this.lead['cust_exp'],
                "exe_quote": this.lead['exe_quote'],
                "inspection_at": this.lead['inspection_at'],
                "status_remarks": this.lead['status_remarks'],
                "trade_in_date": this.lead['trade_in_date'],
                "mg_exp_price": this.lead['mg_exp_price'],
                "actual_bp": this.lead['actual_bp'],
                "sales_mode": this.lead['sales_mode'],
                "pocession_date": this.lead['pocession_date'],
                "price_agreement": this.lead['price_agreement'],
                "price_agreement_doc": this.lead['price_agreement_doc'],
                "contract_sent": this.lead['contract_sent'],
                "contract_sent_date": this.lead['contract_sent_date'],
                "contract_signed": this.lead['contract_signed'],
                "contract_signed_date": this.lead['contract_signed_date'],
                "rel_proof": this.lead['rel_proof'],
                "expected_selling_price": this.lead['expected_selling_price'],
                "other_expenses": this.lead['other_expenses'],
            }

            axios.post("/api_exchange_module.php", {
                "action": "selllead_save_status_fields",
                "enc_exchange_id": this.exchange_edit_id,
                "postdata": vpostdata,
                "cust_exp": this.customer_expec,
                "exe_quote": this.executive_quote,
                "token": this.global_token
            }).then(response => {
                this.float_error = "";
                this.process_api_call_queue_next();
                if (response.status == 200) {
                    if (typeof(response.data) == "object") {
                        if (response.data['status'] == "success") {
                            this.update_msg = "Details Saved!";
                            setTimeout(function(v) {
                                v.update_msg = false;
                            }, 3000, this);
                            //this.data_formatCurrency();
                            this.global_token = response.data['token'];
                            //this.validate_fields();
                        } else if (response.data['status'] == "fail"){ 
                            if(response.data['error'] == "Session Expired"){
                                    this.global_error=response.data['error'];
                                    setTimeout(function(){
                                        document.location = "/?event=SessionExpired";
                                    },500);
                            }else if(response.data['error'] == "Concurrent Login"){

                                this.global_error=response.data['err_msg'];
                                setTimeout(function(){
                                    document.location = '/logout/?action=Logout&pg=multi';
                                },500);
                                    
                            } else if (response.data["error"] == "validation error") {
                                for (var i in response.data["err_msg"]) {
                                    this.validation_error = response.data["err_msg"][i];
                                }
                                this.global_token = response.data['token'];
                            } else if (response.data['error'] == "Token Error") {
                                this.global_token = response.data['token'];
                                this.call_api("save_status_fields");
                            } else if (response.data['error'] == "Lead modified") {
                                this.validation_error = response.data['err_msg'];
                                this.global_token = response.data['token'];
                                var edit_id = this.exchange_edit_id;
                                setTimeout(function() {
                                    window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/status_updates"
                                }, 2000);
                            } else{
                                    this.global_token = response.data['token'];
                                    this.float_error=response.data['error'];
                            }
                        }else {
                            this.float_error = 'Incorrect response recieved from server';
                            this.global_token = response.data['token'];
                            
                        }
                    } else {
                        this.float_error = 'Incorrect response recieved from server';
                    }
                } else {
                    this.float_error = 'There was an error:' + response.err_msg;
                    this.global_token = response.data['token'];

                }

            });
		},
		update_status: function() {
			if ((this.lead['status'] == '10' && this.lead['q1'] == 'b' && this.lead['q2'] == 'c') || (this.lead['status'] == '20' && this.lead['q1'] == 'a' && this.lead['q2'] == 'c')) {
				var edit_id = this.exchange_edit_id;
				setTimeout(function() {
					window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/evaluation"
				}, 1000);
				return false;
			}
			this.hide_loader = true;
			this.save_btn = false;
			if (this.lead['q2'] != '') {
				var q2_val = this.template[this.lead['status']]['q1'][this.lead['q1']]['sub'][this.lead['q2']]['name'];
			} else {
				var q2_val = '';
			}

			if (this.lead['q3'] != '') {
				var q3_val = this.template[this.lead['status']]['q1'][this.lead['q1']]['sub'][this.lead['q2']]['sub'][this.lead['q3']]['name'];
			} else {
				var q3_val = '';
			}
			if (this.next_status >= '50' && (this.lead['actual_bp'] == "" || this.lead['actual_bp'] == 0)) {
				this.lead['actual_bp'] = this.lead['exe_quote'];
				this.save_status_fields();
			}
			var vpostdata = {
				"cust_exp": this.lead['cust_exp'],
				"exe_quote": this.lead['exe_quote'],
				"mg_exp_price": this.lead['mg_exp_price'],
				"actual_bp": this.lead['actual_bp'],
				"expected_selling_price": this.lead['expected_selling_price'],
				"other_expenses": this.lead['other_expenses'],
			}
			axios.post("/api_exchange_module.php", {
				"action": "selllead_update_status",
				"enc_exchange_id": this.exchange_edit_id,
				"new_status": this.next_status,
				"status": this.lead['status'],
				"q1_val": this.template[this.lead['status']]['q1'][this.lead['q1']]['name'],
				"q2_val": q2_val,
				"q3_val": q3_val,
				"cust_exp": this.customer_expec,
				"exe_quote": this.executive_quote,
				"status_followup_date": this.lead['status_followup_date'],
				"postdata": vpostdata,
				"token": this.global_token

			}).then(response => {
				this.float_error = "";
				this.process_api_call_queue_next();
				if (response.status == 200) {
					if (typeof(response.data) == "object") {
						if (response.data['status'] == "success") {
							this.hide_loader = false;
							this.save_btn = false;
							//	this.data_formatCurrency();
							document.location.reload();
						} else if (response.data['status'] == "fail"){ 
								if(response.data['error'] == "Session Expired"){
									this.global_error=response.data['error'];
									setTimeout(function(){
										document.location = "/?event=SessionExpired";
									},500);

								}else if(response.data['error'] == "Concurrent Login"){

									this.global_error=response.data['err_msg'];
									setTimeout(function(){
										document.location = '/logout/?action=Logout&pg=multi';
									},500);
					                 
								} else if (response.data["error"] == "validation error") {
									this.validation_error = response.data['msg'];
									this.hide_loader = false;
									this.save_btn = true;
									this.global_token = response.data['token'];
								} else if (response.data['error'] == "Token Error") {
									this.global_token = response.data['token'];
									this.update_status();
								} else if (response.data['error'] == "Lead modified") {
									this.validation_error = response.data['err_msg'];
									this.global_token = response.data['token'];
									var edit_id = this.exchange_edit_id;
									setTimeout(function() {
										window.location.href = "/dashboard/exchange_module_edit/" + edit_id + "/status_updates"
									}, 2000);
								} else if (response.data["error"] == "api error") {
									this.global_error = "DBM Error:" + response.data['msg'];
									this.hide_loader = false;
									this.save_btn = true;
									this.global_token = response.data['token'];
								} else if (response.data["error"] == "c4c error") {
									this.global_error = "C4C Error:" + response.data['msg'];
									this.hide_loader = false;
									this.save_btn = true;
									this.global_token = response.data['token'];
								} else{
									this.global_token = response.data['token'];
									this.hide_loader = false;
									this.save_btn = true;
									this.float_error=response.data['error'];
								}
						} else {
							this.float_error = 'Incorrect response recieved from server';
							this.hide_loader = false;
							this.save_btn = true;
						}
						
					} else {
						this.float_error = 'Incorrect response recieved from server';
						this.hide_loader = false;
						this.save_btn = true;
					}
				} else {
					this.float_error = 'There was an error:' + response.err_msg;
					this.global_token = response.data['token'];
					this.hide_loader = false;
					this.save_btn = true;
				}
			});
		}
	}
}
</script>