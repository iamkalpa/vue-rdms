<template>
<div class="row" style="height: calc(100vh - 161px);min-height: 87vh;">
    <div class="col-sm-2   nav flex-column nav-pills">
        <div style="margin-top:26px;">&nbsp;</div>
        <a v-bind:class="[(vtab=='stock_status') ? 'nav-link ml-2 active' : 'nav-link ml-2']" v-on:click="" style="cursor:pointer"> Stock Status</a>
        <a v-bind:class="[(vtab=='car_details') ? 'nav-link ml-2 active' : 'nav-link ml-2']" v-on:click="" style="cursor:pointer"> Car Details</a>
        <a v-bind:class="[(vtab=='refurb_approval') ? 'nav-link ml-2 active' : 'nav-link ml-2']"  v-on:click="" style="cursor:pointer"> Refurbishment Details</a>
        <a v-bind:class="[(vtab=='certification') ? 'nav-link ml-2 active' : 'nav-link ml-2']"   v-on:click="" style="cursor:pointer"> Certification</a>
        <a v-if="mystock_details_val['make']!='MG'&& mystock_details_val['selllead_id']>0" v-bind:class="[(vtab=='evaluation') ? 'nav-link ml-2 active' : 'nav-link ml-2']"   v-on:click="" style="cursor:pointer"> Evaluation</a>
        <a v-if="mystock_details_val['make']=='MG'" v-bind:class="[(vtab=='accessories') ? 'nav-link ml-2 active' : 'nav-link ml-2']" v-on:click="" style="cursor:pointer"> Accessories</a>
        <a v-bind:class="[(vtab=='car_images') ? 'nav-link ml-2 active' : 'nav-link ml-2']"  v-on:click="" style="cursor:pointer"> Car Images</a>
        <a v-bind:class="[(vtab=='car_pricing') ? 'nav-link ml-2 active' : 'nav-link ml-2']"  v-on:click="" style="cursor:pointer"> Car Pricing</a>
        <a  v-if="mystock_details_val['status']>=600 && mystock_details_val['status']!=1111 && mystock_details_val['status']!=7777"  v-bind:class="[(vtab=='leads') ? 'nav-link ml-2 active' : 'nav-link ml-2']" v-on:click="" style="cursor:pointer"> Leads</a>
        <a v-if="mystock_details_val['status']>=700 && mystock_details_val['status']!=1111 && mystock_details_val['status']!=7777" v-bind:class="[(vtab=='booking_status') ? 'nav-link ml-2 active' : 'nav-link ml-2']" v-on:click="" style="cursor:pointer"> Booking Status</a>
    </div>
    <div class="col-sm-10 mb-5">
        <div style="position:sticky; top:0px; background-color:white;z-index:501;">
            <div class="row p-2" style="background-color:#cf2230; color:#ffffff; margin-left: -15px;margin-right: -15px; align-items: center;">
                <div class="col-2">
                    <b>ID : {{mystock_details_val['inventory_code']}}</b>
                </div>
                <div class="col-3">
                    <b>{{mystock_details_val['manuf_year']+"  "+mystock_details_val['make']+"  "+mystock_details_val['model']}}</b>
                </div>
                <div class="col-4">
                    <b>Status:{{status_list[mystock_details_val['status']]}}</b>
                </div>
                <div class="col-3 text-right" style="cursor:pointer; font-size:21px;"><span class="display-6 float-right" v-on:click="redirect_me">×</span></div>
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
                my_stock_edit_id: this.$route.params.id,
                vtab: this.$route.params.vtab,
                lead_code: "",
                mystock_details_val: {},
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
                global_token:"",
                api_calls_queue: [],
                api_call_busy: false,
            };
        },
        mounted:function(){
            console.log(this.my_stock_edit_id);
            this.generate_global_token();
        },
        methods:{
            show_component:function(comp){
                router.push({ name: comp });
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
                                    this.mystock_details_val = response.data['record'][0];
                                    //console.log(response.data['record'][0]);
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
        }
    }
}

</script>