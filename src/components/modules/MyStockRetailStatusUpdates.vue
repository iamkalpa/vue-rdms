<template>
<div style="min-height:87vh;">
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
	<div v-if="'status' in inventory ==false">
		<h3>Loading inventory Details...</h3>
	</div>
	<div v-else-if="'200' in template ==false">
		<h3>Loading Template...</h3>
	</div>
	<div v-else>
		<div class="mt-3">
			<div>
				<span style="font-size:22px;margin-right:15px;">
					<b>
					<span v-if="inventory['status']>=600" style="color:#059805">{{ template[ inventory['status'] ]['name'] }}</span>
					<span v-else style="color:#056BA6">{{ template[ inventory['status'] ]['name'] }}</span>
					</b>
				</span>
				<span>(Old Remarks: <span v-if="inventory['prev_status_remarks']!=''">{{ inventory['prev_status_remarks'] }}</span>
				<span v-else>NA</span>) </span>
			</div>
			<div>
				<span v-if="inventory['status']=='500'&&inventory['make']!='MG'" class="ml-5">
				</span>
				<span v-else>
					<strong >{{ template[ inventory['status'] ]['title'] }} </strong>
				</span>
			</div>
		</div>
		<div class="mt-3 ml-5" v-if="inventory['status']!=400">
			<div v-for="q1q,q1i in template[ inventory['status'] ]['q1']" >
				<label ><input type="radio" name="q1" v-model="inventory['q1']"  v-bind:value="q1i" class="mx-1" v-on:change="q1_changed"> {{ q1q['name'] }} </label>
				<template v-if="inventory['q1']==q1i&&template[ inventory['status'] ]['q1'][ inventory['q1'] ]['sub']!=false">
				<div  style="margin-left:100px;">
					<div v-for="q2q,q2i in template[ inventory['status'] ]['q1'][ inventory['q1'] ]['sub']">
						<label> <input name="q2"  type="radio" v-model="inventory['q2']" v-bind:value="q2i" class="mx-1" v-on:change="q2_changed"> {{ q2q['name'] }} </label>
						<template v-if="inventory['q2']==q2i&&template[ inventory['status'] ]['q1'][ inventory['q1'] ]['sub'][ inventory['q2'] ]['sub']!=false">
						<div style="margin-left:100px;">
							<div v-for="q3q,q3i in template[ inventory['status'] ]['q1'][ inventory['q1'] ]['sub'][ inventory['q2'] ]['sub']">
								<label> <input name="q3"  type="radio"  v-model="inventory['q3']" v-bind:value="q3i" class="mx-1" v-on:change="q3_changed"> {{ q3q['name'] }} </label>
								<template v-if="inventory['q3']==q3i&&template[ inventory['status'] ]['q1'][ inventory['q1'] ]['sub'][ inventory['q2'] ]['sub'][ lead['q3'] ]['sub']!=false">
								<div style="margin-left:100px;">
									<div v-for="q4q,q4i in template[ inventory['status'] ]['q1'][ inventory['q1'] ]['sub'][ inventory['q2'] ]['sub'][ inventory['q3'] ]['sub']">
										<label> <input name="q4"  type="radio"  v-model="inventory['q4']" v-bind:value="q4i" class="mx-1" v-on:change="q4_changed"> {{ q4q['name'] }} </label>
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
		<div v-if="status_field_option in template[ inventory['status'] ]['fields']==false">
			<div v-if="inventory['status']<400">Please select appropriate status options</div>
		</div>
		<div v-else>
			<div class="mb-2" v-for="fv,fi in template[ inventory['status'] ]['fields'][ status_field_option ]['fields']">
				<div v-if="inventory['status']!=400">
					<div v-if="fv['type']=='message'">
						<div class="alert alert-success alert-sm">{{ fv['message'] }}</div>
					</div>
					<div v-else class="row">
						<label for="" class="col-4 col-form-label">{{ fv['name'] }}</label>
						<div class="col-8">
							<div v-if="fv['type']=='datetime'">
								<span>{{inventory['certification_date']}}</span>
							</div>
							<div v-else-if="fv['type']=='text'">
								<textarea maxlength="1000" v-model="inventory[ fv['db-field']+'' ]" v-bind:readonly="(inventory['status']==400&&inventory['role_id']!='1')" class="form-control form-control-sm" v-on:keyup="edited_field(fv['db-field'])"></textarea>
							</div>
							<div v-else-if="fv['type']=='checkbox'">
								<span v-for="val,id in fv['options'][0]" class="mr-3">
									<label><input type="checkbox" v-model="list_on"  v-bind:value="id"  v-on:blur="edited_field(fv['db-field'])"> {{val}}</label>
								</span>
							</div>
							<div v-else-if="fv['type']=='number'" class="d-flex">
								<span style="background: rgb(228, 228, 228); padding: 2px 8px; border-radius: 3px 0px 0px 3px; font-size: 18px;">&#x20B9;</span>
								<input type="text" align="right"  @input="formatCurrency(fv['db-field']+'')"  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: calc(100% - 10px); border-radius: 0px 4px 4px 0;}" v-model="inventory[ fv['db-field']+'' ]"  class="form-control form-control-sm" v-on:keyup="edited_field(fv['db-field'])" maxlength="10">
							</div>
							<div v-else-if="fv['type']=='date'">
								<input type="date" v-model="inventory[ fv['db-field']+'' ]" id=""  class="form-control form-control-sm" v-on:change="edited_field(fv['db-field'])">
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-bind:class="{'alert alert-danger alert-sm m-2 w-100':(form_error)}" v-if="form_error">
				{{form_error}}
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
			</div>
		</div>
		<div class="alert alert-danger alert-sm" >
            <center v-if="validation_error">
			<p>{{ validation_error }}</p>
			</center>
			<center class="m-4" v-if="next_status=='' && inventory['status']!=1111 && inventory['status']!=7777">
			<p>There is no status change available</p>
			</center>
			<center class="m-4" v-else-if="validation_error==false&&inventory['status']=='400'&&inventory['make']=='MG'">
			<div class="alert alert-danger alert-sm" >
				<p>Need certification approval by MG .</p>
			</div>
			</center>
			<center class="m-4" v-else-if="validation_error==false&&inventory['status']=='400'&&inventory['img_cnt']<1">
			<div class="alert alert-danger alert-sm" >
				<p>Please update car images to move inventory to next status</p>
			</div>
			</center>
			<center class="m-4" v-else-if="validation_error==false&&next_status!=''">
			<div class="alert alert-success alert-sm" >
				<p>Click here to move lead to Next Status: <b>{{ template[ next_status]['name'] }}</b></p>
				<div><button class="btn btn-sm btn-red" v-on:click="update_status">UPDATE STATUS</button></div>
			</div>
			</center>
			
		</div>
		<div v-if="update_msg" style="position:fixed; bottom:0px; right:0px; z-index:600; box-shadow:-2px -2px 4px #999; background-color:white; color: blue; padding:10px;">{{ update_msg }}</div>
		<div class="mt-5">
			<div><b>Status Update History:</b></div>
			<div class="mt-2">
				<table class="table table-bordered table-sm">
					<thead class="bg-secondary text-white">
						<td>Updated Date & Time</td>
						<td>Current Status</td>
						<td>Previous Update</td>
						<td>Remarks</td>
						<td>Updated By</td>
					</thead>
					<tbody>
						<tr v-for="v,i in status_history">
							<td>{{v['datetime']}}</td>
							<td>{{status_list[v['new_status']]}}</td>
							<td>
								<div><span v-if="v['status']" >{{status_list[v['status']]}}</span><span v-else>NA</span></div>
								<div>{{v['q1_val']}}</div>
								<div v-if="v['status']=='200'&&v['q1']=='b'">
									Expected Date Of Refurbishment: {{v['data']['refurb_date']}}
								</div>
								<div v-if="v['new_status']=='300'">Refurbishment Date: {{v['data']['refurb_date']}} </div>
								<div v-if="v['new_status']=='400'&&v['q1']=='a'">Certification Date: {{v['data']['certification_date']}} </div>
								<div v-if="v['new_status']=='400'">Car Listing Price: &#x20B9;{{v['data']['car_listing_price']}} </div>
							</td>
							<td>
								<div v-if="v['data']!=''&&v['data']!=null">
									<span v-if="v['data']['status_remarks']">{{v['data']['status_remarks']}}</span>
									<span v-else>NA</span>
								</div>
								<div v-else>NA</div>
							</td>
							<td><span v-if="v['user_name']!=''">{{v['user_name']}}</span><span v-else>NA</span></td>
						</tr>
						<tr v-if="history_count==0">
							<td colspan="7">No records found</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
        </div>
    </div>
</template>
<script>
import router from "../../router"    
    import axios from "axios" 
    import { RouterLink, RouterView } from 'vue-router'
    export default {    
        name: "inventory", 
        data: function () {
            return {
                props: {},
                float_error:"",
                form_error:"",
                form_errors:"",
                success_alert:false,
                //user_rights:JSON.parse(user_rights),
                success_msg:"",
                global_error: "",
                global_token:"",
                template: {},
                close_template:{},
                status_date: "",
                status_time: "",
                status_field_option: "",
                status_history:[],
                history_count:0,
                next_status:"",
                show_update_btn: false,
                vshow: false,
                my_stock_edit_id: this.$route.params.id,
                vtab: this.$route.params.vtab,
                validation_error: false,
                api_calls_queue: [],
                api_call_busy: false,
                inventory: {},
                list_on:[],
                lead_values:{},
                update_msg: "",
                status_list: {
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
                },
                refurb_data:false,
            }
        },
        mounted:function(){
            //console.log(this.my_stock_edit_id);
            this.generate_global_token();
        },
        methods:{
			edited_field: function( vf ){
					this.validate_fields();
					this.save_status_fields();
				},
				isNumber($event) {
					let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
					if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
					$event.preventDefault();
					}
				},
				getNow: function(liston,listdate) {
					const today = new Date();
					const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
					const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
					const dateTime = date + ' ' + time;
					if(this.inventory[liston] == 'y' || this.inventory[liston] == true){
						this.inventory[listdate] = date;
						this.inventory[liston] = 'y';
					}
					else{
						this.inventory[listdate] = '';
						this.inventory[liston] = 'n';
					}
                },
				q1_changed: function(){
					this.inventory['q2']= "";
					this.inventory['q3']= "";
					this.inventory['q4']= "";
					this.set_status_fields();
					this.save_status_fields();
					this.validate_fields();
				},
				q2_changed: function(){
					this.inventory['q3']= "";
					this.inventory['q4']= "";
					this.set_status_fields();
					this.save_status_fields();
					this.validate_fields();
				},
				q3_changed: function(){
					this.inventory['q4']= "";
					this.set_status_fields();
					this.save_status_fields();
					this.validate_fields();
				},
				q4_changed: function(){
					this.set_status_fields();
					this.save_status_fields();
					this.validate_fields();
				},
				set_status_fields: function(){
					var voption = this.inventory['q1'];
					if( this.inventory['q2'] ){
						voption = voption + "-" + this.inventory['q2'];
					}
					if( this.inventory['q3'] ){
						voption = voption + "-" + this.inventory['q3'];
					}
					if( this.inventory['q4'] ){
						voption = voption + "-" + this.inventory['q4'];
					}
					this.status_field_option = voption;
					if( voption in this.template[ this.inventory['status'] ]['fields'] ){
						this.next_status = this.template[ this.inventory['status'] ]['fields'][ voption ]['next-status']+'';
						this.show_update_btn = false;
					}else{
						this.next_status = '';
						this.show_update_btn = false;
					}
					this.validate_fields();
				},
				validate_fields:function(){	
					var err_cnt=0;
					this.validation_error = false;
					if(this.inventory['status']=='200' && this.inventory['make']=='MG' && this.refurb_data==false){
					
						if(this.inventory['q1']=='a'){
							this.validation_error = "Refurb data required to move inventory to next status";
							return false;
						}
					}
					if(this.inventory['status']=='300'&&(this.inventory['chassis_num']==''||this.inventory['chassis_num']==null)){
						if(this.inventory['q1']!=''){
							this.validation_error = "Please update car details to move inventory to next status";
							return false;
						}
					}
					if(this.inventory['status']=='300'&&(this.inventory['accessories_d']==''||this.inventory['accessories_d']==null)){
						if(this.inventory['q1']!=''){
							this.validation_error = "Please update accessories details to move inventory to next status";
							return false;
						}
					}
					if(this.inventory['status']=='300'&&this.inventory['carimg_count']<10){
						if(this.inventory['q1']!=''){
							this.validation_error = "Please upload car images to move inventory to next status";
							return false;
						}
					}
					if(this.inventory['status']=='300'&&(this.inventory['actual_bp']<=0 || this.inventory['actual_bp']=='0')){
						if(this.inventory['q1']!=''){
							this.validation_error = "Please update car pricing to move inventory to next status";
							return false;
						}
					}
					if(this.inventory['status']=='300'&&(this.inventory['certification_date']=='0000-00-00 00:00:00' || this.inventory['certification_date']=="NA")){
						if(this.inventory['q1']=='a'){
							this.validation_error = "Please update certification details to move inventory to next status";
							return false;
						}
					} 
					if(this.status_field_option){
							if(this.status_field_option in this.template[this.inventory['status']]['fields'])
							{
						for(var fkey = 0; fkey < this.template[this.inventory['status']]['fields'][this.status_field_option]['fields'].length; fkey++)
						{
							var fv = this.template[this.inventory['status']]['fields'][this.status_field_option]['fields'][fkey];
							if(fv['type'] == 'datetime')
							{
							
								if(this.inventory[fv['db-field']].substr(0, 4) == '0000' || this.inventory[fv['db-field']]=='')
								{
									this.validation_error = fv['name'] + " required";
									break;
								}
								else if(this.inventory[fv['db-field']].substr(11, 2) == '00')
								{
									this.validation_error = fv['name'] + " time required";
									break;
							
								}
							}
							else if(fv['type'] == 'date')
							
							{
								if(this.inventory[fv['db-field']].substr(0, 4) == '0000' || this.inventory[fv['db-field']]=='')
								{
									this.validation_error = fv['name'] + " required";
									break;
								}
								else
								{
									if(fv['db-field'] == 'refurb_date' && (this.next_status == 300))
									{
										var dt = new Date();
										var dt2 = new Date(this.inventory[fv['db-field']]);
										if (dt < dt2)
										{
											this.validation_error = fv['name'] + " Should be less than today's date";
											break;
										}
									}
								}
							}
							else if(fv['type'] == 'checkbox')
							{
								if(Object.keys(this.list_on).length == 0)
								{
									this.validation_error = fv['name'] + " required";
									break;
								}
							}
							else if(fv['type'] == 'number')
							{
								if(this.inventory['status'] == '10' && this.inventory['q1'] == 'a')
								{
									this.validation_error = false;
								}
								else
								{
									if(this.inventory[fv['db-field']] == '' || this.inventory[fv['db-field']] <= '0' || this.inventory[fv['db-field']] == '0')
									{
										this.validation_error = fv['name'] + " required";
										break;
									}
								}
							}
							else if(fv['type'] == 'text')
							{
								if(this.inventory[fv['db-field']] != '')
								{
									var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
									this.inventory[fv['db-field']] = this.inventory[fv['db-field']].replace(regex, "");
									if(this.inventory[fv['db-field']].match(regex) != null)
									{
										this.validation_error = 'please enter valid remarks.Emojis are not allowed.';
									}
									else
									{
										this.validation_error = false;
									}
									if(/<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE|a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|\/h1|\/h2|\/h3|\/h4|\/h5|\/h6|\/html|\/div|\/br|\/table|\/tr|\/td|\/span|\/li|\/ul|var|video).*?>|<(video).*?<\/\2>/i.test(this.inventory[fv['db-field']]) == true)
									{
										this.validation_error = 'please enter valid remarks.Html tags are not allowed.';
									}
									else
									{
										this.validation_error = false;
									}
									var txt_regex = /^[a-zA-Z0-9 \\s,./()\n'-]*$/;
									if(this.inventory[fv['db-field']].match(txt_regex) == null)
									{
										this.validation_error = 'please enter valid remarks.';
									}
									else
									{
										this.validation_error = false;
									}
									break;
								}
								else
								{
									this.validation_error = false;
								}
							}
							else
							{
								if(this.inventory[fv['db-field']] == '')
								{
									this.validation_error = fv['name'] + " required";
									break;
								}
							}
						}
							}
					}
		 		},
				async save_status_fields(){
					if(this.validation_error){
						return false;
					}
						var vpostdata = {
							"q1": this.inventory['q1'],
							"q2": this.inventory['q2'],
							"q3": this.inventory['q3'],
							"q4": this.inventory['q4'],
							"refurb_date": this.inventory['refurb_date'],
							"car_listing_price": this.inventory['car_listing_price'],
							"certification_date": this.inventory['certification_date'],
							"mg_list": this.inventory['mg_list'],
							"ct_list": this.inventory['ct_list'],
							"cw_list": this.inventory['cw_list'],
							"mg_date": this.inventory['mg_date'],
							"ct_date": this.inventory['ct_date'],
							"cw_date": this.inventory['cw_date'],
							"status_remarks":  this.inventory['status_remarks'],
						}
						try {
							await axios({
								url: 'http://localhost:5000/saveRetailStatusFields',
								method: 'post',
								data: vpostdata,
								params: {
									my_stock_edit_id: this.my_stock_edit_id,
									token: this.global_token
								}
							}
							).then(response => { 
								//this.process_api_call_queue_next();
								if (response.status == 200) {
									if (typeof (response.data) == "object") {
										if (response.data['status'] == "success") {
											this.update_msg = "Details Saved!";
											setTimeout(function(v){v.update_msg=false;},3000,this);
											this.global_token = response.data['token'];
										}
										else if (response.data['status'] == "fail"){
											if(response.data['error'] == "Session Expired") {
													this.global_error=response.data['error'];
													setTimeout(function(){
															document.location = "/?event=SessionExpired";
													},500);

											}else if(response.data['error'] == "Concurrent Login") {

													this.global_error=response.data['err_msg'];
													setTimeout(function(){
															document.location = '/logout/?action=Logout&pg=multi';
													},500);

											}else if (response.data['error'] == "Token Error") {
													this.global_token = response.data['token'];
													this.call_api("save_status_fields");
											}else{
													this.global_error=response.data['error'];
													this.global_token = response.data['token'];
											}
										}else if(response.data["error"] == "validation error") {
											this.validation_error = response.data["msg"];
											this.global_token = response.data['token'];
										}else {
											this.global_error=response.data['error'];
											this.global_token = response.data['token'];
										}
									}
									else{
										this.float_error='Incorrect response recieved from server -inventory save status fields';
									}
								}
							});
						}
						catch(error){
								console.log(error.response)
						}
					
				},
				async get_mystock_status_history(){
					try {
						await axios({
							url: 'http://localhost:5000/getRetailStockHistory',
							method: 'post',
							params: {
								my_stock_edit_id: this.my_stock_edit_id,
								token: this.global_token
							}
						}
						).then(response => { 
							if (response.status == 200)
							{
								if(typeof(response.data) == "object")
								{
									if(response.data['status'] == "success")
									{
										this.global_token = response.data['token'];
										this.status_history = response.data['status_history'];
										this.history_count = response.data['history_count'];
										//this.status_list = response.data['status_list'];
										this.data_formatCurrency();
									}
									else if(response.data['status'] == "fail")
								{
									if(response.data['error'] == "Session Expired")
									{
									this.global_error = response.data['error'];
									setTimeout(function ()
									{
									document.location = "/?event=SessionExpired";
									}, 500);

									}
									else if(response.data['error'] == "Concurrent Login")
									{

										this.global_error = response.data['err_msg'];
										setTimeout(function ()
										{
										document.location = '/logout/?action=Logout&pg=multi';
										}, 500);

									}
									else if (response.data['error'] == "Token Error")
									{
										this.global_token = response.data['token'];
										this.call_api("get_lead_details");
									}
									else
									{
										this.global_error = response.data['error'];
										this.global_token = response.data['token'];
									}
								}else if(response.data['status'] == "error"){
									document.location = "/dashboard/my_stock_retail";
								}
								else
								{
									this.global_error = response.data['error'];
									this.global_token = response.data['token'];
								}
								}
								else
								{
									this.global_error = 'Incorrect response recieved from server -Inventory status history';
								}
							}
							else
							{
								this.global_error='There was an error:'+ response.data['error'];
								this.global_token=response.data['token'];
							}
						});
					}
					catch(error){
                        console.log(error.response)
                	};

				},
			async generate_global_token(){
                try {
                    await axios({
                        url: 'http://localhost:5000/generate_token',
                        method: 'get',
                    }
                    ).then(response => { 
                        //console.log(response); 
                        this.global_token = response.data['token'];
                        this.get_inventory_details();
                        this.get_mystock_status_history();
                    })
                }
                catch(error){
                        console.log(error.response)
                };
            }, 
            async get_inventory_details(){
                try {
                    await axios({
                        url: 'http://localhost:5000/getRetailStockData',
                        method: 'post',
                        params: {
                            my_stock_edit_id: this.my_stock_edit_id,
                            token: this.global_token
                        }
                    }
                    ).then(response => { 
                        //this.process_api_call_queue_next();
                        if (response.status == 200) {
                            if (typeof (response.data) == "object") {
                                if (response.data['status'] == "success") {                       
                                    this.global_token = response.data['token'];
                                    this.inventory = response.data['record'][0];
                                    this.load_template();
                                   // console.log(this.inventory);
                                    //this.status_list = response.data['status_list'];
                                }else if (response.data['status'] == "fail"){
                                    if(response.data['error'] == "Session Expired") {
                                        this.global_error=response.data['error'];
                                        setTimeout(function(){
                                            document.location = "/?event=SessionExpired";
                                        },500);

                                }else if(response.data['error'] == "Concurrent Login") {

                                        this.global_error=response.data['err_msg'];
                                        setTimeout(function(){
                                                document.location = '/logout/?action=Logout&pg=multi';
                                        },500);

                                }else if (response.data['error'] == "Token Error") {
                                        this.global_token = response.data['token'];
                                        this.call_api("get_lead_details");
                                }else{
                                        this.global_error=response.data['error'];
                                        this.global_token = response.data['token'];
                                }
                                } else {
                                    this.global_error=response.data['error'];
                                    this.global_token = response.data['token'];
                                }
                            } else {
                                this.global_error = 'Incorrect response recieved from server -Get my stock details rec';
                            }
                        } else {
                            this.global_error = 'There was an error:' + response.data['error'];
                            this.global_token = response.data['token'];
                        }
                    });
                }
                catch(error){
                        console.log(error.response)
                };
            },
            load_template:function(){
                axios.get("http://localhost:5000/load_template?typ=retail_stock").then(response=>{
                    if( response.status == 200  ){
                        if( typeof(response.data) == "object" ){
                            try{
                                this.template = response.data;
                                //this.set_status_fields();
                            }catch(e){
                                alert("There was an error loading configs! " + e);
                            }
                        }else{
                            alert("incorrect response format! \n" + response.data);
                        }
                    }else{
                        this.float_error='Configuration loading error:'+ response.status;
                        this.vshow = false;
                    }
                });
            },
        }
    }
</script>