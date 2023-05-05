<template>
    <div class="dashboard_body">
		<div class="lft_bl1">
			<div style="padding:20px;">
				<ul class="first_row" style="">
					<li class="icon_bg" v-on:click="show_component('mystock_retail')">
							<img src="/images/retail-icon.png" alt="" title="" width="56" >
						<div class="div_txt1" > Retail Stock </div>
						<a href="javascript:void('0');" title="Purchase Master"> </a>
					</li>
					<li class="icon_bg" v-on:click="show_component('mystock_b2b')">  
						<img src="/images/b2bl-icon.png" alt="" title="" height="50" > 
						<div class="div_txt1"> Sale to Broker <br> (B2B- Offline) </div>   
						<a href="javascript:void('0');" title="My Stock"> </a> 
					</li>
					<li class="icon_bg"> 
						<img src="/images/auction-icon-68x68.png" alt="" title="" width="60"> 
						<div class="div_txt1" style="margin-top: 20px;">Auctions </div>   
						<a href="javascript:void('0');" title="Auctions"> </a>
					</li>
					<li class="icon_bg">
						<img src="/images/new-stock-icon.png" alt="" title="" height="54">  
						<div class="div_txt1">  Add New Stock </div>
						<a href="javascript:void('0');" title="My Stock" v-on:click="add_inventory_modal"> </a> 
					</li>
					<li class="icon_bg">
						<img src="/images/manage-icon.png" alt="" title="" width="60"> 
						<div class="div_txt1" style="margin-top: 20px;">Manage Brokers </div>   
						<a href="javascript:void('0');" title="Manage Brokers"> </a>
					</li>
				</ul>
			</div>
		</div>
    </div>
</template>
<script>
    import router from "../../router"    
    import axios from "axios"    
    export default {    
        name: "Mystock", 
        data(){
            return {
                "role_id":"",
                global_error:"",
            }
        },
		methods:{
			show_component:function(comp){
				router.push({ name: comp });
			},
		}
    }
</script>