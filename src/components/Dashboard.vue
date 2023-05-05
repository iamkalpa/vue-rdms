<template>
    <div class="header1 text-white" id="appmdev">
      <div class="mobile_menu_icon" v-on:click="show_mobile_menu">
         <i class="fa fa-bars"></i>
      </div>
      <div id="mobile_menu_div" class="mobile_menu_div" style="display:none;">
         <div class="menubtn menubtnactive">Home</div>
         <div class="menubtn">Dashboard</div>
         <div class="menubtn">Exchange Module</div>
         <div class="menubtn">My Stock</div>
         <div class="menubtn">Sales Master</div>
      </div>
      <img class="logo" src="/images/mg-logo.png" width="65px">
      <img class="logo_sm" src="/images/mg75x75.png">
      <div style="margin-top:24px;">
         <button v-on:click="show_component('home')" v-bind:class="{'btn':true, 'btn-secondary':path!='', 'btn-light':path=='', 'btn-sm pt-0 pb-0':true}">Home</button>
         <button  v-bind:class="{'btn':true, 'btn-secondary':path!='dashboard_overview', 'btn-light':path=='dashboard_overview', 'btn-sm pt-0 pb-0':true}">Dashboard</button>
         <button v-on:click="show_component('exchange')" v-bind:class="{'btn':true, 'btn-secondary':path!='exchange_module', 'btn-light':path=='exchange_module', 'btn-sm pt-0 pb-0':true}">Exchange Module</button>
         <button v-on:click="show_component('mystock')" v-bind:class="{'btn':true, 'btn-secondary':path!='my_stock', 'btn-light':path=='my_stock', 'btn-sm pt-0 pb-0':true}">My Stock</button>
         <button v-bind:class="{'btn':true, 'btn-secondary':path!='sales_master', 'btn-light':path=='sales_master', 'btn-sm pt-0 pb-0':true}">Sales Leads</button>
         <button v-bind:class="{'btn':true, 'btn-secondary':path!=reports_path, 'btn-light':path==reports_path,'btn-sm pt-0 pb-0':true}">Reports</button>
          <div class="user d-flex">
            <div class="m-2" style="border-left: 2px #333 solid; padding-left: 10px; text-align: left;">
                <div class="bnametxt">

				</div>
                <div class="" style="margin-top:5px; color:#999999; font-size:11px; text-align:left;"></div>
            </div>
            <div class="m-2" style="border-left: 2px #333 solid; padding-left: 10px;">
               <div class="userbtn1 d-flex align-items-center" >
                  <div>
                  <div class="welcome">Welcome</div>
                  <div class="usertxt"></div>
                  <div class="roltxt"></div>
                  
                 
                  </div>
                  <div class="icn_bg m_prf float-right text-left"  style="margin-left:auto;">&nbsp;</div>

				</div>
                
            </div>
            <div class="btns2 m-2" style="border-left: 2px #333 solid; padding-left: 10px;">
				<div class="icn_bg lgut" v-on:click="logoutme" ><span>Logout</span></div>
            </div>
         </div>
      </div>
   </div>
   <div class="header_space">&nbsp;</div>
   <div class="mytabs2">
      <div class="mytabs">
         <div v-bind:class="{'mytab_item':true,'mytab_item_active':(active_tab==index||active_tab==''&&index=='home')}" v-for="dashboard_tab,index in dashboard_tabs" tabindex="0" v-bind:id="'tab_btn_'+index">
            <div class="one">{{dashboard_tab }} </div>
            <div v-if="index!='home'" class="two"><span>×</span></div>
         </div>
      </div>
   </div>
   <router-view />
   <div>&nbsp;&nbsp;&nbsp;</div>
   <div id="disp_footer" class="footer text-white bg-dark small p-1">
      &copy; MG 2023    
   </div>
</template>

<script type="module">
   import router from "../router"    
   import axios from "axios" 
   import '../assets/home.css'
   import '../assets/dashboard.css'
   import '../assets/my_stock.css'

   import { RouterLink, RouterView } from 'vue-router'
   export default {    
      name: "Dashboard", 
      data(){
         return {
            "role_id":"",
            selectedModules:['dashboard','exchange_module','my_stock','sales_master','reports'],
            selectedModulesCount:0,
            dashboard_tabs:[],
            global_token: "",
            global_error:"",
            reports_path:"",
         }
      },
      mounted:function(){
         this.chk_session_exists();
         //this.generate_global_token();
      },
      methods:{
         show_component:function(comp){
            router.push({ name: comp });
         },
         navigate_from_inside: function(vm){
            var v = vm.split("/");
            console.log(v);
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
         async chk_session_exists(){
            try {
               await axios({
                  url: 'http://localhost:5000/sess_exists',
                  method: 'post',
               }
               ).then(response => { 
                  //console.log(response); 
                  if(response.data['status']!='success'){
                     document.location = "/";
                  }else{  
                     this.generate_global_token();
                  }
               })
            }
            catch(error){
                  console.log(error.response)
            };
         },
         async logoutme(){
            try {
                  await axios({
                     url: 'http://localhost:5000/logout',
                     method: 'get',
                  }
                  ).then(response => { 
                     //console.log(response); 
                     document.location = "/";
                  })
               }
               catch(error){
                     console.log(error.response)
               };
         }
      }
   }
</script>