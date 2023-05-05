<template>
    <div class="row" style="height: calc(100vh - 161px);min-height: 87vh;">
        <div class="col-sm-2   nav flex-column nav-pills">
            <div style="margin-top:26px;">&nbsp;</div>
            <a :key="vtab" v-bind:class="[(vtab=='status_updates') ? 'nav-link ml-2 active' : 'nav-link ml-2']" v-on:click="" style="cursor:pointer"> Status Updates</a>
                <a :key="vtab" v-bind:class="[(vtab=='lead_details') ? 'nav-link ml-2 active' : 'nav-link ml-2']"  v-on:click="" style="cursor:pointer"> Lead Details</a>
                <a :key="vtab" v-bind:class="[(vtab=='car_details') ? 'nav-link ml-2 active' : 'nav-link ml-2']" v-on:click="" style="cursor:pointer"> Car Details</a>
                <a :key="vtab" v-bind:class="[(vtab=='evaluation') ? 'nav-link ml-2 active' : 'nav-link ml-2']"  v-on:click="" style="cursor:pointer" >Evaluation</a>
                <a :key="vtab" v-bind:class="[(vtab=='accessories') ? 'nav-link ml-2 active' : 'nav-link ml-2']" v-on:click="" style="cursor:pointer" >Accessories</a>
                <a :key="vtab" v-bind:class="[(vtab=='car_images') ? 'nav-link ml-2 active' : 'nav-link ml-2']"  v-on:click="" style="cursor:pointer"> Car Images</a>
                <a :key="vtab" v-bind:class="[(vtab=='car_pricing') ? 'nav-link ml-2 active' : 'nav-link ml-2']"   v-on:click="" style="cursor:pointer">Car Pricing</a>
                
                <a :key="vtab" v-if="user_rights['exchange_module']['documents']>=1"  v-bind:class="[(vtab=='document') ? 'nav-link ml-2 active' : 'nav-link ml-2']"   v-on:click="" style="cursor:pointer">Documents</a>
                <a :key="vtab" v-if="lead_details_val['make']=='MG' && user_rights['exchange_module']['service_history']>=1"  v-bind:class="[(vtab=='service_history') ? 'nav-link ml-2 active' : 'nav-link ml-2']"  v-on:click="" style="cursor:pointer"> Service History</a>
                <a :key="vtab" v-if="user_rights['exchange_module']['vahan_details']>=1" v-bind:class="[(vtab=='vahan_details') ? 'nav-link ml-2 active' : 'nav-link ml-2']" v-on:click="" style="cursor:pointer">Vahan Details</a>
        </div>
        <div class="col-sm-10 mb-5">
            <div style="position:sticky; top:0px; background-color:white;z-index:501;">
                <div class="row p-2" style="background-color:#cf2230; color:#ffffff; margin-left: -15px;margin-right: -15px; align-items: center;">
                        <div class="col-1">
                                {{ lead_details_val['exchange_code']!=''?lead_details_val['exchange_code']:'' }}
                        </div>
                        <div class="col-3">
                                {{ lead_details_val['name']!=''?lead_details_val['name']:'' }} ({{ lead_details_val['mobile']!=''?lead_details_val['mobile']:''}})
                        </div>
                        <div class="col-4">
                                Current Status: {{status_list[lead_details_val['status']]}}
                        </div>
                        
                        <div class="col-3  d-flex">
                                <button  type="button" class="btn btn-dark btn-sm mr-2"  v-if="vtab!='status_updates'" v-on:click="" style="cursor:pointer">Update Status</button>
                                <button  type="button" class="btn btn-dark btn-sm mr-2" v-if="role_id==1 && ((lead_details_val['status']>=30&&lead_details_val['status']<70)|| (lead_details_val['evaluation_done']==1 && lead_details_val['accessories_d']!='' && lead_details_val['carimg_count']>=10 && lead_details_val['status']==10 && lead_details_val['auc_led_flg']=='' && lead_details_val['auc_car_flg']==''))&&cte_id!=''"  v-on:click="show_auctions_modal(lead_details_val)" style="cursor:pointer">Push for Auctions</button>
                        </div>
                        
                        <div class="col-1 text-right" style="cursor:pointer; font-size:21px;">
                                <span class="display-6 float-right" v-on:click="redirect_me">×</span>
                        </div>
                </div>
            </div>
            <div class=" tab-content" id="v-mg-tabContent">
                <div>
                    <router-view />
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
            name: "Dashboard", 
            data: function () {
                return {
                    props: {},
                    exchange_edit_id: this.$route.params.exchange_edit_id,
                    vtab: this.$route.params.vtab,
                    vtab:'',
                    lead_code: "",
                    lead_details_val: {},
                    status_list: [],
                    global_token:"",
                    api_calls_queue: [],
                    api_call_busy: false,
                    cte_id:'',
                    role_id:'',
                    form_error:"",
                    form_status:"",
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
                    }
                };
            },
            mounted:function(){
                console.log(RouterView);
            },
            methods:{
                show_component:function(comp){
                    router.push({ name: comp });
                },
            }
        }
    
    </script>