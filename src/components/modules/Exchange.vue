<template>
   <div class="row mt-2">
   <div class="col-md-6 col-sm-6">
       <h6>Exchange Lead Masters</h6>
   </div>
   <div class="col-md-6 col-sm-6">
   <input type="button" v-on:click="add_lead_modal" class="btn btn-red btn-sm float-right" value="Add a New Lead">
   </div>
   </div>
   <div class="row">
       <div v-bind:class="{'alert alert-danger alert-sm m-2 w-100':(api_error)}" v-if="api_error">
       {{api_error}}
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
       </button>
       </div>
   </div>
   <!-- Validation Errors -->
   <div class="row">
       <div v-bind:class="{'alert alert-danger alert-sm m-2 w-100':(global_error)}" v-if="global_error">
           {{global_error}}
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
               <span aria-hidden="true">&times;</span>
           </button>
       </div>
       <div class="alert alert-danger alert-sm ml-5 w-50" id="verrors" role="alert" v-if="errors!=false">
           <ul>
               <li v-for="e in errors">{{ e }}</li>
           </ul>
       </div>
   </div>
   <!--search buttons start-->
<div class="row mt-2">
  <div class="col-md-12 col-sm-12 d-flex flex-w-1">
     <input type="text" class="form-control form-control-sm m-1 w-10" placeholder="Seller Name" v-model="search_form['name']" @input="alphaOnly" @keyup.enter="search_pm">
     <input type="text" class="form-control form-control-sm m-1 w-10" placeholder="Mobile Number" v-model="search_form['mobile']" maxlength="10" v-on:keypress="isNumber" id="mobile" @keyup.enter="search_pm">
     <input type="text" class="form-control form-control-sm m-1 w-10" placeholder="Exchange ID" v-model="search_form['id']" @input="alphaNumeric" @keyup.enter="search_pm">
     <input type="text" class="form-control form-control-sm m-1 w-10" placeholder="Opportunity ID" v-model="search_form['opp_id']"  @input="alphaNumeric" @keyup.enter="search_pm">
     <input type="text" class="form-control form-control-sm m-1 w-10" placeholder="Car Reg.No." v-model="search_form['registration_no']" @input="alphaNumeric" @keyup.enter="search_pm">
     <input type="text" class="form-control form-control-sm m-1 w-10" placeholder="Chassis/VIN No." v-model="search_form['chass_no']" @input="alphaNumeric" maxlength="17" @keyup.enter="search_pm">
     <select id="make-list" class="form-control form-control-sm m-1 w-10 selectpicker" data-virtual-scroll="false" data-live-search="true" v-model="search_form['enc_make_id']" v-on:change="get_make_models(2)" autocomplete="off">
        <option value="" >Select Make</option>
        <!--
        <option v-for="make in makes" v-bind:value="make.enc_make_id">{{make.make}}</option>-->
       <!-- <optgroup label="Popular Makes" >
           <option v-for="make in makes" v-if="make.is_pop=='y'" v-bind:value="make.enc_make_id">{{make.make}}</option>
        </optgroup>
        <optgroup label="Other Makes">
           <option v-for="make in makes" v-if="make.is_pop=='n'" v-bind:value="make.enc_make_id">{{make.make}}</option>
        </optgroup> -->
     </select>
     <select  id="model-list" class="form-control form-control-sm m-1 w-10 selectpicker" data-virtual-scroll="false" data-live-search="true" autocomplete="off" v-model="search_form['enc_model_id']">
        <option value="" >Select Model</option>
        <option v-for="model in search_models" v-bind:value="model.enc_model_id">{{model.model}}</option>
     </select>
  </div>
  <div class="col-md-12 col-sm-12 d-flex item-align">
  <select v-if="role_id==1" class="form-control form-control-sm m-1 w-16" v-model="search_form['enc_dealer_id']" v-on:change="get_dealers_executives(1)">
        <option value="" >Dealer Branch</option>
        <option v-for="dealerval,index in dealers" v-bind:value="dealerval.enc_branch_id">{{dealerval.brn_name}}</option>
     </select>   
     <select v-else-if="role_id!=1 && dealers.length>1" class="form-control form-control-sm m-1 w-16" v-model="search_form['enc_dealer_id']" v-on:change="get_dealers_executives(1)">
        <option value="" >Dealer Branch</option>
        <option v-for="dealerval,index in dealers" v-bind:value="dealerval.enc_branch_id">{{dealerval.brn_name}}</option>
     </select>    
    <input type="text" v-else  v-bind:value="brn_name"  class="form-control form-control-sm m-1 w-16" readonly>
     <select v-if="role_id==1" class="form-control form-control-sm m-1 w-16" v-model="search_form['enc_executive_id']">
        <option value="">Select Executive</option>
        <option v-for="executivesval in search_executives" v-bind:value="executivesval.enc_executive_id">{{executivesval.emp_name}}</option>
     </select>
     <input type="text"  v-else  v-bind:value="exe_name" class="form-control form-control-sm m-1  w-16" readonly>
     <button class="btn btn-red btn-sm mr-2 ml-2 btn-ht" v-bind:readonly="f_tab==''" v-on:click="search_pm()"> SEARCH</button>
     <button class="btn btn-light border-black btn-sm" v-bind:readonly="f_tab==''" v-on:click="reset_getdata"> Reset</button>
  </div>
</div>

<div class="row d-flex align-items-center" style="min-height:55vh" v-if="f_tab=='111'">
  <div class="col-12 box"><h2 class="alert alert-danger text-center"> You have no access to view Exchange module Lead Masters </h2></div>
</div>
<div v-else>
<div class="row mt-2 tabsout">
  <!--
  <div class="col-md-12 col-sm-12 bg-dark menutabs">
     <a class="active" style="width: 5%;">All</a>
     <a class="">Pending Evaluation(0)</a>
     <a class="">Appointment Confirmed(0)</a>
     <a class="">Price Pending(0)</a>
     <a class="">Under Follow-Up(0)</a>
     <a class="">Pending Stock-In(0)</a>
     <a class="" style="width: 16%;">Stock-In Done - Docs Pending(0)</a>
     <a class="" style="width: 8%;">Stock-In Done</a>
     <a class="" style="width: 8.5%;">Closed/Lost(0)</a>
  </div>
  -->
  <div class="col-md-12 col-sm-12 bg-dark menutabs">
  <ul class="border-bottom-0 prjct-nav mb-3 list bg-dark">
     <li>
      <a style="width: 5%;" v-bind:class="{ active : active_element == 1 }" v-on:click="search_tab(1,1)">All<span v-if="selleads_count['1']" class="p-1">({{selleads_count['1']}})</span><span v-else class="p-1"> (0)</span></a>
   </li>
    
    <li>
      <a style="width: 5%;" v-bind:class="{ active : active_element == 14 }" v-on:click="search_tab(14,14)">UnAssigned Leads<span v-if="selleads_count['4']" class="p-1">({{selleads_count['4']}})</span><span v-else class="p-1"> (0)</span></a>
   </li>
    <li>
      <a style="width: 5%;" v-bind:class="{ active : active_element == 0 }" v-on:click="search_tab(0,0)">Evaluated<span v-if="selleads_count['0']" class="p-1">({{selleads_count['0']}})</span><span v-else class="p-1"> (0)</span></a>
   </li>
       <li>
      <a style="width: 5%;" v-bind:class="{ active : active_element == 12 }" v-on:click="search_tab(12,12)">Follow-up (Today)<span v-if="selleads_count['2']" class="p-1">({{selleads_count['2']}})</span><span v-else class="p-1"> (0)</span></a>
   </li>
    <li>
      <a style="width: 5%;" v-bind:class="{ active : active_element == 13 }" v-on:click="search_tab(13,13)">Missed Follow Ups<span v-if="selleads_count['3']" class="p-1">({{selleads_count['3']}})</span><span v-else class="p-1"> (0)</span></a>
   </li>
    <li>
       <a  v-bind:class="{ active : active_element == 10 }" v-on:click="search_tab('10',10)">Fresh<span v-if="selleads_count['10']" class="p-1">({{selleads_count['10']}})</span><span v-else class="p-1"> (0)</span></a>
   </li>
    <li>
      <a  v-bind:class="{ active : active_element == 20 }" v-on:click="search_tab('20',20)">Appointment Confirmed<span v-if="selleads_count['20']" class="p-1">({{selleads_count['20']}})</span><span v-else class="p-1"> (0)</span></a>
    </li>
    <li>
      <a  v-bind:class="{ active : active_element == 30 }" v-on:click="search_tab('30',30)">Need Price Approval<span v-if="selleads_count['30']" class="p-1">({{selleads_count['30']}})</span><span v-else class="p-1">(0)</span></a>
   </li>
    <li>
       <a  v-bind:class="{ active : active_element == 40 }" v-on:click="search_tab('40',40)">Price Quote pending<span v-if="selleads_count['40']" class="p-1">({{selleads_count['40']}})</span><span v-else class="p-1">(0)</span></a>
    </li>
    <li>
       <a  v-bind:class="{ active : active_element == 50 }" v-on:click="search_tab('50',50)">Under Negotiation<span v-if="selleads_count['50']" class="p-1">({{selleads_count['50']}})</span><span v-else class="p-1">(0)</span></a>
    </li>
    <li>
       <a  v-bind:class="{ active : active_element == 60 }" v-on:click="search_tab('60',60)">Pending Stock-In<span v-if="selleads_count['60']" class="p-1">({{selleads_count['60']}})</span><span v-else class="p-1">(0)</span></a>
    </li>
    <li>
       <a style="width: 16%;" v-bind:class="{ active : active_element == 70 }" v-on:click="search_tab('70',70)">Possession Pending - Documents Pending<span v-if="selleads_count['70']" class="p-1">({{selleads_count['70']}})</span><span v-else class="p-1">(0)</span></a>
    </li>
    <li>
       <a style="width: 8.5%;" v-bind:class="{ active : active_element == 80 }" v-on:click="search_tab('80',80)">Possession Pending - Documents Received<span v-if="selleads_count['80']" class="p-1">({{selleads_count['80']}})</span><span v-else class="p-1">(0)</span></a>
    </li>
    
    <li>
       <a style="width: 8.5%;" v-bind:class="{ active : active_element == 90 }" v-on:click="search_tab('90',90)">Possession Done - Documents Pending<span v-if="selleads_count['90']" class="p-1">({{selleads_count['90']}})</span><span v-else class="p-1">(0)</span></a>
    </li>
    
    
    <li>
       <a style="width: 8.5%;" v-bind:class="{ active : active_element == 999 }" v-on:click="search_tab('999',999)">Possession Done - Documents Received<span v-if="selleads_count['999']" class="p-1">({{selleads_count['999']}})</span><span v-else class="p-1">(0)</span></a>
    </li>
    <li>
     <a style="width: 5%;" v-bind:class="{ active : active_element == 9 }" v-on:click="search_tab(9,9)">Plan Postponed<span v-if="selleads_count['9']" class="p-1">({{selleads_count['9']}})</span><span v-else class="p-1"> (0)</span></a>
   </li>
    <li>
      <a style="width: 8.5%;" v-bind:class="{ active : active_element == 9999 }" v-on:click="search_tab('9999',99)">Closed<span v-if="selleads_count['9999']" class="p-1">({{selleads_count['9999']}})</span><span v-else class="p-1">(0)</span></a>
    </li>
    <li><a style="width: 8.5%;" v-bind:class="{ active : active_element == 1000 }" v-on:click="search_tab('1111',1111)">Auctions <span v-if="selleads_count['1111']">({{selleads_count['1111']}})</span><span v-else>(0)</span></a></li>
   </ul>
  </div>
</div>
<!--search buttons end-->
<!--pagenation start-->
<div class="row mt-2">
  <div class="col-6">
     <b>Per Page:</b>
     <select  v-model="records_perpage" class="m-1" v-on:change="show_lead_masterlist">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
     </select>  Displaying {{ from_records }} to {{ to_records}} of {{ total_records }} Leads
  </div>
   <div class="col-6 align-self-center">
        
        <nav aria-label="Page navigation pagination-sm example" style="float:right;">
             <ul class="pagination m-0">
                <!--<li class="page-item" v-bind:class="{disabled: preStatus() }"><a href="javascript:void(0)" class="page-link" v-on:click="firstPage()">First</a></li> -->
     
                  <li class="page-item border-right" v-bind:class="{disabled: preStatus() }">
                 <a href="javascript:void(0)" v-on:click="prePage()" class="btn btn-primary btn-sm"><i class="fa fa-angle-left"></i> Previous</a>
              </li>
              <!--<li class="page-item" v-for="page in pages" v-bind:class="{ active:activePage(page.pno) }">
                 <a href="javascript:void(0)" class="page-link" v-on:click="clickPage(page.pno)"> {{ page.pno }}</a>
              </li> -->
                       
                  <li class="page-item ml-3" v-bind:class="{disabled: lastStatus() }">
                  <a href="javascript:void(0)" class="btn btn-primary btn-sm" v-on:click="nextPage()">Next <i class="fa fa-angle-right"></i></a>
              </li>
               <!--<li class="page-item" v-bind:class="{disabled: lastStatus() }"><a href="javascript:void(0)" class="page-link" v-on:click="lastPage()">Last</a></li> -->
           </ul>
        </nav>
     </div>
  
  
  
  
   <div class="col-6 float-right">
 <!-- <button class="btn btn-red btn-sm m-1 float-right" > SEND SMS/EMAIL</button> -->
  </div>
</div>
<!--pagenation end-->

<!--display exchange data start-->   
<div class="row mt-2 purchasemaster_table">
  <div class="col-md-12 col-sm-12">
     <table class="table table-bordered table-hover table-sm" >
        <thead class="table-dark" style="color:black;">
           <td><input type="checkbox"></td>
           <td>Images</td>
           <td>Lead Assignment</td>
           <td>Seller Details</td>
           <td>Car Details</td>
           <td>Price</td>
           <td>Lead Status</td>
           <td width="130">Actions</td>
        </thead>
        <tbody style="font-size:13px;">
           <tr class="text-center" v-show="isldrimg"><img   :src="imgsrc" class="lodrclass"></tr>
           <tr v-for="val,index in sell_leads_masterlist">
              <td><input type="checkbox"></td>
              <td align="center">
                 <div v-if="val['images_default']!=''" style="cursor: pointer;">
                    <img v-bind:src="val['images_default']" alt="" width="100" height="75" style="margin: auto;margin-top: 4px;" v-on:click="show_modal(val['enc_id'])">
                 <br>
                 <label class="mt-4">{{val['images_count']}}<br>Images</label>
                 
                 </div>
                 
                 <div v-else>
                    <img src="/images/error1.jpg" alt="" width="100" height="75" style="margin: auto;margin-top: 4px;"  >
                 </div>
              </td>
              <td>
                 <div>Reassure Lead ID:<label>{{ val['exchange_code']!=''?val['exchange_code']:'' }}</label></div>
                
                 <div v-if="val['opp_id']!=''&&val['opp_id']!='0'">Opportunity ID:<label>{{ val['opp_id']}}</label></div>
                 <div v-else-if="val['c4c_leadid']!=0">C4C Lead ID:<label>{{ val['c4c_leadid']}}</label></div>
                 <!--<div v-else >Opportunity ID:<label>NA</label></div> -->
                 
                 <label><a href="#" v-on:click="assign_lead_modal(val)"><u>{{ val['branch']!=''?val['branch']:'' }}</u></a></label>
                
                 <div><label>{{ val['executive_name']!=''?val['executive_name']:''  }}</label></div>
                 <div><label>{{ val['source']==''?'':val['source']+',&nbsp;'+val['source_sub']}}</label></div>
                
              </td>
              <td>
                 <div><b>{{ val['name']!=''?val['name']:''}}</b></div>
                 <div>{{ val['mobile']!=''?val['mobile']:''}}</div>
                  <div>{{val['city']!=''?val['city']:''}}</div>
                  <div class="mt-2">Lead Added:</div>
                 <div>{{val['c_date'] }}</div>
              </td>
              <td>
              <div><b><span>{{val['reg_num']==''?'':"("+val['reg_num']+")"+"&nbsp;"}}</span>{{val['manuf_year']+"&nbsp;"+val['make']+"&nbsp;"+val['model']+"&nbsp;"+val['variant']}}</b></div>
                 <div><span v-if="val['milage_km']!=0">{{val['milage_km']+"&nbsp;KMs Driven"+","}}</span>
                    <span v-for="owner, i in  owners_list">
                         <span  v-if="i==val['owner_id']">{{owner}}</span>
                    </span>
                 </div>
                 
                 <label class="mt-3"><a href="javascript:void(0)"  v-if="val['evaluation_done']==1 && val['template_values']!=''"><u>Check Evaluation Sheet</u></a></label>
                 <div v-if="val['reason_for_sell']=='Wants to buy new car'">
                  <div><b>Interested Car</b></div>
                 <div>
                    <label class="mt-1" >
                       <span>{{val['sell_model']+"&nbsp;"+val['sell_variant']}}</span></label>
                       </div>
                 <div> <b>NC Consultant:</b> <label>{{ val['c4c_consult_name']!=''?val['c4c_consult_name']:'NA'}}</label></div>
                 
                 </div>
              <!--   <div v-if="val['sell_make']">
                 <div><b>Interested Car</b></div>
                 <div>
                    <label class="mt-1" >
                       <span v-if="val['sell_make']">{{val['sell_make']+"&nbsp;"+val['sell_model']+"&nbsp;"+val['sell_variant']}}</span><span v-else>NA</span></label>
                       </div>
                 <div>Consultant Name: <label>{{ val['c4c_consult_name']!=''?val['c4c_consult_name']:'NA'}}</label></div>
                   <div>Consultant ID: <label>{{ val['c4c_consult_id']!=''?val['c4c_consult_id']:'NA'}}</label></div> 
                 </div>-->
                 
                 
              </td>
              <td>
                 <div>Last Offer:<span v-if="val['exe_quote']!=0">{{"&#x20B9;&nbsp;"+val['exe_quote']}}</span><span v-else>NA</span></div>
               
                 <div>Customer Expectations:<span v-if="val['cust_exp']!=0">{{"&#x20B9;&nbsp;"+val['cust_exp']}}</span><span v-else>NA</span></div>
                 <div>Trade-In Price:<label v-if="val['status']>='60' && val['exe_quote']!=0">{{"&#x20B9;&nbsp;"+val['exe_quote']}}</label><span v-else>NA</span></div>
               <div v-if="val['make']=='MG'">MGI Grid:<span><span v-if="val['mg_grid_min']!='0' && val['mg_grid_max']!='0' ">{{"&#x20B9;&nbsp;"+val['mg_grid_min'] +"&nbsp;to&nbsp;&#x20B9;&nbsp;"+val['mg_grid_max']}}</span><span v-else>NA</span></span></div>
               <div v-if="val['make']!='MG'">CTE Grid:<span v-if="val['fair_price']!='' && val['excellent_price']!='' ">{{"&#x20B9;&nbsp;"+val['fair_price'] +"&nbsp;to&nbsp;&#x20B9;&nbsp;"+val['excellent_price']}}</span><span v-else>NA</span></div>
                 <div class="mt-2">
                 <!-- <a href="#" v-on:click="get_past_transactions(val['enc_id'])"><u>Past Transactions</u></a> -->
                       <div class="tooltip-wrap" style="width: fit-content;">
                         <a href="javascript:void(0)" @mouseover="get_past_transactions(val['enc_id'])">Past Transactions</a>
                         <div class="tooltip-content tooltip-left shadow">
                          <h6 style="font-size:14px; margin-bottom:5px;">PAST PRICES (LAST 4 MONTHS)</h6>
                          
                             <table class="table table-bordered table-sm m-0" style="background:#fbfbfb;" v-if="show_prices">
                                   <tr>
                                       <th scope="col">Prices</th>
                                       <th scope="col">Minimum</th>
                                       <th scope="col">Maximum</th>
                                   </tr>
                                   <tr>
                                   <td>Quoted Buying Price</td>
                                   <td><span v-if="car_prices['min_exe_quote']!=0 && car_prices['min_exe_quote']!='NaN'">{{"&#x20B9;&nbsp;"+car_prices['min_exe_quote']}}</span><span v-else>NA</span></td>
                                   <td><span v-if="car_prices['max_exe_quote']!=0 && car_prices['max_exe_quote']!='NaN'">{{"&#x20B9;&nbsp;"+car_prices['max_exe_quote']}}</span><span v-else>NA</span></td>
                                  </tr>
                                  <tr>
                                   <td>Actual Buying Price</td>
                                   <td><span v-if="car_prices['min_actual_bp']!=0 && car_prices['min_actual_bp']!='NaN'">{{"&#x20B9;&nbsp;"+car_prices['min_actual_bp']}}</span><span v-else>NA</span></td>
                                   <td><span v-if="car_prices['max_actual_bp']!=0 && car_prices['max_actual_bp']!='NaN'">{{"&#x20B9;&nbsp;"+car_prices['max_actual_bp']}}</span><span v-else>NA</span></td>
                                  </tr>
                             </table>
                             <template v-else>
                                <button class="btn d-flex" style="align-items:center; width: 130px; margin: auto;" type="button" disabled><span  class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>Loading...</button>                     
                             </template>
                          </div>  
                       </div>
                 </div>
                 
              </td>
              <td>
                 <div><b><span v-if="val['status']==999 || val['status']==7777" style="color:#059805">{{status_list[val['status']]}}</span>
                 <span v-else-if="val['status']==9999" style="color:#CF2230">{{status_list[val['status']]}}</span>
                 <span v-else style="color:#056BA6">{{status_list[val['status']]}}</span></b></div>
                 <div >Last Update:
                 <label>{{ val['u_date'] }}</label>
                 </div>
                 <div >Date of Evaluation:
                 <label>{{val['evaluation_date']}}</label>
                 </div>
                 <div class="mt-2">Next FUP: 
                 <label v-if="val['status_followup_date'] && val['status']!=999 && val['status']!=9999 && val['status']!=7777">{{val['status_followup_date']}}</label>
                <!-- <label v-if="val['status']=='20'">{{val['status_followup_date']}}</label>-->
                 <label v-else>NA</label>
                 </div>
                
                 <label class="mt-3"><a href="#" v-on:click="cfc_activities_model(val['opp_id'])" v-if="val['opp_id']" ><u>Check C4C activities</u></a></label> 
              </td>
              <td align="center">
              <div>
              <span v-if="val['dupl_flag']==0&&val['status']>='30' && val['status']<'999' && (val['is_mannual']=='1'||val['is_mannual']=='2')">
              <button class="btn btn-red btn-sm m-1" v-if="val['dupl_flag']==0" v-on:click="$emit('navigate', {'tab':'exchange_module_edit_c4c_lead_details/'+val['enc_id']+'/'})">EDIT LEAD</button>
              </span>
              <span v-else>
                 <button  class="btn btn-red btn-sm m-1" v-if="val['dupl_flag']==0&&val['make']=='MG'" v-on:click="show_component('exchange_edit/status_updates/'+val['id'])">EDIT LEAD</button>
                 <button class="btn btn-red btn-sm m-1" v-if="val['dupl_flag']==0&&val['make']!='MG'" v-on:click="show_component('exchange_edit/status_updates/'+val['id'])">EDIT LEAD</button>
                 <span v-if="val['lead_reopen_status']==0">
                 <button class="btn btn-secondary btn-sm btn-min"  v-if="role_id==1&&((val['status']>=30&&val['status']<70)|| (val['evaluation_done']==1 && val['accessories_d']!='' && val['images_count']>=10 && val['status']==10 && val['auc_led_flg']=='' && val['auc_car_flg']==''))&&cte_id!=''" v-on:click="show_auctions_modal(val)">Push For Auctions </button>
                 </span>
                 <span v-else><button class="btn btn-secondary btn-sm btn-min"  v-if="role_id==1&&((val['status']>=30&&val['status']<70)|| (val['evaluation_done']==1 && val['accessories_d']!='' && val['images_count']>=10 && val['status']==10 && val['auc_led_flg']=='' && val['auc_car_flg']==''))&&cte_id!=''" disabled v-on:click="show_auctions_modal(val)" data-toggle="tooltip" data-placement="top" title="Help request was raised for the lead">Push For Auctions </button> </span> 
                </span>
             </div>
              <div class="mt-3">
             <a href="#" v-if="val['dupl_flag']==0" v-on:click="status_history_model(val['enc_id'])"><u>Status History</u></a>
             </div>
             <div class="mt-3" v-if="val['dupl_flag']==0&&val['status']>20&&(val['status']<90||val['status']==9999)&&val['lead_reopen_status']==0">
              <button class="btn btn-sm btn-primary m-1"  v-on:click="show_lead_update_request_modal(index)" style="width:90px">Help</button>
             </div>
             <button class="btn btn-warning btn-sm m-1" v-if="val['dupl_flag']==1" v-on:click="find_dup_records(val)">DUPLICATE LEAD</button>
            </td>
           </tr>
           <tr v-if="total_records==0">
              <td colspan="10">No records found</td>
           </tr>
        </tbody>
     </table>
  </div>
   </div>
</div>
<!--display exchange data end-->
</template>

<script>
   import router from "../../router"    
   import axios from "axios"    
   export default {    
       name: "Exchange", 
       data(){
           return {
               role_id:'',
               brn_name:'',
               api_error:'',
               exe_name:'',
               form_error:"",
               form_errors:"",
               errors:[],
               form_status:"",
               form_success:"",
               screens_list:[],
               opp_blank:"",
               tab_status:1,
               global_error: "",
               global_token:"",
               old_global_token:"",
               uploadedfile:"",
               other_reason_state:false,
               hide_make:false,
               hide_loader:false,
               save_btn:true,
               rais_btn:true,
               hide_modal_variant:false,
               duplic_banner:false,
               images_lead_id:[],
               states:[],
               cities:[],
               makes:[],
               models:[],
               show_prices:false,
               exmodels:[],
               variants:[],
               makes_by_years:[],
               models_by_makes:[],
               variants_by_models:[],
               exvariants:[],
               executives:[],
               executives_lead:[],
               search_executives:[],
               search_models:[],
               sources_list:[],
               salesmode_list:[],
               sub_sources_list:[],
               dealers:[],
               years: [],
               min_year: 2004,
               max_year: new Date().getFullYear(),
               api_calls_queue: [],
               api_call_busy: false,
               records_perpage:10,
               totalPages:{type:Number},
               visiblePage:4,
               currentPage:{ type:Number},
               total_records: 0,
               //pagenation 
               from_records:1,
               to_records:10,
               total_records: 0,
               sell_leads_masterlist:[],
               selleads_count:[],
               status_list:[],
               active_element: 1,
               activeImage: 0,
               slider_images:[],
               tab_details:[],
               status_history:[],float_error:'',
               history_count:0,
               status_list_history:[],
               template: [],
               template_values: {},

               template_data:{},
               owners_list:{},
               cat_cost:[],
               car_prices_list:[],
               grp_cost:[],
               api_error :"",
               total_cost:"",
               lead_details:{},
               cfc_activity_data:{},
               hide_loader_c4c:true,
               hide_loader_c4c_span:false,
               hide_loader_reqlead:false,
               vcont_url:"",
               uploadfile_name:"",
               sell_leads_masterlist:[],
               selllead_bucket_list:{
                  "all":"1",
                  "unassigned_leads":"14",
                  "evaluated":"0",
                  "today_fup":"12",
                  "missed_fup":"13",
                  "fresh":"10",
                  "appointment_confirmed":"20",
                  "need_price_approval":"30",
                  "price_quote_pending":"40",
                  "under_negotiation":"50",
                  "pending_stockin":"60",
                  "pos_pend_doc_pend":"70",
                  "pos_pend_doc_rec":"80",
                  "pos_done_doc_pend":"90",
                  "pos_done_doc_rec":"999",
                  "plan_postponed":"9" ,
                  "closed":"9999",
               },
               add_new_lead:{
                  "title":"",
                  "first_name":"",
                  //"middle_name":"",
                  "last_name":"",
                  "mobile_number":"",
                  "email_id":"",
                  "res_address":"",
                  
                  "pincode":"",
                  "enc_source_id":"",
                  "enc_source_sub_id":"",
                  "manufac_year":"",
                  "enc_make_id":"",
                  "enc_model_id":"",
                  "enc_state_id":"",
                  "enc_city_id":"",
                  "state_id":"",
                  "city_id":"",
                  "enc_variant_id":"",
                  "for_selling":"",
                  "enc_branch_id":"",
                  "enc_executive_id":"",
                  "reason_for_sell":"",
                  "sell_make_id":"",
                  "sell_model_id":"",
                  "sell_variant_id":""
                        
               },
               search_form:{
                  "name":null,
                  "mobile":null,
                  "id":null,
                  "opp_id":null,
                  "registration_no":null,
                  "chass_no":null,
                  "enc_make_id":'',
                  "enc_model_id":'',
                  "enc_dealer_id":'',
                  "enc_executive_id":'',
                  "enc_branch_id":'',

               },
               assign_lead:{
                  "seller_assign_lead_id":'',
                  "enc_dealer_id":"",
                  "enc_executive_id":"",
            
               },
               validation_errors: {},
               validation_rules: {
               
                  "title": {
                     'm': 'false',
                     'type': 'select',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Title'
                  },
                  "first_name": {
                     'm': 'true',
                     'type': 'text',
                     'flag':1,
                     'regexp':/^[a-zA-Z\s]{2,40}$/,
                     'msg': 'First name must only contain letters! and should not cross 40 characters'
                  },
                  /*"middle_name": {
                           'm': 'false',
                           'type': 'text',
                           'flag':1,
                           'regexp':/^[a-zA-Z\s]{1,15}$/,
                           'msg': 'Enter Middle Name Should be contains Alpabets'
                  },*/
                  "last_name": {
                     'm': 'true',
                     'type': 'text',
                     'flag':1,
                     'regexp':/^[a-zA-Z\s]{1,40}$/,
                     'msg': 'Last name must only contain letters! and should not cross 40 characters'
                  },
                  "mobile_number": {
                     'm': 'true',
                     'type': 'number',
                     'flag':1,
                     'regexp':/^[6-9]\d{9}$/,
                     'msg': 'Enter valid mobile number'
                  },
                  "email_id": {
                     'm': 'false',
                     'type': 'email',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Enter valid email address'
                  },
                  "res_address": {
                     'm': 'false',
                     'type': 'text',
                     'flag':1,
                     'regexp': /^[a-zA-Z0-9 \\s,.:&#/()\n'-]{3,140}$/,
                     'msg': 'Enter residential address'
                  },
                  "pincode": {
                     'm': 'false',
                     'type': 'text',
                     'flag':1,
                     'regexp':'',
                     'msg': 'Enter pincode'
                  },
                  "enc_source_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Source'
                  },
                  "enc_source_sub_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Channel'
                  },
                  "manufac_year": {
                     'm': 'true',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select year of manufacturing'
                  },
                  "enc_make_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Make'
                  },
                  "enc_model_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Model'
                  },
                  "enc_variant_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Variant'
                  },
                  "enc_state_id": {
                     'm': 'false',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select State'
                  },
                  "enc_city_id": {
                     'm': 'false',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select City'
                  },                
                  "enc_branch_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag':2,
                     'regexp': '',
                     'msg': 'Select Branch'
                  },
                  "enc_executive_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag':2,
                     'regexp': '',
                     'msg': 'Select Executive'
                  },
                  "reason_for_sell":{
                     'm': 'true',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Reason for Selling'
                  },
                  "sell_make_id":{
                     'm': 'false',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Make'
                  },
                  "sell_model_id":{
                     'm': 'false',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Model'
                  },
                  "sell_variant_id":{
                     'm': 'false',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Select Variant'
                  },                                      
                  "other_reason_note":{
                     'm': 'false',
                     'type': 'text',
                     'flag':1,
                     'regexp': '',
                     'msg': 'Enter reason'
                  },
               },
               car_prices:{
                  "max_actual_bp":0,
                  "max_exe_quote":0,
                  "min_actual_bp":0,
                  "min_exe_quote":0
               },
               f_tab:"", //first tab
               bucketsCount:0,
               screens_list_mg:[],
               isldrimg:false,
               imgsrc:"/images/app_loader.gif",
               status_chg_error:"",
               status_chg_success:"",
               reopen_reason:"",
               request_doc:"",
               lead_update_id:"",
               "img_file": {
                  "request_doc": {
                     "filename": "",
                     "filepath": "",
                     "selected_file": false,
                     "uploaded": false,
                     "uploading": false,
                     "error": "",
                     "msg": "",
                  }
               },
               reopen_led:{
                  rep_ledid:"",
                  rep_oppid:"",
                  rep_c4cid:"",
                  rep_cardet:""
               },
               cte_id:'',
               auctiondata_validations:{
                  'auction_title':'',
                  'auction_type':'',
                  'min_bid_val':'',
                  'reserve_price':'',
                  'start_time':'',
                  'end_time':'',
                  'rc_available':'',
                  'payment_terms':'',
               },
               auction_validation_rules: {
                   "auction_title": {
                       'm': 'true',
                       'type': 'text',
                       'flag': 1,
                       'regexp': '',
                       'msg': 'Enter Auction Title'
                   },
                   "auction_type": {
                       'm': 'true',
                       'type': 'text',
                       'flag': 1,
                       'regexp': '',
                       'msg': 'Select Auction Type'
                   },
                   "min_bid_val": {
                       'm': 'true',
                       'type': 'text',
                       'flag': 1,
                       'regexp': '',
                       'msg': 'Enter Min. Bid value'
                   },
                   "reserve_price": {
                       'm': 'true',
                       'type': 'text',
                       'flag': 1,
                       'regexp': '',
                       'msg': 'Enter Reserve Price'
                   },
                   "start_time": {
                       'm': 'true',
                       'type': 'text',
                       'flag': 1,
                       'regexp': '',
                       'msg': 'Select Auction Start Time'
                   },
                   "end_time": {
                       'm': 'true',
                       'type': 'text',
                       'v_flag': 1,
                       'regexp': '',
                       'msg': 'Select Auction End Time'
                   },
                   "rc_available": {
                       'm': 'true',
                       'type': 'text',
                       'v_flag': 1,
                       'regexp': '',
                       'msg': 'Select RC Available'
                   },
                   "payment_terms": {
                       'm': 'true',
                       'type': 'text',
                       'v_flag': 1,
                       'regexp': '',
                       'msg': 'Enter payment terms'
                   },
               },
               auc_conf_btn:true,
               aucdate_key:0,
               auction_inv:{},
               auctiondata:{
                   'exchange_code':'',
                   'auction_title':'',
                   'auction_type':'',
                   'min_bid_val':'',
                   'reserve_price':'',
                   'min_incr_bid_val':'',
                   'start_time':'',
                   'end_time':'',
                   'rc_available':'',
                   'payment_terms':'',
               },
               up_docname:"",
           }
       },
       mounted:function() {

       },
       async created() {
        await axios({
                 url: 'http://localhost:5000/getAllExchangeLeads',
                 method: 'post',
                    params: {
                          min: 10,
                          page: 1
                    
                    }
              }).then(response => { 
                 this.sell_leads_masterlist = response.data.records
              })
              .catch(error => {
                 console.log(error.response)
              });
        },
       methods:{
            show_component:function(comp){
               //router.push({ name: comp , params: {enc_id: encid, vtab: 'status_updates'}});
               router.push({ path: comp, params: {vtab: 'status_updates'}});
            },
            call_api: function( vfunction, nextfunction, pageno,argument1){
                  if(pageno){
                           this.currentPage=pageno;
                  }
                  this.api_calls_queue.push( {"function": vfunction, "next": nextfunction,"argument1":argument1});
                  //console.log(this.api_call_busy);
                  if( this.api_call_busy == false ){
                           this.process_api_call_queue();
                  }
            },
            process_api_call_queue_next: function(){
                  //console.log("next");
                  this.api_call_busy = false;
                  setTimeout(this.process_api_call_queue,200);
            },
            process_api_call_queue: function(){
                  if( this.api_calls_queue.length > 0 ){
                           var api = this.api_calls_queue.splice(0,1)[0];
                           //this[function_name]()
                           //console.log( api );
                           try{
                                    if(api['argument1']!=undefined && api['argument1']!=null)
                                    {
                                          this[ api['function'] ](api['argument1']);
                                    }
                                    else{
                                          this[ api['function'] ]();
                                    }
                                    this.api_call_busy = true;
                           }catch(e){
                                    console.log("Function name not found: " + api['function'] );
                                    //alert("Function name not found! " + api['function'] );
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
                        //console.log(response); 
                        this.global_token = response.data['token'];
                    })
                }
                catch(error){
                        console.log(error.response)
                };
            }, 
            async getExchangeMasters() {
                  await axios({
                     url: 'http://localhost:5000/getAllExchangeLeads',
                     method: 'post',
                     data: {
                        "token": this.global_token,
                     },
                     params: {
                           min: 10,
                           page: 1,
                     }
                  }).then(response => { 
                     this.sell_leads_masterlist = response.data.records
                  })
                  .catch(error => {
                     console.log(error.response)
                  });
            },
           year_array() {
                   this.years = new Array(this.max_year - this.min_year).fill(this.max_year).map((n, i) => n - i);
                   this.$nextTick(function(){ $('#makebyyear-list').selectpicker('refresh'); });
                   this.$nextTick(function(){ $('#modelbyyear-list').selectpicker('refresh'); });
           },  
           clear_valid(){
                   this.form_error='';
           },  
           prePage(){
            const pre_page = this.currentPage - 1;
                     if(pre_page >0){
                              this.call_api( "clickPage", false , pre_page);
                     }
            },
            nextPage(){
                     const next_page = Number(this.currentPage) + 1;
                     //console.log(this.totalPages,next_page);
                     if(next_page <= this.totalPages){
                              this.call_api( "clickPage", false , next_page);
                     }
            },
            activePage(pno){
                     return this.currentPage === pno;
            },
            activeClick(pno){
                     this.call_api( "clickPage", false , pno);
            },
            preStatus(){
                     return this.currentPage === 1;
            },
            firstPage(){
                     this.call_api( "clickPage", false , 1);
                     //this.clickPage(1);
            },
            lastPage(){
                     this.call_api( "clickPage", false , this.totalPages);
                     //this.clickPage(this.totalPages);
            },
            lastStatus(){
                     return this.currentPage === this.totalPages;
            },
            search_pm(){
                     //this.tab_status=tab;
                     this.call_api( "clickPage", false , 1);         
                     //this.clickPage(1);
            },
            search_tab(tab,ele){
                     //alert(tab);
                     this.tab_status=tab;
                     this.active_element = ele;
                     this.call_api( "clickPage", false , 1);
            },
            get_past_transactions:function(val){
            }
       }
   }
</script>