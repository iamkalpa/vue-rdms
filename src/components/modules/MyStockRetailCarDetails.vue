<template>
    <div>
        <div class="row mt-3 ml-1">
		<h6>Car Basic Details</h6>
	</div>
<div class="row">
   <div v-bind:class="{'alert alert-danger alert-sm m-2 w-100':(global_error)}" v-if="global_error">
   {{global_error}}
   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
       <span aria-hidden="true">&times;</span>
     </button>
   </div>
</div>
<div class="alert alert-danger alert-sm m-3" role="alert" v-if="errors!=false" style="max-height: 90px;overflow: auto;">
   <ul>
       <li v-for="e in errors">{{ e }}</li>
   </ul>
</div>
	<div class="mt-3" v-if="add_car_details['status']>111 || add_car_details['status']==100">
		<div class="alert alert-sm alert-danger">You are not allowed to edit details for the current status</div>
	</div>
	<div class="row mt-2">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Manufacturing Year<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('manuf_year' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['manuf_year']" v-on:change="get_makes_by_year(1)" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select Year</option>
					<option v-for="year in years" v-bind:value="year">{{year}}</option>
				</select>
				<span class="text-danger" v-if="validation_errors.manuf_year" v-text="validation_errors.manuf_year"></span>
			</div>
		</div>
		
		<div class="col-sm-6 form-row">
        <!--{{add_car_details['enc_color_id']}}-->
			<label for="mobile" class="col-sm-3 col-form-label">Color<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('enc_color_id' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['enc_color_id']" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value="">Select Color</option>
					<option v-for="color in colors" v-bind:value="color.enc_exterior_color_id"  v-bind:selected="color.enc_exterior_color_id == add_car_details['enc_color_id']">{{color.base_color}}</option>
				</select>
				<span class="text-danger" v-if="validation_errors.enc_color_id" v-text="validation_errors.enc_color_id"></span>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Make<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('enc_make_id' in validation_errors) ? 'verror' : '']">
				<select id="make-list" class="form-control form-control-sm selectpicker" data-virtual-scroll="false" data-live-search="true" v-model="add_car_details['enc_make_id']" v-on:change="get_make_models(1)" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select Make</option>
					<!--<option v-for="make in makes" v-bind:value="make.enc_make_id"  v-bind:selected="make.enc_make_id == add_car_details['enc_make_id']">{{make.make}}</option> -->
					<optgroup label="Popular Makes" >
				            <option v-for="make in makes" v-if="make.is_pop=='y'" v-bind:selected="make.enc_make_id == add_car_details['enc_make_id']" v-bind:value="make.enc_make_id">{{make.make}}</option>
				         </optgroup>
				         <optgroup label="Other Makes">
				            <option v-for="make in makes" v-if="make.is_pop=='n'" v-bind:selected="make.enc_make_id == add_car_details['enc_make_id']" v-bind:value="make.enc_make_id">{{make.make}}</option>
				         </optgroup>
				</select>
				<span class="text-danger" v-if="validation_errors.enc_make_id" v-text="validation_errors.enc_make_id"></span>
			</div>
			
		</div>
		
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Fuel Type<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('fuel_id' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['fuel_id']" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select Fuel</option>
					<option v-for="val, id in fuel_type_list" v-bind:value="id">{{val}}</option>
				</select>
				<span class="text-danger" v-if="validation_errors.fuel_id" v-text="validation_errors.fuel_id"></span>
			</div>
			
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Model<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('enc_model_id' in validation_errors) ? 'verror' : '']">
				<select id="model-list" class="form-control form-control-sm selectpicker" data-virtual-scroll="false" data-live-search="true" v-model="add_car_details['enc_model_id']" v-on:change="get_make_variant(1)" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select Model</option>
					<option v-for="model in models" v-bind:value="model.enc_model_id"  v-bind:selected="model.enc_model_id == add_car_details['enc_model_id']">{{model.model}}</option>
				</select>
				<span class="text-danger" v-if="validation_errors.enc_model_id" v-text="validation_errors.enc_model_id"></span>
			</div>
			
		</div>
		
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Transmission<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('transmission' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['transmission']" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select Transmission</option>
					<option value="Automatic">Automatic</option>
					<option value="Manual">Manual</option>
					
				</select>
				<span class="text-danger" v-if="validation_errors.transmission" v-text="validation_errors.transmission"></span>
			</div>
			
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Variant<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('enc_variant_id' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['enc_variant_id']" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select Variant</option>
					<option v-for="variant in variants" v-bind:value="variant.enc_variant_id"  v-bind:selected="variant.enc_variant_id == add_car_details['enc_variant_id']">{{variant.variant}}</option>
				</select>
				<span class="text-danger" v-if="validation_errors.enc_variant_id" v-text="validation_errors.enc_variant_id"></span>
			</div>
		</div>
        <div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Chassis/VIN Number<span class="star" v-if="add_car_details['enc_make_id']==mg_org_id">*</span></label>
          
			<div class="col-sm-9" v-bind:class="[('chassis_num' in validation_errors) ? 'verror' : '']">
				<input type="text" v-model="add_car_details['chassis_num']" maxlength="17" v-on:keypress="isLetter($event)" class="form-control form-control-sm text-uppercase" v-bind:disabled="add_car_details['selllead_id']>0">	
				<span class="text-danger" v-if="validation_errors.chassis_num" v-text="validation_errors.chassis_num"></span>
			</div>
			
		</div>
	</div>
	<div class="row">
	</div>
	<div class="row">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">No.of Owners<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('owner_id' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['owner_id']" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select</option>
					<option v-for="val, id in owners_list" v-bind:value="id"  v-bind:selected="id== add_car_details['owner_id']">{{val}}</option>
				</select>			
				<span class="text-danger" v-if="validation_errors.owner_id" v-text="validation_errors.owner_id"></span>
			</div>
		</div>
        <div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">KMs Driven<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('mileage' in validation_errors) ? 'verror' : '']">
				<input type="text"  @input="formatCurrency(3)" v-model="add_car_details['mileage']" class="form-control form-control-sm" v-bind:readonly="add_car_details['selllead_id']>0" maxlength="10">				
				<span class="text-danger" v-if="validation_errors.mileage" v-text="validation_errors.mileage"></span>
			</div>
		</div>
	</div>
	<div class="row mt-3 ml-1">
			<h6>Car Registration Details</h6>
	</div>
	<div class="row mt-2" v-if="reg_type_state==false">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Registration Month/Year<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('reg_date' in validation_errors) ? 'verror' : '']">
				<input  type="date" v-model="add_car_details['reg_date']"  class="form-control form-control-sm" v-on:change="fitness_dt_cal" v-bind:readonly="add_car_details['selllead_id']>0"/>	
	         <span class="text-danger" v-if="validation_errors.reg_date" v-text="validation_errors.reg_date"></span>
			</div>
		</div>
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Fitness Validity<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('fitness_validate' in validation_errors) ? 'verror' : '']">
				<input type="date" v-model="add_car_details['fitness_validate']" class="form-control form-control-sm" v-bind:readonly="add_car_details['selllead_id']>0"/>
				<span class="text-danger" v-if="validation_errors.fitness_validate" v-text="validation_errors.fitness_validate"></span>
			</div>
			
		</div>
	</div>
	<div class="row" v-if="reg_type_state==false">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Registration Number<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('reg_num' in validation_errors) ? 'verror' : '']">
				<input type="text" placeholder="" v-model="add_car_details['reg_num']" class="form-control form-control-sm text-uppercase"  v-bind:readonly="regnum==true"/>
				<span class="text-danger" v-if="validation_errors.reg_num" v-text="validation_errors.reg_num"></span>
			</div>
		</div>	
	</div>
	<div class="row">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Registration Type<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('reg_type' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['reg_type']"  v-on:change="registration_type_state" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select Registration Type</option>
					<option value="Commercial">Commercial</option>
					<option value="Corporate">Corporate</option>
					<option value="Individual">Individual</option>
					<option value="Unregistered">Unregistered</option>
				</select>
				<span class="text-danger" v-if="validation_errors.reg_type" v-text="validation_errors.reg_type"></span>
			</div>
			
		</div>
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Hypothicated<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('hypothicated' in validation_errors) ? 'verror' : '']">
				<input type="radio" v-model="add_car_details['hypothicated']" value="Yes" v-on:change="financier_change" v-bind:disabled="add_car_details['selllead_id']>0"> Yes &nbsp;
				<input type="radio" v-model="add_car_details['hypothicated']" value="No" v-on:change="financier_change" v-bind:disabled="add_car_details['selllead_id']>0"> No
				<span class="text-danger" v-if="validation_errors.hypothicated" v-text="validation_errors.hypothicated"></span>
		</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6 form-row" v-if="reg_type_state==false">
      
			<label for="mobile" class="col-sm-3 col-form-label">Insurance Type<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('ins_id' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['ins_id']" v-on:change="insurance_dt_state" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select Insurance</option>
					<option v-for="val, id in insurance_type_list" v-bind:value="id" >{{val}}</option>
				</select>
				<span class="text-danger" v-if="validation_errors.ins_id" v-text="validation_errors.ins_id"></span>
			</div>
			
		</div>
		<div class="col-sm-6 form-row" v-if="financer_state==false">
			<label for="mobile" class="col-sm-3 col-form-label">Financier's Name<span class="star">*</span></label>
            
			<div class="col-sm-9" v-bind:class="[('enc_financier_id' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['enc_financier_id']" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select Insurance</option>
					<option v-for="banks in bank_names_list" v-bind:value="banks.enc_bank_id" v-bind:selected="banks.enc_bank_id == add_car_details['enc_financier_id']">{{banks.bank}} </option>
				</select>
				<span class="text-danger" v-if="validation_errors.enc_financier_id" v-text="validation_errors.enc_financier_id"></span>
			</div>
			
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6 form-row" v-if="insurance_dt==false">
			<label for="mobile" class="col-sm-3 col-form-label">Insurance Validity<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('ins_exp_dt' in validation_errors) ? 'verror' : '']">
				<input type="date" v-model="add_car_details['ins_exp_dt']" class="form-control form-control-sm" v-bind:readonly="add_car_details['selllead_id']>0">				
				<span class="text-danger" v-if="validation_errors.ins_exp_dt" v-text="validation_errors.ins_exp_dt"></span>
			</div>
			
		</div>
      <div class="col-sm-6 form-row" v-else>
		</div>
		<div class="col-sm-6 form-row" v-if="financer_state==false">
			<label for="mobile" class="col-sm-3 col-form-label">Outstading Loan Amount</label>
			<div class="col-sm-9" v-bind:class="[('outstand_amount' in validation_errors) ? 'verror' : '']">
				<span style="position:absolute;left:-5px;top:5px;">&#x20B9;</span>
				<input type="text" @input="formatCurrency(2)" class="form-control form-control-sm" v-model="add_car_details['outstand_amount']" v-bind:readonly="add_car_details['selllead_id']>0" maxlength="10">		
				<span class="text-danger" v-if="validation_errors.outstand_amount" v-text="validation_errors.outstand_amount"></span>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6 form-row" v-if="insurance_dt==false ">
			<label for="mobile" class="col-sm-3 col-form-label">Insurance IDV</label>
			<div class="col-sm-9" v-bind:class="[('ins_idv' in validation_errors) ? 'verror' : '']">
				<input type="text" v-model="add_car_details['ins_idv']" class="form-control form-control-sm"   @input="formatCurrency(1)" v-bind:readonly="add_car_details['selllead_id']>0" maxlength="10">				
				<span class="text-danger" v-if="validation_errors.ins_idv" v-text="validation_errors.ins_idv"></span>
			</div>
		</div>
      <div class="col-sm-6 form-row" v-else>
		</div>
	</div>
	<div class="row ml-1 mt-3">
			<h6>Other Car Information</h6>
	</div>
	<div class="row mt-2" >
		<div class="col-sm-6 form-row" v-if="add_car_details['trade_in_date']!='0000-00-00'">
			<label for="mobile" class="col-sm-3 col-form-label">Trade In<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('trade_in_date' in validation_errors) ? 'verror' : '']">
				<input type="date" class="form-control form-control-sm" v-model="add_car_details['trade_in_date']" readonly>
				<span class="text-danger" v-if="validation_errors.trade_in_date" v-text="validation_errors.trade_in_date"></span>
			</div>
		</div>
      <div class="col-sm-6 form-row" v-else>
			<label for="mobile" class="col-sm-3 col-form-label">Added Date<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('trade_in_date' in validation_errors) ? 'verror' : '']">
				<input type="date-time" class="form-control form-control-sm" v-model="add_car_details['c_date']" readonly>
				<span class="text-danger" v-if="validation_errors.trade_in_date" v-text="validation_errors.trade_in_date"></span>
			</div>
			
		</div>
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Date of Possession / Purchase<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('pocession_date' in validation_errors) ? 'verror' : '']">
				
				<input type="date" class="form-control form-control-sm" v-bind:disabled="add_car_details['pocession_date']!=''" v-model="add_car_details['pocession_date']" maxlength="9">
				<span class="text-danger" v-if="validation_errors.pocession_date" v-text="validation_errors.pocession_date"></span>
			</div>
		</div>
		
	</div>
	<div class="row form-row">
		<label for="email" class="col-sm-6 text-right col-form-label" style="margin-left:-35px">Vechicle Location</label>
	</div>
	<div class="row mt-1">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">State<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('enc_state_id' in validation_errors) ? 'verror' : '']">
				<select id="state-list" class="form-control form-control-sm selectpicker" data-virtual-scroll="false" data-live-search="true" v-model="add_car_details['enc_state_id']" v-on:change="get_all_cities_bystate(1)" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select State</option>
					<option v-for="state in states" v-bind:value="state.enc_state_id" v-bind:selected="state.enc_state_id == add_car_details['enc_state_id']"  >{{state.cw_state}}</option>
					
				</select>
				<span class="text-danger" v-if="validation_errors.enc_state_id" v-text="validation_errors.enc_state_id"></span>
			</div>
			
		</div>
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Actual Buying Price<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('actual_bp' in validation_errors) ? 'verror' : '']">
				<span style="position:absolute;left:-5px;top:5px;">&#x20B9;</span>
				<input type="text" @input="formatCurrency(5)" class="form-control form-control-sm" 
				v-bind:readonly="add_car_details['selllead_id']>0" v-model="add_car_details['actual_bp']" maxlength="9">
				<span class="text-danger" v-if="validation_errors.actual_bp" v-text="validation_errors.actual_bp"></span>
			</div>
		</div>
		
	</div>
	<div class="row mt-1">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">City<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('enc_city_id' in validation_errors) ? 'verror' : '']">
				<select id="city-list" class="form-control form-control-sm selectpicker" data-virtual-scroll="false" data-live-search="true" v-model="add_car_details['enc_city_id']" v-bind:disabled="add_car_details['selllead_id']>0">
					<option value=''>Select City</option>
					<option v-for="city in cities" v-bind:value="city.enc_city_id" v-bind:selected="city.enc_city_id == add_car_details['enc_city_id']">{{city.cw_city }}</option>
					
				</select>
				
				<span class="text-danger" v-if="validation_errors.enc_city_id" v-text="validation_errors.enc_city_id"></span>
			</div>
			
		</div>
		<div class="col-sm-6 form-row" v-if="add_car_details['selllead_id']==0">
			<label for="mobile" class="col-sm-3 col-form-label">Expected Selling Price<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('expected_selling_price' in validation_errors) ? 'verror' : '']">
				<span style="position:absolute;left:-5px;top:5px;">&#x20B9;</span>
				<input type="text" @input="formatCurrency(4)" class="form-control form-control-sm" v-model="add_car_details['expected_selling_price']" maxlength="10">
				<span class="text-danger" v-if="validation_errors.expected_selling_price" v-text="validation_errors.expected_selling_price"></span>
			</div>
		</div>
		
	</div>
	<div class="row mt-1">
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Dealer Branch<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('enc_branch_id' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['enc_branch_id']" v-on:change="get_dealers_executives()" disabled>
					<option value=''>Select Branch</option>
					<option v-for="dealerval,index in dealers" v-bind:value="dealerval.enc_branch_id" v-bind:selected="dealerval.enc_branch_id== add_car_details['enc_dealer_id']">{{dealerval.brn_name}}</option>
				</select>	
				<span class="text-danger" v-if="validation_errors.enc_branch_id" v-text="validation_errors.enc_branch_id"></span>
			</div>
		</div>
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Car Remarks</label>
			<div class="col-sm-9" v-bind:class="[('remark' in validation_errors) ? 'verror' : '']">
				<textarea  v-model="add_car_details['remark']" class="form-control form-control-sm" v-bind:readonly="add_car_details['selllead_id']>0" maxlength="500"></textarea>	
				<span class="text-danger" v-if="validation_errors.remark" v-text="validation_errors.remark"></span>
			</div>
		</div>
	</div>
	<div class="row mt-1">
		<div class="col-sm-6 form-row" v-if="executive_name != ''">
			<label for="mobile" class="col-sm-3 col-form-label">Executive<span class="star">*</span></label>
			<div class="col-sm-9">
			<input type="text" v-bind:value="executive_name" disabled class="form-control form-control-sm">
			</div>
		</div>
		<div class="col-sm-6 form-row" v-else>
			<label for="mobile" class="col-sm-3 col-form-label">Executive<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('enc_executive_id' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['enc_executive_id']" disabled>
					<option value="">Select Executive</option>
					<option v-for="executivesval,index in executives_list" v-bind:value="executivesval.enc_executive_id" v-bind:selected="executivesval.enc_executive_id== add_car_details['enc_executive_id']">{{executivesval.emp_name}}</option>
				</select>
				<span class="text-danger" v-if="validation_errors.enc_executive_id" v-text="validation_errors.enc_executive_id"></span>
			</div>
		</div>
		<div class="col-sm-6 form-row">
			<label for="mobile" class="col-sm-3 col-form-label">Mode of Sale<span class="star">*</span></label>
			<div class="col-sm-9" v-bind:class="[('liquidation_mode' in validation_errors) ? 'verror' : '']">
				<select class="form-control form-control-sm" v-model="add_car_details['liquidation_mode']" v-bind:disabled="add_car_details['status']>=222 || add_car_details['status']<111">
					<option value="">Select Mode of sale</option>
	        		<option v-for="val, id in mode_of_sale_list" v-bind:value="id">{{val}}</option>
        		</select>
				<span class="text-danger" v-if="validation_errors.liquidation_mode" v-text="validation_errors.liquidation_mode"></span>
			</div>	
		</div>
	</div>
	<div class="col-sm-5 text-right" v-if="add_car_details['status']<'222' && add_car_details['status']!=100">
			<button  type="button" class="btn btn-red btn-sm mt-2"  v-on:click="save_car_details">Save Details</button>
	</div>
	<div class="row">
		<div class="col-md-12 col-sm-12 p-2">
		<div v-if="form_error" class="alert alert-danger alert-sm" >{{ form_error }} </div>
			<div v-if="form_status" class="alert alert-success alert-sm" >{{ form_status }}</div>
		</div>
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
                mg_org_id: "",
			props: {},
			float_error: "",
			form_error: "",
			form_errors: "",
			errors: false,
			form_success: "",
			form_status: "",
			global_error: "",
			global_token: "",
			financer_state: false,
			insurance_dt: false,
			insurance_typ: false,
			//user_rights: JSON.parse(user_rights),
			regnum: false,
			validation_errors: {},
			my_stock_edit_id: this.$route.params.id,
            vtab: this.$route.params.vtab,
			dealers: [],
			states: [],
			cities: [],
			areas: [],
			makes: [],
			models: [],
			variants: [],
			years: [],
			colors: [],
			bank_names_list: [],
			executives_list: [],
			fuel_type_list: {},
			executive_name: "",
			reg_type_state: false,
			vechicle_condition_list: {},
			owners_list: {},
			insurance_type_list: {},
			mode_of_sale_list: {},
			min_year: 2004,
			max_year: new Date().getFullYear(),
			add_car_details: {
				"enc_make_id": "",
				"enc_color_id": "",
				"enc_model_id": "",
				"fuel_id": "",
				"enc_variant_id": "",
				"transmission": "",
				"manuf_year": "",
				"pow_steering": "",
				"mileage": "",
				"shape_id": "",
				"owner_id": "",
				"chassis_num": "",
				"reg_date": "",
				"fitness_validate": "",
				"reg_num": "",
				"reg_type": "",
				"hypothicated": "",
				"ins_id": "",
				"enc_financier_id": "",
				"ins_exp_dt": "",
				"outstand_amount": "",
				"ins_idv": "",
				"remark": "",
				"trade_in_date": "",
				"expected_selling_price": "",
				"actual_bp": "",
				"enc_state_id": "",
				"liquidation_mode": "",
				"enc_city_id": "",
				"enc_area_id": "",
				"enc_branch_id": "",
				"enc_executive_id": "",
				"pocession_date": "",
			},
			validation_errors: {},
			validationErrors: {},
			validation_rules: {
				"enc_make_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Meke'
				},
				"enc_color_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Color'
				},
				"enc_model_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Model'
				},
				"fuel_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Fuel Type'
				},
				"enc_variant_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Variant'
				},
				"transmission": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Transmission'
				},
				"manuf_year": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select year'
				},
				"pow_steering": {
					'm': 'false',
					'type': 'radio',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select power steering'
				},
				"mileage": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Enter mileage'
				},
				"shape_id": {
					'm': 'false',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Shape'
				},
				"owner_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Owner'
				},
				"chassis_num": {
					'm': 'false',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Enter Chassis Number'
				},
				"pocession_date": {
					'm': 'false',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Possession Date'
				},
				"reg_date": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Register Date'
				},
				"fitness_validate": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Valid Fitness Date'
				},
				"reg_num": {
					'm': 'true',
					'type': 'text',
					'v_flag': 2,
					'regexp': /^[A-Za-z0-9]+$/,
					'msg': 'Enter register Number'
				},
				"reg_type": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Enter register Type'
				},
				"hypothicated": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Hpothicated'
				},
				"ins_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Insurance Type'
				},
				"enc_financier_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Financier'
				},
				"ins_exp_dt": {
					'm': 'false',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Insurance expire date'
				},
				"outstand_amount": {
					'm': 'false',
					'type': 'text',
					'v_flag': 2,
					'regexp': '',
					'msg': 'Enter valid outstanding amount'
				},
				"ins_idv": {
					'm': 'false',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Enter insurance IDV'
				},
				"remark": {
					'm': 'false',
					'type': 'text',
					'v_flag': 2,
					'regexp': /[A-Za-z0-9\-\\,.]/,
					'msg': 'Special characters not allowed in Remarks'
				},
				"trade_in_date": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Trade In date'
				},
				"expected_selling_price": {
					'm': 'true',
					'type': 'text',
					'v_flag': 2,
					'regexp': /(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?/,
					'msg': 'Enter valid expected sell amount'
				},
				"actual_bp": {
					'm': 'true',
					'type': 'text',
					'v_flag': 2,
					'regexp': /(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?/,
					'msg': 'Enter valid Actual Selling Price'
				},
				"enc_state_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select State'
				},
				"liquidation_mode": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select mode of sale'
				},
				"enc_city_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select City'
				},
				"enc_area_id": {
					'm': 'false',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select area'
				},
				"enc_branch_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Branch'
				},
				"enc_executive_id": {
					'm': 'true',
					'type': 'text',
					'v_flag': 1,
					'regexp': '',
					'msg': 'Select Executive'
				},
			},
			api_calls_queue: [],
			api_call_busy: false,
			inventory_status: 0,
			sel_make_id: "",
			stock_sale_status: 0,
			is_disabled: false,
			stockview:0,

            }
        },
        mounted:function(){
            //console.log(this.my_stock_edit_id);
            this.year_array();
            this.generate_global_token();
        },
        methods:{
            isNumber($event) {
			let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
			if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
				$event.preventDefault();
			}
		},

		isLetter(e) {
			let char = String.fromCharCode(e.keyCode); // Get the character
			if (/^[A-Za-z0-9]+$/.test(char)) return true; // Match with regex 
			else e.preventDefault(); // If not match, don't add to input text
		},
		year_array() {

			this.years = new Array(this.max_year - this.min_year).fill(this.max_year).map((n, i) => n - i);

		},
		echo: function(v) {
			if (typeof(v) == "object") {
				console.log(JSON.stringify(v, null, 4));
			} else {
				console.log(v);
			}
		},
        formatCurrency: function(val_type) {
			var amount = '';
			var amount_out = '';
			var val_amount = '';
			if (val_type == 1) {
				if (typeof(this.add_car_details['ins_idv']) == 'string') {
					this.add_car_details['ins_idv'] = this.add_car_details['ins_idv'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
					amount = this.add_car_details['ins_idv'];
					amount = amount.replace(/,/g, '');
				} else {
					amount = this.add_car_details['ins_idv'];
				}
			} else if (val_type == 2) {
				if (typeof(this.add_car_details['outstand_amount']) == 'string') {
					this.add_car_details['outstand_amount'] = this.add_car_details['outstand_amount'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
					amount_out = this.add_car_details['outstand_amount'];
					amount_out = amount_out.replace(/,/g, '');
				} else {
					amount = this.add_car_details['outstand_amount'];
				}
			} else if (val_type == 3) {
				if (typeof(this.add_car_details['mileage']) == 'string') {
					this.add_car_details['mileage'] = this.add_car_details['mileage'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
					amount_out = this.add_car_details['mileage'];
					amount_out = amount_out.replace(/,/g, '');
				} else {
					amount_out = this.add_car_details['mileage'];
				}
			} else if (val_type == 4) {
				if (typeof(this.add_car_details['expected_selling_price']) == 'string') {
					this.add_car_details['expected_selling_price'] = this.add_car_details['expected_selling_price'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
					amount_out = this.add_car_details['expected_selling_price'];
					amount_out = amount_out.replace(/,/g, '');
				} else {
					amount_out = this.add_car_details['expected_selling_price'];
				}
			} else if (val_type == 5) {
				if (typeof(this.add_car_details['actual_bp']) == 'string') {
					this.add_car_details['actual_bp'] = this.add_car_details['actual_bp'].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
					amount_out = this.add_car_details['actual_bp'];
					amount_out = amount_out.replace(/,/g, '');
				} else {
					amount_out = this.add_car_details['actual_bp'];
				}
			}
			let rupeeIndian = Intl.NumberFormat("en-IN", {
				currency: "INR",
			});
			if (val_type == 1) {
				if (amount) {
					val_amount = rupeeIndian.format(Number(amount));
					this.add_car_details['ins_idv'] = val_amount;
				}
			} else if (val_type == 2) {
				if (amount_out) {
					val_amount = rupeeIndian.format(Number(amount_out));
					this.add_car_details['outstand_amount'] = val_amount;
				}
			} else if (val_type == 3) {
				val_amount = rupeeIndian.format(Number(amount_out));
				this.add_car_details['mileage'] = val_amount;

			} else if (val_type == 4) {
				val_amount = rupeeIndian.format(Number(amount_out));
				this.add_car_details['expected_selling_price'] = val_amount;

			} else if (val_type == 5) {
				val_amount = rupeeIndian.format(Number(amount_out));
				this.add_car_details['actual_bp'] = val_amount;

			}

		},
		financier_change: function() {

			let v = this.add_car_details['hypothicated'];
			if (v == 'Yes') {
				this.financer_state = false;
				this.validation_rules['enc_financier_id']['m'] = 'true';
				// this.validation_rules['outstand_amount']['m']='true';
			} else if (v == 'No') {

				this.financer_state = true;
				this.validation_rules['enc_financier_id']['m'] = 'false';
				this.validation_rules['outstand_amount']['m'] = 'false';
			}
		},
		fitness_dt_cal: function() {
			let dt1 = this.add_car_details['reg_date'];
			let dt2 = '';
			if (dt1 != '') {
				dt1 = dt1.replace("/", "-");
				let date = new Date(dt1);
				date.setFullYear(date.getFullYear() + 15);
				date.setDate(date.getDate() - 1);
				let result = date.toISOString().split('T')[0];
				this.add_car_details['fitness_validate'] = result;
			}

		},
		insurance_dt_state: function() {
			let v = this.add_car_details['ins_id'];
			if (v == '3') {
				this.insurance_dt = true;
				this.validation_rules['ins_exp_dt']['m'] = 'false';
				this.validation_rules['ins_idv']['m'] = 'false';
			} else {
				this.insurance_dt = false;
				this.validation_rules['ins_exp_dt']['m'] = 'true';
				this.validation_rules['ins_idv']['m'] = 'false';
			}
		},
		registration_type_state: function() {
			let v = this.add_car_details['reg_type'];
			if (v == 'Unregistered') {
				this.reg_type_state = true;
				this.validation_rules['fitness_validate']['m'] = 'false';
				this.validation_rules['reg_date']['m'] = 'false';
				this.validation_rules['reg_date']['m'] = 'false';
				this.validation_rules['reg_num']['m'] = 'false';
				this.validation_rules['ins_exp_dt']['m'] = 'false';
				this.validation_rules['ins_idv']['m'] = 'false';
				this.validation_rules['ins_id']['m'] = 'false';
				this.insurance_dt = true;
				this.insurance_typ = true;
			} else {
				this.reg_type_state = false;
				this.insurance_dt = false;
				this.insurance_typ = false;
				this.validation_rules['fitness_validate']['m'] = 'true';
				this.validation_rules['reg_date']['m'] = 'true';
				this.validation_rules['reg_num']['m'] = 'true';
				this.validation_rules['ins_exp_dt']['m'] = 'true';
				this.validation_rules['ins_idv']['m'] = 'false';
				this.validation_rules['ins_id']['m'] = 'true';
				this.insurance_dt = false;
				this.insurance_dt_state();
			}

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
                        this.get_all_common_master_list();
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
            async get_all_common_master_list(){
                try {
                    await axios({
                        url: 'http://localhost:5000/get_common_masters_list',
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
                                    this.mg_org_id = response.data['mg_make_org_id'];
							        this.states = response.data['states_ares_list'];
                                    this.colors = response.data['exterior_colors'];
                                    this.dealers = response.data['dealer_branches'];
                                    this.bank_names_list = response.data['banks'];
                                    this.fuel_type_list = response.data['fuel_type_list'];
                                    this.vechicle_condition_list = response.data['vechicle_condition_list'];
                                    this.owners_list = response.data['owners_list'];
                                    this.insurance_type_list = response.data['insurance_type_list'];
                                    this.mode_of_sale_list = response.data['mode_of_sale_list'];
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
        }
    }
</script>