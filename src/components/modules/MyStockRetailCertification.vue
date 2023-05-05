<template>

</template>
<script>
    import router from "../../router"    
    import axios from "axios" 
    import { RouterLink, RouterView } from 'vue-router'
    export default {    
        name: "inventory", 
        data: function () {
            return {

            }
        },
        mounted:function(){
            //console.log(this.my_stock_edit_id);
            this.generate_global_token();
        },
        methods:{
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
        }
    }
</script>