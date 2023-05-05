<template>
    <div class="dashboard_body">
		<div class="row">
			<div v-bind:class="{'alert alert-danger alert-sm m-2 w-100':(global_error)}" v-if="global_error">
			{{global_error}}
			</div>
		</div>
		<div class="lft_bl1">
			<div style="padding:20px;">
				<ul class="first_row" style=""> 
					<div v-for="module,index in selectedModules">
						<li class="icon_bg" v-if="module=='dashboard'"> 
							<img src="/images/dashboard-68x68.png" alt="" title="" > 
							<div class="div_txt1" > Dashboard </div>   
							<a href="javascript:void('0');" title="Dashboard" > </a> 
						</li>
						<li class="icon_bg" v-if="module=='exchange_module'" v-on:click="show_component('exchange')"> 
							<img src="/images/exchange-68x68.png" alt="" title="" height=""> 
							<div class="div_txt1"> Exchange Module </div>   
							<a href="javascript:void('0');" title="Exchange"> </a> 
						</li>
						<li class="icon_bg" v-if="module=='my_stock'" v-on:click="show_component('mystock')"> 
							<img src="/images/stock-68x68.png" alt="" title="" height="">  
							<div class="div_txt1"> My Stock </div>   
							<a href="javascript:void('0');" title="My Stock"> </a> 
						</li>
                        <li class="icon_bg" v-if="module=='sales_master'"> 
                            <img src="/images/sales-lead-68x68.png" alt="" title="" width=""> 
                            <div class="div_txt1" > Sales Leads </div>   
                            <a href="javascript:void('0');" title="Sales Master"> </a> 
                        </li>
                                <li class="icon_bg" v-if="module=='reports'">  
                            <img src="/images/reports-68x68.png" alt="" title="" width=""> 
                            <div class="div_txt1" > Reports </div>   
                            <a  href="javascript:void('0');" title="Reports"> </a>
                        </li>	
					</div>
				</ul>	
			</div>
		</div>		
	</div>
</template>

<script>
    import router from "../../router"    
    import axios from "axios"    
    export default {    
        name: "Dashboard", 
        data(){
            return {
                "role_id":"",
                selectedModules:['dashboard','exchange_module','my_stock','sales_master','reports'],
			    selectedModulesCount:0,
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