<template>
    <div class="row mt-2">
       <div class="col-md-6 col-sm-6">
          <h6>My Stock Masters</h6>
       </div>
       <div class="col-md-6 col-sm-6">
          <input type="button" v-on:click="add_inventory_modal"  class="btn btn-red btn-sm float-right" value="Add a New Stock">
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
       <!-- {{mystock_status_list}}-->
       <div class="col-md-12 col-sm-12 d-flex flex-w-1">
          <input type="text" class="form-control form-control-sm m-1 w-10" placeholder="Stock ID" v-model="search_form['id']" @input="alphaNumeric" @keyup.enter="search_pm">
          <input type="text" class="form-control form-control-sm m-1 w-10" placeholder="Car Reg.No." v-model="search_form['registration_no']"  @input="alphaNumeric" @keyup.enter="search_pm">
          <input type="text" class="form-control form-control-sm m-1 w-10" placeholder="Chassis/VIN No." v-model="search_form['chass_no']" @input="alphaNumeric"  maxlength="17" @keyup.enter="search_pm">
          <select id="make-list" class="form-control form-control-sm m-1 w-10 selectpicker" data-virtual-scroll="true" data-live-search="true" v-model="search_form['enc_make_id']" v-on:change="get_make_models(2)">
             <option value="" >Select Make</option>
             <!--<option v-for="make in makes" v-bind:value="make.enc_make_id">{{make.make}}</option>-->
             <optgroup label="Popular Makes" >
                <!-- <option v-for="make in makes" v-if="make.is_pop=='y'" v-bind:value="make.enc_make_id">{{make.make}}</option> -->
             </optgroup>
             <optgroup label="Other Makes">
                <!-- <option v-for="make in makes" v-if="make.is_pop=='n'" v-bind:value="make.enc_make_id">{{make.make}}</option> -->
             </optgroup>
          </select>
          <select id="model-list" class="form-control form-control-sm m-1 w-10 selectpicker" data-virtual-scroll="true" data-live-search="true" v-model="search_form['enc_model_id']">
             <option value="" >Select Model</option>
             <!-- <option v-for="model in search_models" v-bind:value="model.enc_model_id">{{model.model}}</option> -->
          </select>
          
          <select class="form-control form-control-sm m-1 w-15" v-model="search_form['status']">
             <option value="" >Stock Status</option>
             <!-- <option v-for="val, i in  mystock_status_list" v-bind:value="i">{{val}}</option> -->
          </select>
          
       </div>
       <div class="col-md-12 col-sm-12 d-flex item-align">
          <select v-if="role_id==1" class="form-control form-control-sm m-1 w-16" v-model="search_form['enc_dealer_id']" v-on:change="get_dealers_executives(1)">
             <option value="" >Dealer Branch</option>
             <!-- <option v-for="dealerval,index in dealers" v-bind:value="dealerval.enc_branch_id">{{dealerval.brn_name}}</option> -->
          </select>
          <select v-else-if="role_id!=1 && dealers.length>1" class="form-control form-control-sm m-1 w-16" v-model="search_form['enc_dealer_id']" v-on:change="get_dealers_executives(1)">
             <option value="" >Dealer Branch</option>
             <!-- <option v-for="dealerval,index in dealers" v-bind:value="dealerval.enc_branch_id">{{dealerval.brn_name}}</option> -->
          </select>
          <input type="text" v-else  v-bind:value="brn_name"  class="form-control form-control-sm m-1 w-16" readonly>
          <select v-if="role_id==1" class="form-control form-control-sm m-1 w-16" v-model="search_form['enc_executive_id']">
             <option value="">Select Executive</option>
             <!-- <option v-for="executivesval in search_executives" v-bind:value="executivesval.enc_executive_id">{{executivesval.emp_name}}</option> -->
          </select>
          <input type="text"  v-else  v-bind:value="exe_name" class="form-control form-control-sm m-1 w-16" readonly>
          <button class="btn btn-red btn-sm mr-2 ml-2 btn-ht" v-on:click="search_pm()"> SEARCH</button>
          <button class="btn btn-light border-black btn-sm" v-on:click="reset_getdata"> Reset</button>
       </div>
    </div>
    <div class="row mt-2 tabsout">
       
       <div class="col-md-12 col-sm-12 m-0  bg-dark menutabs">
          <ul class="border-bottom-0 prjct-nav mb-3 list bg-dark">
             <li>
                <a style="width: 5%;" v-bind:class="{ active : active_element == 1 }" v-on:click="search_tab(1,1)">All <span v-if="mystock_count['1']">({{mystock_count['1']}})</span><span v-else>(0)</span></a>
             </li>
             <li>
                <a  v-bind:class="{ active : active_element == 200 }" v-on:click="search_tab('200',200)">Refurbishment Details Pending <span v-if="mystock_count['200']">({{mystock_count['200']}})</span><span v-else>(0)</span></a>
             </li>
             <li>
                <a  v-bind:class="{ active : active_element == 300 }" v-on:click="search_tab('300',300)">Under Certification <span v-if="mystock_count['300']">({{mystock_count['300']}})</span><span v-else>(0)</span></a>
             </li>
             <li><a style="width: 8.5%;" v-bind:class="{ active : active_element == 400 }" v-on:click="search_tab('400',400)">Need certification approval <span v-if="mystock_count['400']">({{mystock_count['400']}})</span><span v-else>(0)</span></a></li>
             <li><a style="width: 8.5%;" v-bind:class="{ active : active_element == 500 }" v-on:click="search_tab('500',500)">Ready For Sale <span v-if="mystock_count['500']">({{mystock_count['500']}})</span><span v-else>(0)</span></a></li>
             <li><a style="width: 8.5%;" v-bind:class="{ active : active_element == 600 }" v-on:click="search_tab('600',600)">Car Booked <span v-if="mystock_count['600']">({{mystock_count['600']}})</span><span v-else>(0)</span></a></li>
             <li><a style="width: 8.5%;" v-bind:class="{ active : active_element == 700 }" v-on:click="search_tab('700',700)">Pending Stock Out (Docs Pending) <span v-if="mystock_count['700']">({{mystock_count['700']}})</span><span v-else>(0)</span></a></li>
             <li><a style="width: 8.5%;" v-bind:class="{ active : active_element == 800 }" v-on:click="search_tab('800',800)">Pending Stock Out (No Docs Pending) <span v-if="mystock_count['800']">({{mystock_count['800']}})</span><span v-else>(0)</span></a></li>
             <li><a style="width: 8.5%;" v-bind:class="{ active : active_element == 900 }" v-on:click="search_tab('900',900)">Car Delivered <span v-if="mystock_count['900']">({{mystock_count['900']}})</span><span v-else>(0)</span></a></li>
             <li><a style="width: 8.5%;" v-bind:class="{ active : active_element == 1000 }" v-on:click="search_tab('1000',1000)">RC Transfer Complete <span v-if="mystock_count['1000']">({{mystock_count['1000']}})</span><span v-else>(0)</span></a></li>
             <li><a style="width: 8.5%;" v-bind:class="{ active : active_element == 1000 }" v-on:click="search_tab('1111',1111)">Auctions <span v-if="mystock_count['1111']">({{mystock_count['1111']}})</span><span v-else>(0)</span></a></li>
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
                
                <li class="page-item border-right">
                   <a href="javascript:void(0)" v-on:click="prePage()" class="btn btn-primary btn-sm"><i class="fa fa-angle-left"></i> Previous</a>
                </li>
                <li class="page-item ml-3">
                   <a href="javascript:void(0)" class="btn btn-primary btn-sm" v-on:click="nextPage()">Next <i class="fa fa-angle-right"></i></a>
                </li>
              
             </ul>
          </nav>
       </div>
       
       
       
    </div>
    <!--pagenation end-->
    <!--display mystock data start-->
    <div class="row mt-2 purchasemaster_table">
       <div class="col-md-12 col-sm-12">
          <table class="table table-bordered table-hover table-sm">
             <thead class="table-dark" style="color:black;">
                <th><input type="checkbox"></th>
                <th>Images</th>
                <th>Stock Assignment</th>
                <th>Dates</th>
                <th>Stock Details</th>
                <th>Price</th>
                <th width="110px">Listed On</th>
                <th>Stock Status</th>
                <th width="130px">Actions</th>
             </thead>
             <tbody style="font-size:13px;">
             <tr class="text-center" v-show="isldrimg"><img   :src="imgsrc" class="lodrclass"></tr>
             <tr v-for="val,index in mystock_masterlist">
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
                   <div>Stock ID :<label>{{ val['inventory_code']!=''?val['inventory_code']:'' }}</label></div>
                   <div><label><a href="#" v-on:click="assign_lead_modal(val)"><u>{{ val['branch']!=''?val['branch']:'' }}</u></a></label></div>
                   <div> <label>{{ val['executive_name']!=''?val['executive_name']:''  }}</label> </div>
                   <div>{{mode_of_sale_list[val['liquidation_mode']]}}</div>
                </td>
                <td>
                   <div>Date of Evaluation : <label>{{val['evaluation_date']}}</label></div>
                   <div>Date of Certification : <label>{{val['certification_date']}}</label></div>
                   <div>Date of Trade-In : <label>{{val['trade_in_date']}}</label></div>
                   <div>Ready For Sale : <label>{{val['readyfor_saledt']}}</label></div>
                   
                </td>
                <td>
                   <div>
                      <b><span>{{val['reg_num']==''?'':"("+val['reg_num']+")"+"&nbsp;"}}</span>{{val['manuf_year']+"&nbsp;"+val['make']+"&nbsp;"+val['model']+"&nbsp;"+val['variant']}}</b>
                   </div>
                   
                   <div><span v-if="val['milage_km']!=0">{{val['milage_km']+"&nbsp;KMs Driven"+","}}</span>
                   <span v-for="owner, i in  owners_list">
                      <span  v-if="i==val['owner_id']">{{owner}}</span>
                   </span>
                </div>
                <div v-if="val['reg_num']!=''">Insurance: <span v-if="val['ins_type'] !=''">{{val['ins_type']}}</span> <span v-else>NA</span> <span v-if="val['ins_exp_dt'] !=''">({{val['ins_exp_dt']}})</span> </div>
             </td>
             <td>
                <div>Listed SP:
                   <label v-if="val['make']=='MG'&&val['car_listing_price']!=0 && val['car_listing_price']!=''" >&#x20B9; {{val['car_listing_price']}} </label>
                   <label v-else-if="val['make']!='MG'&&val['expected_selling_price']!=0 && val['expected_selling_price']!=''" >&#x20B9; {{val['expected_selling_price']}} </label>
                   <label v-else >NA</label>
                </div>
                <div class="mt-1">Total RF Cost:
                   <label v-if="val['final_refurb_cost']!='NA'" >{{"&#x20B9;"+val['final_refurb_cost']}}</label>
                   <label v-else >{{val['final_refurb_cost']}}</label>
                </div>
                <div class="mt-1">Quoted SP:
                   <label v-if="val['quoted_sp_frmbuy']!='NA'" >{{"&#x20B9;"+val['quoted_sp_frmbuy']}}</label>
                   <label v-else >{{val['quoted_sp_frmbuy']}}</label>
                </div>
             </td>
             <td>
                <div>
                   <a href="#" v-on:click="viewleads_modal(val['enc_id'])"><u>View Leads</u></a>
                </div>
             </td>
             <td>
                <div>
                   <b>
                   <span v-if="val['status']>=600" style="color:#059805">{{status_list[val['status']]}}</span>
                   <span v-else style="color:#056BA6">{{ status_list[val['status']] }}</span>
                   </b>
                </div>
                <div><label>{{val['buy_int']}}<span>&nbsp;buyers have shown interest</span></label></div>
                <div><label>{{val['testdr_cnt']}}<span>&nbsp;buyers have taken test drive</span></label></div>
             </td>
             <td align="center">
                <button class="btn btn-red btn-sm m-1" v-if="val['dupl_flag']==0 && val['make']!='MG'&&screens_list.length>0" v-on:click="redirect_edit_screen(index,screens_list[0],0)">Edit Stock</button>
                <button class="btn btn-red btn-sm m-1" v-if="val['dupl_flag']==0 && val['make']=='MG'&& screens_list_mg.length>0" v-on:click="redirect_edit_screen(index,screens_list_mg[0],0)">Edit Stock</button>
                <button class="btn btn-warning btn-sm m-1" v-if="val['dupl_flag']==1" v-on:click="find_dup_records(val)">DUPLICATE LEAD</button>
                <button class="btn btn-secondary btn-sm btn-min"  v-if="role_id==1&&val['status']==500&&cte_id!='' && val['finalized_car']=='n'" v-on:click="show_auctions_modal(val)">Push For Auctions</button> 
             </td> 
          </tr>
          <tr v-if="total_records==0">
             <td colspan="10">No records found</td>
          </tr>
       </tbody>
    </table>
 </div>
 </div>
 <!--display exchange data end-->
 <!--Auction Modal starts-->
 <div class="modal fade" id="auctions_modal" style="overflow: auto;" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-labelledby="adminuser_label" aria-hidden="true">
    <div class="modal-dialog modal-lg">
       <div class="modal-content">
          <div class="modal-header bg-dark p-2">
             <p class="modal-title text-white" id="adminuser_label"><span class="m-2">ID:{{auction_inv['inventory_code']}}</span>  <span class="m-2">{{auction_inv['manuf_year'] +' '+ auction_inv['make'] +' '+ auction_inv['model'] +' '+ auction_inv['variant']}}</span>  <span class="m-2">Stock Status:{{auction_inv['rc_status']}}</span></p>
             <button type="button" class="close" v-on:click="close_auctions_modal" aria-label="Close">
             <span aria-hidden="true" class="text-white">&times;</span>
             </button>
          </div>
          <div class="modal-body">
             <div class="ml-1 mr-1">
                <div class="row mt-3">
                   <div class="col-12">
                      <div v-if="form_error" class="alert alert-danger alert-sm" >{{ form_error }}  </div>
                      <div v-if="form_status" class="alert alert-success alert-sm" >{{ form_status }}</div>
                   </div>
                </div>
                <div class="row mt-2">
                   <div class="col-sm-6 form-row">
                      <label for="name" class="col-sm-4 col-form-label">Registration</label>
                      <div class="col-sm-8">
                         <input type="text" v-model="auction_inv['reg_num']" class="form-control form-control-sm w-100" readonly>
                      </div>
                   </div>
                   <div class="col-sm-6 form-row">
                      <label for="mobile" class="col-sm-4 col-form-label">Stock Status</label>
                      <div class="col-sm-8">
                         <input type="text" v-model="auction_inv['rc_status']" class="form-control form-control-sm w-100" readonly>
                      </div>
                   </div>
                </div>
                <div class="row">
                   <div class="col-sm-6 form-row">
                      <label for="name" class="col-sm-4 col-form-label">Registration Type</label>
                      <div class="col-sm-8">
                        <input type="text" v-model="auction_inv['reg_type']" class="form-control form-control-sm w-100" readonly>
                      </div>
                   </div>
                   <div class="col-sm-6 form-row">
                      <label for="mobile" class="col-sm-4 col-form-label">Insurance Type</label>
                      <div class="col-sm-8">
                         <input type="text" v-model="auction_inv['ins_type']" class="form-control form-control-sm w-100" readonly>
                      </div>
                   </div>
                </div>
                <div class="row">
                   <div class="col-sm-6 form-row">
                      <label for="name" class="col-sm-4 col-form-label">Mfg Year</label>
                      <div class="col-sm-8">
                        <input type="text" v-model="auction_inv['manuf_year']" class="form-control form-control-sm w-100" readonly>
                      </div>
                   </div>
                   <div class="col-sm-6 form-row">
                      <label for="mobile" class="col-sm-4 col-form-label">Valid Insurance</label>
                      <div class="col-sm-8">
                         <input type="text" v-model="auction_inv['insurance']" class="form-control form-control-sm w-100" readonly>
                      </div>
                   </div>
                </div>
                
                <div class="row">
                   <div class="col-sm-6 form-row">
                      <label for="name" class="col-sm-4 col-form-label">Fitness Validity</label>
                      <div class="col-sm-8">
                        <input type="text" v-model="auction_inv['fitness_validity']" class="form-control form-control-sm w-100" readonly>
                     </div>
                   </div>
                   <div class="col-sm-6 form-row">
                      <label for="name" class="col-sm-4 col-form-label">Fuel Type</label>
                      <div class="col-sm-8">
                        <input type="text" v-model="auction_inv['fuel_type']" class="form-control form-control-sm w-100" readonly>
                      </div>
                   </div>
                </div>
                <div class="row">
                   <div class="col-sm-6 form-row">
                      <label for="mobile" class="col-sm-4 col-form-label">Color</label>
                      <div class="col-sm-8">
                         <input type="text" v-model="auction_inv['color']" class="form-control form-control-sm w-100" readonly>
                      </div>
                   </div>
                   <div class="col-sm-6 form-row">
                      <label for="mobile" class="col-sm-4 col-form-label">No of Kms Driven</label>
                      <div class="col-sm-8">
                         <input type="text" v-model="auction_inv['mileage']"  class="form-control form-control-sm w-100" readonly>
                      </div>
                   </div>
                </div>
             </div>
             <div class="row mt-5">
                 <div class="col-sm-2"></div>
                 <div class="col-sm-9">
                      <div class="row">
                         <div class="col-sm-12 form-row">
                             <label for="name" class="col-sm-5 col-form-label">Auction Title<span class="star">*</span></label>
                             <div class="col-sm-7" v-bind:class="[('auction_title' in auctiondata_validations) ? 'verror' : '']">
                                 <input type="text" v-model="auctiondata['auction_title']" class="form-control form-control-sm w-100">
                                 <span class="text-danger" v-if="auctiondata_validations.auction_title" v-text="auctiondata_validations.auction_title"></span>
                             </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-sm-12 form-row">
                             <label for="name" class="col-sm-5 col-form-label">Type of Auction<span class="star">*</span></label>
                             <div class="col-sm-7" v-bind:class="[('auction_type' in auctiondata_validations) ? 'verror' : '']">
                                 <!--<select v-model="auctiondata['auction_type']" class="form-control form-control-sm w-100">
                                     <option value="">Select</option>
                                     <option value="1">Closed Auction</option>
                                     <option value="2">Open Auction</option>
                                 </select>-->
                                  <input type="radio" v-model="auctiondata['auction_type']" value="1"> Closed Auction &nbsp;
                                  <input type="radio" v-model="auctiondata['auction_type']" value="2"> Open Auction
                                 <span class="text-danger" v-if="auctiondata_validations.auction_type" v-text="auctiondata_validations.auction_type"></span>
                             </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-sm-12 form-row">
                             <label for="name" class="col-sm-5 col-form-label">Start Price / Min. Bid Value :<span class="star">*</span></label>
                             <div class="col-sm-7" v-bind:class="[('min_bid_val' in auctiondata_validations) ? 'verror' : '']">
                                 <input type="text" v-model="auctiondata['min_bid_val']" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="9" @input="au_formatCurrency('min_bid_val')" class="form-control form-control-sm w-100">
                                 <span class="text-danger" v-if="auctiondata_validations.min_bid_val" v-text="auctiondata_validations.min_bid_val"></span>
                             </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-sm-12 form-row">
                             <label for="name" class="col-sm-5 col-form-label">Reserve Price :<span class="star">*</span></label>
                             <div class="col-sm-7" v-bind:class="[('reserve_price' in auctiondata_validations) ? 'verror' : '']">
                                 <input type="text" v-model="auctiondata['reserve_price']" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="9" @input="au_formatCurrency('reserve_price')" class="form-control form-control-sm w-100">
                                 <span class="text-danger" v-if="auctiondata_validations.reserve_price" v-text="auctiondata_validations.reserve_price"></span>
                             </div>
                         </div>
                     </div>
                     <!--
                     <div class="row">
                         <div class="col-sm-12 form-row">
                             <label for="name" class="col-sm-5 col-form-label">Min. Incremental Bid :<span class="star">*</span></label>
                             <div class="col-sm-7" v-bind:class="[('min_incr_bid_val' in auctiondata_validations) ? 'verror' : '']">
                                 <input type="text" v-model="auctiondata['min_incr_bid_val']" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" maxlength="9" @input="au_formatCurrency('min_incr_bid_val')" class="form-control form-control-sm w-100">
                                 <span class="text-danger" v-if="auctiondata_validations.min_incr_bid_val" v-text="auctiondata_validations.min_incr_bid_val"></span>
                                 <span v-else class="text-dark" style="font-size:x-small"><b>Ex:</b> 100,500,1500,2200,.. </span>
                             </div>
 
                         </div>
                     </div>
                  -->
                     <div class="row">
                         <div class="col-sm-12 form-row">
                             <label for="name" class="col-sm-5 col-form-label">Auction Start Time :<span class="star">*</span></label>
                             <div class="col-sm-7" v-bind:class="[('start_time' in auctiondata_validations) ? 'verror' : '']">
                                 <mg_date_time v-bind:vdatetime="auctiondata['start_time']" :key="aucdate_key" v-on:edited="edited_date( 'start_time', $event)"></mg_date_time>
                                 <span class="text-danger" v-if="auctiondata_validations.start_time" v-text="auctiondata_validations.start_time"></span>
                             </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-sm-12 form-row">
                             <label for="name" class="col-sm-5 col-form-label">Auction End Time :<span class="star">*</span></label>
                             <div class="col-sm-7" v-bind:class="[('end_time' in auctiondata_validations) ? 'verror' : '']">
                                 <mg_date_time v-bind:vdatetime="auctiondata['end_time']" :key="aucdate_key" v-on:edited="edited_date( 'end_time', $event)"></mg_date_time>
                                 <span class="text-danger" v-if="auctiondata_validations.end_time" v-text="auctiondata_validations.end_time"></span>
                             </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-sm-12 form-row">
                             <label for="name" class="col-sm-5 col-form-label">RC Book Available :<span class="star">*</span></label>
                             <div class="col-sm-7" v-bind:class="[('end_time' in auctiondata_validations) ? 'verror' : '']">
                                 <input type="radio" v-model="auctiondata['rc_available']" value="y"> Yes &nbsp;
                                  <input type="radio" v-model="auctiondata['rc_available']" value="n"> No
                                 <span class="text-danger" v-if="auctiondata_validations.rc_available" v-text="auctiondata_validations.rc_available"></span>
                             </div>
                         </div>
                     </div>
                     <div class="row">
                         <div class="col-sm-12 form-row">
                             <label for="name" class="col-sm-5 col-form-label">Payment Terms :<span class="star">*</span></label>
                             <div class="col-sm-7" v-bind:class="[('end_time' in auctiondata_validations) ? 'verror' : '']">
                                 <textarea class="form-control form-control-sm" maxlength="500" v-model="auctiondata['payment_terms']"></textarea>
                                 <span class="text-danger" v-if="auctiondata_validations.payment_terms" v-text="auctiondata_validations.payment_terms"></span>
                             </div>
                         </div>
                     </div>
                 </div>
                  <div class="col-sm-1"></div>
             </div>
             <div class="mb-2 mt-3 text-center">
                 <button type="button" class="btn btn-red btn-sm" v-on:click="show_auctionSubmit_modal" >Push Vehicle for Auction</button>
             </div>
          </div>
       </div>
    </div>
 </div>
 <!-- Modal -->
 <div class="modal" id="auctionSubmit_modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-lg" role="document" style="width: 100%; height:100%">
     <div class="modal-content" style="width: 400px;
     position: fixed;
     left: -20px;
     right: 0;
     top: 0;
     bottom: 0;
     margin: auto;
     display: inline-table;">
     <div class="modal-header bg-dark p-1">
     <h5 class="modal-title text-white">Confirm</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true" class="text-white">&times;</span>
         </button>
       </div>  
      
         <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;
     font-size: 17px;
     margin-top: 30px;">Are you sure you want to submit these details & push this stock vehicle to Auctions ?</h5>
        
       
       <div class="modal-body p-3 text-center">
         <button type="button" v-show="auc_conf_btn==true" class="btn btn-primary btn-sm w-25" v-on:click="save_auction_data">YES</button>
         <button  v-show="auc_conf_btn==false" class="btn btn-primary btn-sm" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...</button>
         <button type="button" class="btn btn-secondary btn-sm w-25" data-dismiss="modal">NO</button>
       </div>
     </div>
   </div>
 </div>
 <!--Auctions modal Ends-->
 
 <!--show leads popup start-->
 
 <div class="modal fade" id="viewleads_modal" tabindex="-1" aria-labelledby="adminuser_label" aria-hidden="true">
 <div class="modal-dialog modal-xl">
    <div class="modal-content">
       <div class="modal-header bg-dark p-2">
          <h5 class="modal-title text-white" id="adminuser_label">Cars Shortlisted</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" class="text-white">&times;</span>
          </button>
       </div>
       <div class="modal-body">
          <div class="mt-2">
             <table class="table table-bordered table-sm">
                <thead style="background-color:#181818;color:white">
                   <tr style="text-align: center;">
                      <th scope="col">Sr.No</th>
                      <th scope="col">Lead ID</th>
                      <th scope="col">Lead Submitted Date</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Mobile No</th>
                      <th scope="col">Lead Status</th>
                      <th scope="col">Quoted Selling Price<br>(if Any)</th>
                      <th scope="col">View in Buy Leads</th>
                   </tr>
                </thead>
                <tbody style="text-align: center;">
                   <tr v-for="val,i in leads_by">
                      <td>{{i+1}}</td>
                      <td>{{val['buylead_code']}}</td>
                      <td>{{val['date']}}</td>
                      <td>{{val['name']}}</td>
                      <td>{{val['mobile']}}</td>
                      <td>{{buylead_status_list[val['status']]}}</td>
                      <td >{{val['quoted_sp']!='NA'?"&#x20B9;"+val['quoted_sp']:val['quoted_sp']}}</td>
                      <td><button class="btn btn-red btn-sm m-1" v-on:click="redirect_sales_module(val['enc_id'])">VIEW</button></td>
                   </tr>
                   <tr v-if="leads_by==0">
                      <td colspan="8">No Records !!</td>
                   </tr>
                </tbody>
             </table>
          </div>
       </div>
    </div>
 </div>
 </div>
 <!--show leads popup end-->
 <!--show images slide popup strat-->
 <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header bg-dark p-2">
          <h6 class="modal-title text-white" id="exampleModalLabel">Car images</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="text-white">&times;</span></button>
       </div>
       <div class="modal-body">
          <div class="card border-0">
             <div class="card-content">
                <div class="card-carousel">
                   <div class="card-img">
                      <img :src="currentImage" style="width:600px;height:400px;"  alt="">
                      <div class="actions">
                         <span @click="prevImage" class="prev">
                            <span class=""><img src="/images/left-arrow.png" alt="" width="20" height="" style="margin: auto;margin-top: 4px;"  ></span>
                         </span>
                         <span @click="nextImage" class="next">
                            <span class=""><img src="/images/right-arrow.png" alt="" width="20" height="" style="margin: auto;margin-top: 4px;"  ></span>
                         </span>
                      </div>
                   </div>
                   <div class="thumbnails">
                      <div
                         v-for="(image, index) in  slider_images"
                         :key="image.id"
                         :class="['thumbnail-image', (activeImage == index) ? 'active' : '']"
                         @click="activateImage(index)"
                         >
                         
                         <img :src="image.thumb">
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </div>
 </div>
 <!--show images slide popup end-->
 <!-- Assign lead popup start-->
 <div class="modal fade" id="assign_lead_modal" tabindex="-1" aria-labelledby="adminuser_label" aria-hidden="true" v-if="role_id==1">
 <div class="modal-dialog modal-md">
    <div class="modal-content">
       <div class="modal-header bg-dark p-2">
          <h5 class="modal-title text-white" id="adminuser_label">Assign Lead to</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="clear_valid()">
          <span aria-hidden="true" class="text-white">&times;</span>
          </button>
       </div>
       <div class="modal-body">
          <div class="ml-3 mr-3">
             <input type="hidden" class="form-control form-control-sm" v-model="assign_lead['buylead_assign_lead_id']">
             <input type="hidden" class="form-control form-control-sm" v-model="assign_lead['enc_dealer_id']">
             <input type="hidden" class="form-control form-control-sm" v-model="assign_lead['enc_executive_id']">
             <div class="mb-2 form-row" v-if="role_id==1" >
                <div class="col-sm-12" v-bind:class="[('enc_dealer_id' in validation_errors) ? 'verror' : '']">
                   <select class="form-control form-control-sm" v-model="assign_lead['enc_dealer_id']" v-on:change="get_dealers_executives(2)">
                      <option value="" >Select Dealer Branch</option>
                      <option v-for="dealerval,index in dealers" v-bind:value="dealerval.enc_branch_id" v-bind:selected="dealerval.enc_branch_id== assign_lead['enc_dealer_id']">{{dealerval.brn_name}}</option>
                   </select>
                   <span class="text-danger" v-if="validation_errors.enc_dealer_id" v-text="validation_errors.enc_dealer_id"></span>
                </div>
             </div>
             <div class="mb-2 form-row" v-else-if="role_id!=1 && dealers.length>1">
                <div class="col-sm-12" v-bind:class="[('enc_dealer_id' in validation_errors) ? 'verror' : '']">
                   <select class="form-control form-control-sm" v-model="assign_lead['enc_dealer_id']" v-on:change="get_dealers_executives(2)">
                      <option value="" >Select Dealer Branch</option>
                      <option v-for="dealerval,index in dealers" v-bind:value="dealerval.enc_branch_id" v-bind:selected="dealerval.enc_branch_id== assign_lead['enc_dealer_id']">{{dealerval.brn_name}}</option>
                   </select>
                   <span class="text-danger" v-if="validation_errors.enc_dealer_id" v-text="validation_errors.enc_dealer_id"></span>
                </div>
             </div>
             <div class="mb-2 form-row" v-else>
                <div class="col-sm-12" v-bind:class="[('enc_dealer_id' in validation_errors) ? 'verror' : '']">
                   <input type="text"   v-bind:value="brn_name"  class="form-control form-control-sm" readonly>
                   
                </div>
             </div>
             <div class="mb-2 form-row" v-if="role_id==1">
                <div class="col-sm-12" v-bind:class="[('enc_executive_id' in validation_errors) ? 'verror' : '']">
                   <select class="form-control form-control-sm" v-model="assign_lead['enc_executive_id']">
                      <option value="" disabled>Select Executive</option>
                      <option v-for="executivesval,index in executives_lead" v-bind:value="executivesval.enc_executive_id" v-bind:selected="executivesval.enc_executive_id== assign_lead['enc_executive_id']">{{executivesval.emp_name}}</option>
                   </select>
                   <span class="text-danger" v-if="validation_errors.enc_executive_id" v-text="validation_errors.enc_executive_id"></span>
                </div>
             </div>
             <div class="mb-2 form-row" v-else >
                <div class="col-sm-12" v-bind:class="[('enc_executive_id' in validation_errors) ? 'verror' : '']">
                   <input type="text"   v-bind:value="exe_name" class="form-control form-control-sm" readonly>
                </div>
             </div>
             
          </div>
          <div class="mb-2 text-center">
             <button type="button" class="btn btn-red btn-md"  v-on:click="save_assign_lead()" >Save</button>
          </div>
          <div class="row mt-3">
             <div class="col-12">
                <div v-if="form_status" class="alert alert-success alert-sm" >{{ form_status }}</div>
             </div>
          </div>
       </div>
    </div>
 </div>
 </div>
 <!--ADD NEW LEAD MODAL START-->
 <div class="modal fade" id="add_new_lead_modal" style="overflow: auto;" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="addstock" aria-hidden="true">
 <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header bg-dark p-2">
          <h5 class="modal-title text-white" id="addstock">ADD STOCK</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" class="text-white">&times;</span>
          </button>
       </div>
       <div class="modal-body">
          <div class="ml-1 mr-1">
             <div class="row mt-3">
                <div class="col-12">
                   <div v-if="form_error" class="alert alert-danger alert-sm" >{{ form_error }}  </div>
                   <div v-if="form_status" class="alert alert-success alert-sm" >{{ form_status }}</div>
                </div>
             </div>
             <div class="row mt-1 ml-1">
                <h6>Car Basic Details</h6>
             </div>
             
             <div class="row mt-2">
                <div class="col-sm-6 form-row">
                   <label for="name" class="col-sm-4 col-form-label">Mfg Year<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('manufac_year' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['manufac_year']" v-on:change="get_makes_by_year">
                         <option value="" disabled>Select Year</option>
                         <option v-for="year in years" v-bind:value="year">{{year}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.manufac_year" v-text="validation_errors.manufac_year"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row">
                   <label for="mobile" class="col-sm-4 col-form-label">Color<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_color_id' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['enc_color_id']">
                         <option value="">Select Color</option>
                         <option v-for="color in colors" v-bind:value="color.enc_exterior_color_id"  v-bind:selected="color.enc_exterior_color_id == add_new_lead['enc_color_id']">{{color.base_color}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_color_id" v-text="validation_errors.enc_color_id"></span>
                   </div>
                </div>
             </div>
             <div class="row">
                <div class="col-sm-6 form-row">
                   <label for="name" class="col-sm-4 col-form-label">Car Make<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_make_id' in validation_errors) ? 'verror' : '']">
                      <select id="makebyyear-list" class="form-control form-control-sm selectpicker" data-virtual-scroll="true" data-live-search="true" v-model="add_new_lead['enc_make_id']" v-on:change="get_models_by_make">
                         <option value="" disabled>Select Make</option>
                         <optgroup label="Popular Makes" v-if="makes_by_years.length>0">
                            <option v-for="make in makes_by_years" v-if="make.is_pop=='y'" v-bind:value="make.enc_make_id">{{make.make}}</option>
                         </optgroup>
                         <optgroup label="Other Makes" v-if="makes_by_years.length>0">
                            <option v-for="make in makes_by_years" v-if="make.is_pop=='n'" v-bind:value="make.enc_make_id">{{make.make}}</option>
                         </optgroup>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_make_id" v-text="validation_errors.enc_make_id"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row">
                   <label for="mobile" class="col-sm-4 col-form-label">Fuel Type<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('fuel_type' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['fuel_type']">
                         <option value=''>Select Fuel</option>
                         <option v-for="val, id in fuel_type_list" v-bind:value="id">{{val}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.fuel_type" v-text="validation_errors.fuel_type"></span>
                   </div>
                   
                </div>
                
                
             </div>
             <div class="row">
                <div class="col-sm-6 form-row">
                   <label for="name" class="col-sm-4 col-form-label">Car Model<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_model_id' in validation_errors) ? 'verror' : '']" >
                      
                      <select id="modelbymake-list" class="form-control form-control-sm selectpicker" data-virtual-scroll="true" data-live-search="true" v-model="add_new_lead['enc_model_id']" v-on:change="get_variants_by_model">
                         <option value="" disabled>Select Model</option>
                         <option v-for="model in models_by_makes" v-bind:value="model.enc_model_id">{{model.model}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_model_id" v-text="validation_errors.enc_model_id"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row">
                   <label for="mobile" class="col-sm-4 col-form-label">Transmission<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('transmission' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['transmission']">
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
                   <label for="name" class="col-sm-4 col-form-label">Car Variant<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_variant_id' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['enc_variant_id']">
                         <option value="">Select Variant</option>
                         <option v-for="vara in variants_by_models" v-bind:value="vara.enc_variant_id">{{vara.variant}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_variant_id" v-text="validation_errors.enc_variant_id"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row">
                   <!--eUdEZmtUV2R2NkppKzNMRXg4VEh6dz09-->
                   <label for="mobile" class="col-sm-4 col-form-label">Chassis/VIN Number<span class="star" v-if="add_new_lead['enc_make_id']==mg_org_id" >*</span></label>
                   
                   <div class="col-sm-8" v-bind:class="[('chassis_num' in validation_errors) ? 'verror' : '']">
                      <input type="text" maxlength="17" v-model="add_new_lead['chassis_num']" v-on:keypress="isLetter($event)" class="form-control form-control-sm text-uppercase" >
                      <span class="text-danger" v-if="validation_errors.chassis_num" v-text="validation_errors.chassis_num"></span>
                   </div>
                   
                </div>
             </div>
             
             
             <div class="row">
             </div>
             <div class="row">
                <div class="col-sm-6 form-row">
                   <label for="mobile" class="col-sm-4 col-form-label">No.of Owners<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('owner' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['owner']">
                         <option value=''>Select</option>
                         <option v-for="val, id in owners_list" v-bind:value="id">{{val}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.owner" v-text="validation_errors.owner"></span>
                   </div>
                   
                </div>
                <div class="col-sm-6 form-row">
                   <label for="mobile" class="col-sm-4 col-form-label">KMs Driven<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('mileage' in validation_errors) ? 'verror' : '']">
                      <input type="text" @input="formatCurrency_input('mileage')" v-model="add_new_lead['mileage']" class="form-control form-control-sm" maxlength="10">
                      <span class="text-danger" v-if="validation_errors.mileage" v-text="validation_errors.mileage"></span>
                   </div>
                </div>
                
             </div>
             <div class="row mt-3 ml-1">
                <h6>Car Registration Details</h6>
             </div>
             <div class="row mt-2" v-if="reg_type_state==false">
                <div class="col-sm-6 form-row" >
                   <label for="mobile" class="col-sm-4 col-form-label">Registration Month/Year<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('reg_date' in validation_errors) ? 'verror' : '']">
                      <!--<input id="reg_date" data-date-format="MM-yyyy" readonly="true" placeholder="01-2005"    class="datepicker form-control form-control-sm"/>-->
                      <input type="date" v-model="add_new_lead['reg_date']" class="form-control form-control-sm"   v-on:change="fitness_dt_cal"/>
                      
                      <span class="text-danger" v-if="validation_errors.reg_date" v-text="validation_errors.reg_date"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row">
                   <label for="mobile" class="col-sm-4 col-form-label">Fitness Validity<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('fitness_validate' in validation_errors) ? 'verror' : '']">
                      <input type="date" v-model="add_new_lead['fitness_validate']" class="form-control form-control-sm"/>
                      <span class="text-danger" v-if="validation_errors.fitness_validate" v-text="validation_errors.fitness_validate"></span>
                   </div>
                </div>
             </div>
             <div class="row">
                
                <div class="col-sm-6 form-row" v-if="reg_type_state==false">
                   <label for="mobile" class="col-sm-4 col-form-label">Registration Number<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('reg_num' in validation_errors) ? 'verror' : '']">
                      <input type="text" placeholder="" v-model="add_new_lead['reg_num']" class="form-control form-control-sm" @input="alphaNumeric"/>
                      <span class="text-danger" v-if="validation_errors.reg_num" v-text="validation_errors.reg_num"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row" v-else>&nbsp;</div>
                <div class="col-sm-6 form-row">
                   <label for="mobile" class="col-sm-4 col-form-label">Hypothicated<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('hypothicated' in validation_errors) ? 'verror' : '']">
                      <input type="radio" v-model="add_new_lead['hypothicated']" value="Yes" v-on:change="financier_change"> Yes &nbsp;
                      <input type="radio" v-model="add_new_lead['hypothicated']" value="No" v-on:change="financier_change"> No
                      <span class="text-danger" v-if="validation_errors.hypothicated" v-text="validation_errors.hypothicated"></span>
                   </div>
                </div>
             </div>
             <div class="row">
                
                <div class="col-sm-6 form-row">
                   <label for="mobile" class="col-sm-4 col-form-label">Registration Type<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('reg_type' in validation_errors) ? 'verror' : '']"   v-on:change="registration_type_state">
                      <select class="form-control form-control-sm" v-model="add_new_lead['reg_type']">
                         <option value=''>Select Registration Type</option>
                         <option value="Commercial">Commercial</option>
                         <option value="Corporate">Corporate</option>
                         <option value="Individual">Individual</option>
                         <option value="Unregistered">Unregistered</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.reg_type" v-text="validation_errors.reg_type"></span>
                   </div>
                </div>
                
                <div class="col-sm-6 form-row" v-if="financer_state==false">
                   <label for="mobile" class="col-sm-4 col-form-label">Financier's Name<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_bank_id' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['enc_bank_id']">
                         <option value=''>Select Insurance</option>
                         <option v-for="banks in bank_names_list" v-bind:value="banks.enc_bank_id" v-bind:selected="banks.enc_bank_id == add_new_lead['source_id']">{{banks.bank}} </option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_bank_id" v-text="validation_errors.enc_bank_id"></span>
                   </div>
                   
                </div>
                
                
                
             </div>
             <div class="row">
                <div class="col-sm-6 form-row" v-if="insurance_typ==false">
                   <label for="mobile" class="col-sm-4 col-form-label">Insurance Type<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('ins_type' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['ins_type']" v-on:change="insurance_dt_state">
                         <option value=''>Select Insurance</option>
                         <option v-for="val, id in insurance_type_list" v-bind:value="id">{{val}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.ins_type" v-text="validation_errors.ins_type"></span>
                   </div>
                   
                </div>
                <div class="col-sm-6 form-row" v-if="financer_state==false">
                   <label for="mobile" class="col-sm-4 col-form-label">Outstading Loan Amount</label>
                   <div class="col-sm-8" v-bind:class="[('outstand_amount' in validation_errors) ? 'verror' : '']">
                      <span style="position:absolute;left:-5px;top:5px;">&#x20B9;</span>
                      <input type="text" @input="formatCurrency_input('outstand_amount')" class="form-control form-control-sm" v-model="add_new_lead['outstand_amount']" maxlength="9">
                      
                      
                      <span class="text-danger" v-if="validation_errors.outstand_amount" v-text="validation_errors.outstand_amount"></span>
                   </div>
                   
                </div>
                
                
             </div>
             <div class="row">
                
                <div class="col-sm-6 form-row" v-if="insurance_dt==false  ">
                   <label for="mobile" class="col-sm-4 col-form-label">Insurance Validity<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('ins_exp_dt' in validation_errors) ? 'verror' : '']">
                      <input type="date" v-model="add_new_lead['ins_exp_dt']" class="form-control form-control-sm">
                      <span class="text-danger" v-if="validation_errors.ins_exp_dt" v-text="validation_errors.ins_exp_dt"></span>
                   </div>
                   
                </div>
             </div>
             <div class="row">
                <div class="col-sm-6 form-row" v-if="insurance_dt==false">
                   <label for="mobile" class="col-sm-4 col-form-label">Insurance IDV &nbsp;&#x20B9;</label>
                   <div class="col-sm-8" v-bind:class="[('ins_idv' in validation_errors) ? 'verror' : '']">
                      <input type="text" @input="formatCurrency_input('ins_idv')" v-model="add_new_lead['ins_idv']" class="form-control form-control-sm" maxlength="9">
                      <span class="text-danger" v-if="validation_errors.ins_idv" v-text="validation_errors.ins_idv"></span>
                   </div>
                   
                </div>
             </div>
             
             <div class="row mt-3 ml-1">
                <h6>Other Car Information</h6>
             </div>
             <div class="row mt-3 ml-1">
                <p style="margin-left: 236px;">Vechicle Location</p>
             </div>
             <div class="row">
                <div class="col-sm-6 form-row">
                   <label for="label" class="col-sm-4 col-form-label">State<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_state_id' in validation_errors) ? 'verror' : '']">
                      <select id="state-list" class="form-control form-control-sm selectpicker" data-virtual-scroll="true" data-live-search="true" v-model="add_new_lead['enc_state_id']" v-on:change="get_all_cities_bystate">
                         <option value="" disabled>Select State</option>
                         <option v-for="state in states" v-bind:value="state.enc_state_id" v-bind:selected="state.enc_state_id == add_new_lead['enc_state_id']">{{state.cw_state}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_state_id" v-text="validation_errors.enc_state_id"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row">
                   <label for="label" class="col-sm-4 col-form-label">Date of possession / purchase<span class="star" v-if="add_new_lead['liquidation_mode']=='1'">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('pocession_date' in validation_errors) ? 'verror' : '']">
                      <span style="position:absolute;left:-5px;top:5px;">&#x20B9;</span>
                      <input type="date" v-model="add_new_lead['pocession_date']" class="form-control form-control-sm" maxlength="9">
                      <span class="text-danger" v-if="validation_errors.pocession_date" v-text="validation_errors.pocession_date"></span>
                   </div>
                </div>
                
             </div>
             <div class="row">
                <div class="col-sm-6 form-row">
                   <label for="name" class="col-sm-4 col-form-label">City<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_city_id' in validation_errors) ? 'verror' : '']" >
                      
                      <select id="city-list" class="form-control form-control-sm selectpicker" data-virtual-scroll="true" data-live-search="true" v-model="add_new_lead['enc_city_id']">
                         <option value="">Select City</option>
                         <option v-for="city in cities" v-bind:value="city.enc_city_id" v-bind:selected="city.enc_city_id == add_new_lead['enc_city_id']">{{city.cw_city }}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_city_id" v-text="validation_errors.enc_city_id"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row">
                   <label for="label" class="col-sm-4 col-form-label">Actual Buying Price<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('actual_bp' in validation_errors) ? 'verror' : '']">
                      <span style="position:absolute;left:-5px;top:5px;">&#x20B9;</span>
                      <input type="text" @input="formatCurrency_input('actual_bp')" v-model="add_new_lead['actual_bp']" class="form-control form-control-sm" maxlength="9">
                      <span class="text-danger" v-if="validation_errors.actual_bp" v-text="validation_errors.actual_bp"></span>
                   </div>
                </div>
                
                
             </div>
             <div class="row">
                <div class="col-sm-6 form-row" v-if="role_id==1">
                   <label for="name" class="col-sm-4 col-form-label">Dealer Branch<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_branch_id' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['enc_branch_id']" v-on:change="get_executives_list">
                         <option value="">Select</option>
                         <option v-for="res,i in dealers" v-bind:value="res.enc_branch_id" v-bind:selected="res.enc_branch_id== add_new_lead['enc_branch_id']">{{res.brn_name}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_branch_id" v-text="validation_errors.enc_branch_id"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row" v-else-if="role_id!=1 && dealers.length>1">
                   <label for="name" class="col-sm-4 col-form-label">Dealer Branches<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_branch_id' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['enc_branch_id']" v-on:change="get_executives_list">
                         <option value="">Select</option>
                         <option v-for="res,i in dealers" v-bind:value="res.enc_branch_id" v-bind:selected="res.enc_branch_id== add_new_lead['enc_branch_id']">{{res.brn_name}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_branch_id" v-text="validation_errors.enc_branch_id"></span>
                   </div>
                </div>
                
                <div class="col-sm-6 form-row"  v-else>
                   <label for="name" class="col-sm-4 col-form-label">Dealer Branches<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_branch_id' in validation_errors) ? 'verror' : '']">
                      
                      <input type="text"  v-bind:value="brn_name"  class="form-control form-control-sm w-100" readonly>
                      
                      <span class="text-danger" v-if="validation_errors.enc_branch_id" v-text="validation_errors.enc_branch_id"></span>
                   </div>
                </div>
                
                <div class="col-sm-6 form-row">
                   <label for="label" class="col-sm-4 col-form-label">Expected Selling Price<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('exp_selling_price' in validation_errors) ? 'verror' : '']">
                      <span style="position:absolute;left:-5px;top:5px;">&#x20B9;</span>
                      <input type="text" @input="formatCurrency_input('exp_selling_price')" v-model="add_new_lead['exp_selling_price']" class="form-control form-control-sm" maxlength="9">
                      <span class="text-danger" v-if="validation_errors.exp_selling_price" v-text="validation_errors.exp_selling_price"></span>
                   </div>
                </div>
                
                
             </div>
             <div class="row">
                <div class="col-sm-6 form-row" v-if="role_id==1">
                   <label for="name" class="col-sm-4 col-form-label">Executive<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_executive_id' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['enc_executive_id']" >
                         <option value="">Select</option>
                         <option v-for="res,i in executives" v-bind:value="res.enc_executive_id" v-bind:selected="res.enc_executive_id== add_new_lead['enc_executive_id']">{{res.emp_name}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.enc_executive_id" v-text="validation_errors.enc_executive_id"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row" v-else>
                   <label for="name" class="col-sm-4 col-form-label">Executives<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('enc_executive_id' in validation_errors) ? 'verror' : '']">
                      
                      
                      <input type="text" v-model="exe_name" class="form-control form-control-sm w-100" readonly>
                      
                      <span class="text-danger" v-if="validation_errors.enc_executive_id" v-text="validation_errors.enc_executive_id"></span>
                   </div>
                </div>
                <div class="col-sm-6 form-row">
                   <label for="mobile" class="col-sm-4 col-form-label">Car Remarks</label>
                   <div class="col-sm-8" v-bind:class="[('remark' in validation_errors) ? 'verror' : '']">
                      <textarea  v-model="add_new_lead['remark']" class="form-control form-control-sm" maxlength="500"></textarea>
                      <span class="text-danger" v-if="validation_errors.remark" v-text="validation_errors.remark"></span>
                   </div>
                   
                </div>
                
                
             </div>
             <div class="row">
                <div class="col-sm-6 form-row">
                   <label for="label" class="col-sm-4 col-form-label">Mode of Sale<span class="star">*</span></label>
                   <div class="col-sm-8" v-bind:class="[('liquidation_mode' in validation_errors) ? 'verror' : '']">
                      <select class="form-control form-control-sm" v-model="add_new_lead['liquidation_mode']" >
                         <option value="">Select Mode of sale</option>
                         <option v-for="val, id in mode_of_sale_list" v-bind:value="id">{{val}}</option>
                      </select>
                      <span class="text-danger" v-if="validation_errors.liquidation_mode" v-text="validation_errors.liquidation_mode"></span>
                   </div>
                </div>
             </div>
             <div class="mb-2 mt-2 text-center">
                <!--  <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button> -->
                <button v-show="save_btn==true" type="button" class="btn btn-red btn-sm" v-on:click="save_mystock_lead" >Submit Details</button>
                <button  v-show="hide_loader==true" class="btn btn-red btn-sm" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...</button>
             </div>
             
          </div>
       </div>
    </div>
 </div>
 <!--ADD NEW LEAD MODAL END-->
 </div>
 </template>
 <script>
     import router from "../../router"    
     import axios from "axios"    
     export default {    
        name: "Mystock", 
        data(){
         return {
             mg_org_id: "",
             role_id: 1,
             brn_name: '',
             exe_name: '',
             form_error: "",
             form_errors: "",
             form_status: "",
             form_success: "",
             base_url: "",
             tab_status: 1,
             global_error: "",
             global_token: "",
             //user_rights: JSON.parse(user_rights),
             financer_state: false,
             insurance_dt: false,
             other_reason_state: false,
             insurance_typ: false,
             hide_make: false,
             hide_modal_variant: false,
             duplic_banner: false,
             images_lead_id: [],
             states: [],
             cities: [],
             areas: [],
             makes: [],
             errors: false,
             models: [],
             exmodels: [],
             variants: [],
             executives: [],
             executives_lead: [],
             search_executives: [],
             search_models: [],
             dealers: [],
             years: [],
             min_year: 2004,
             max_year: new Date().getFullYear(),
             api_calls_queue: [],
             api_call_busy: false,
             records_perpage: 10,
             totalPages: {
                 type: Number
             },
             visiblePage: 4,
             currentPage: {
                 type: Number
             },
             total_records: 0,
             //pagenation 
             from_records: 1,
             to_records: 10,
             total_records: 0,
             mystock_masterlist: [],
             mystock_count: [],
             status_list: [],
             mystock_status_list: [],
             active_element: 1,
             activeImage: 0,
             slider_images: [],
             tab_details: [],
             colors: [],
             leads_by: [],
             buylead_status_list: [],
             bank_names_list: [],
             makes_by_years: [],
             models_by_makes: [],
             variants_by_models: [],
             fuel_type_list: {},
             vechicle_condition_list: {},
             owners_list: {},
             insurance_type_list: {},
             mode_of_sale_list: {},
             hide_loader: false,
             save_btn: true,
             reg_type_state: false,
             owners_list: {},
             retail_bucket_list: {
                 "all": "1",
                 "refurb_details_pend": "200",
                 "under_certification": "300",
                 "need_certification_approval": "400",
                 "ready_for_sale": "500",
                 "car_booked": "600",
                 "pending_stockout_doc_pend": "700",
                 "pending_stockout_nodocs_pend": "800",
                 "car_delivered": "900",
                 "rc_transferred": "1000",
             },
             assign_lead: {
                 "mystock_assign_lead_id": "",
                 "enc_dealer_id": "",
                 "enc_executive_id": "",
             },
             add_new_lead: {
                 "manufac_year": "",
                 "enc_make_id": "",
                 "enc_model_id": "",
                 "enc_variant_id": "",
                 "mileage": "",
                 "owner": "",
                 "enc_color_id": "",
                 "fuel_type": "",
                 "transmission": "",
                 "pow_steering": "",
                 "shape": "",
                 "chassis_num": "",
                 "reg_date": "",
                 "reg_num": "",
                 "reg_type": "",
                 "ins_type": "",
                 "ins_exp_dt": "",
                 "ins_idv": "",
                 "fitness_validate": "",
                 "hypothicated": "",
                 "enc_bank_id": "",
                 "outstand_amount": "",
                 "enc_state_id": "",
                 "enc_city_id": "",
                 "enc_area_id": "",
                 "enc_branch_id": "",
                 "enc_executive_id": "",
                 "exp_selling_price": "",
                 "actual_bp": "",
                 "remark": "",
                 "liquidation_mode": "",
                 "pocession_date": "",
             },
             search_form: {
                 "id": null,
                 "registration_no": null,
                 "chass_no": null,
                 "enc_make_id": '',
                 "enc_model_id": '',
                 "enc_dealer_id": '',
                 "enc_executive_id": '',
                 "enc_branch_id": '',
                 "status": '',
             },
             purchase_edit_id: this.$route.params.purchase_edit_id,
             validation_errors: {},
             validation_rules: {
                 "manufac_year": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select year of manufacturing'
                 },
                 "enc_make_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select Make'
                 },
                 "enc_model_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select Model'
                 },
                 "enc_variant_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select Variant'
                 },
                 "mileage": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Enter mileage'
                 },
                 "owner": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Owner'
                 },
                 "enc_color_id": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Color'
                 },
                 "fuel_type": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Fuel Type'
                 },
                 "transmission": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Transmission'
                 },
                 "pow_steering": {
                     'm': 'false',
                     'type': 'radio',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select power steering'
                 },
                 "shape": {
                     'm': 'false',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Shape'
                 },
                 "chassis_num": {
                     'm': 'false',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Enter Chassis Number'
                 },
                 "reg_date": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Register Date'
                 },
                 "pocession_date": {
                     'm': 'false',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Posession Date'
                 },
                 "reg_num": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': /^[A-Za-z0-9]+$/,
                     'msg': 'Enter Registration Number'
                 },
                 "reg_type": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Registration Type'
                 },
                 "ins_type": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Insurance Type'
                 },
                 "ins_exp_dt": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Insurance expire date'
                 },
                 "ins_idv": {
                     'm': 'false',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Enter insurance IDV'
                 },
                 "fitness_validate": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Valid Fitness Date'
                 },
                 "hypothicated": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Hpothicated'
                 },
                 "enc_bank_id": {
                     'm': 'true',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': '',
                     'msg': 'Select Financier'
                 },
                 "outstand_amount": {
                     'm': 'false',
                     'type': 'text',
                     'v_flag': 1,
                     'regexp': /^[0-9\,]{1,15}/,
                     'msg': 'Enter valid outstanding amount'
                 },
                 "enc_state_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select State'
                 },
                 "enc_city_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select City'
                 },
                 "enc_area_id": {
                     'm': 'false',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select City'
                 },
                 "enc_branch_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select Branch'
                 },
                 "enc_executive_id": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select Executive'
                 },
                 "exp_selling_price": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Enter Excepted Selling Price'
                 },
                 "actual_bp": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Enter Actual Buying Price'
                 },
                 "remark": {
                     'm': 'false',
                     'type': 'text',
                     'v_flag': 2,
                     'regexp': /[A-Za-z0-9\-\\,.]/,
                     'msg': 'Special characters not allowed in Remarks'
                 },
                 "liquidation_mode": {
                     'm': 'true',
                     'type': 'text',
                     'flag': 1,
                     'regexp': '',
                     'msg': 'Select Mode of Sale'
                 },
             },
             auction_inv:{},
             auctiondata:{
                 'inventory_code':'',
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
             auctiondata_validations:{
                 'auction_title':'',
                 'auction_type':'',
                 'min_bid_val':'',
                 'reserve_price':'',
                 // 'min_incr_bid_val':'',
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
                 // "min_incr_bid_val": {
                 //     'm': 'true',
                 //     'type': 'text',
                 //     'flag': 1,
                 //     'regexp': '',
                 //     'msg': 'Enter Min. Incremental Bid value'
                 // },
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
             f_tab: "",
             screens_list: [],
             screens_list_mg: [],
             active_keys_list: [],
             isldrimg: false,
             auc_conf_btn:true,
             imgsrc: "/images/app_loader.gif",
             aucdate_key:0,
             cte_id:'',
         }
     },
     mounted: function() {
 
     },
     computed: {
 
     },
     async created() {
         await axios({
                  url: 'http://localhost:5000/getAllBrokerStock',
                  method: 'post',
                     params: {
                           min: 10,
                           page: 1
                     
                     }
               }).then(response => { 
                  this.mystock_masterlist = response.data.records
               })
               .catch(error => {
                  console.log(error.response)
               });
         },
     methods: {
         year_array() {
             this.years = new Array(this.max_year - this.min_year).fill(this.max_year).map((n, i) => n - i);
             this.$nextTick(function() {
                 $('#makebyyear-list').selectpicker('refresh');
             });
         },
         call_api: function(vfunction, nextfunction, pageno, argument1) {
             this.currentPage = pageno;
             this.api_calls_queue.push({
                 "function": vfunction,
                 "next": nextfunction,
                 "argument1": argument1
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
 
             if (this.api_calls_queue.length > 0) {
                 var api = this.api_calls_queue.splice(0, 1)[0];
                 try {
                     if (api['argument1'] != undefined && api['argument1'] != null) {
                         this[api['function']](api['argument1']);
 
                     } else {
                         this[api['function']]();
                     }
                     this.api_call_busy = true;
                 } catch (e) {
                     console.log("Function name not found: " + api['function']);
                 }
             }
         },
         generate_global_token: function() {
             axios.post("/api_common.php", {
                 "action": "dynamic_token_generate",
             }).then(response => {
                 this.process_api_call_queue_next();
                 if (response.status == 200) {
                     if (response.data['status'] == "success") {
                         this.global_token = response.data['token'];
                     } else if (response.data['status'] == "fail") {
 
                         if (response.data['error'] == "Session Expired") {
 
                             this.global_error = response.data['error'];
                             setTimeout(function() {
                                 document.location = "/?event=SessionExpired";
                             }, 300);
 
                         } else if (response.data['error'] == "Concurrent Login") {
 
                             this.global_error = response.data['err_msg'];
                             setTimeout(function() {
                                 document.location = '/logout/?action=Logout&pg=multi';
                             }, 300);
 
                         } else {
 
                             this.global_error = response.data['error'];
                         }
                     }
                 }
             });
          },
          add_inventory_modal: function() {
             $('#add_new_lead_modal').modal('show');
          },
          async getMystockMasters() {
                   await axios({
                      url: 'http://localhost:5000/getAllBrokerStock',
                      method: 'post',
                      data: {
                         "token": this.global_token,
                      },
                      params: {
                            min: 10,
                            page: 1,
                      }
                   }).then(response => { 
                      this.mystock_masterlist = response.data.records
                   })
                   .catch(error => {
                      console.log(error.response)
                   });
             },
     }
 
 }
 </script>