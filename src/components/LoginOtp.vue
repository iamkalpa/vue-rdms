<template>
    <div class="login-bg">
        <div id="login_app">
            <!--main block start-->
            <div class="row">
                <div class="container">
                    <div class="loginbg">
                        <div class="login-title">
                            <h1>Login OTP</h1>
                        </div>
                        <div class="login-panel" >
                            <div class="login_frm">
                                <div v-if="err" v-bind:class="[(err) ? 'alert alert-danger alert-sm form-group inpt' : 'alert alert-sm']" v-html="err"></div>
                                <div class="form-group inpt">
                                    <input type="text" placeholder="OTP" v-model="user_login['otp']" maxlength="10" class="form-control mt-2" autocomplete="off">
                                </div>
                                
                                <div>
                                    <input type="button" id="submit_btn" v-on:click="validate_otp"  value="LOGIN"  class="lgn_btn btn mt-3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="module">
    import router from "../router"    
    import axios from "axios"   
    export default {    
        name: "LoginOTP", 
        data(){
            return {
                user_login:{
                    mobile_number: "",
                    captcha: "",
                    otp:"",
                    err: "",
                },
                err:"",
                key : CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef"),
		        iv :  CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210"),
            }
        },
        methods: {    
            async generate_otp() {
                this.user_login['captcha']=this.inputValue;
                let mobile_exp=/^[6-9]\d{9}$/;
                if(mobile_exp.test(this.user_login['mobile_number']) == false){
                    this.err = 'Enter valid mobile number';
                    //setTimeout(function(v){v.err = '';},2000,this);
                    return false;
                }
                else if(this.user_login['captcha']==''){
                    this.err = 'Enter captcha';
                    return false;
                }
                else{
                    if(!document.getElementById("submit_btn").disabled){
                        let enc_mobile=this.clean_before_submit(this.user_login.mobile_number);
                        var usr_login={
                            "mobile_number":enc_mobile,
                            "captcha":this.user_login.captcha
                        };
                        console.log(usr_login);
                        //return false;
                        try {
                            const response = await axios.post(
                            `http://localhost:5173/login/`+enc_mobile
                            );
                            console.log(response);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            }
            
        }    
    }
</script>