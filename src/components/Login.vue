<template>
    <div class="login-bg">
        <div id="login_app">
            <!--main block start-->
            <div class="row">
                <div class="container">
                    <div class="loginbg">
                        <div class="login-title">
                            <h1>Login</h1>
                        </div>
                        <div class="login-panel" >
                            <div v-bind:class="[(second_step==true)? 'login_frm_step2' : 'login_frm']" v-if="show_login">
                                <div v-if="err" v-bind:class="[(err) ? 'alert alert-danger alert-sm form-group inpt' : 'alert alert-sm']" v-html="err"></div>
                                <div class="form-group inpt" v-if="first_step==true">
                                    <input type="text" placeholder="Mobilenumber" v-model="user_login['mobile_number']" maxlength="10" class="form-control mt-2" autocomplete="off">
                                </div>
                                <div class="sample-captcha" v-if="first_step==true">
                                    <div class="form-group inpt">
                                        <input class="form-control mt-2" v-model="inputValue" placeholder="Captcha" type="text">
                                        <span class="highlight"></span>
                                    </div>
                                    <VueClientRecaptcha
                                    :value="inputValue"
                                    @getCode="getCaptchaCode"
                                    @isValid="checkValidCaptcha"
                                    />
                                    
                                </div>
                                <div class="form-group inpt" v-if="second_step==true">
										<input class="form-control" type="text" @keyup.enter="login" placeholder="Enter OTP" v-model="user_login['otp']" maxlength="6" v-on:keypress="isNumber" autocomplete="off">
										<span v-if="resend_cnt<2">
											<span style="float:right;font-size:12px" v-if="show_timer">{{timer_msg}}</span>
											<span style="float:right" v-else><a href="javascript:void(0)"  v-on:click="resend_otp" id="submit_btn3" style="font-size:13px; color:#cf2230; padding-top:5px;">Resend OTP</a></span>
										</span>
										<span v-else>
											<span style="float:right;font-size:12px"> OTP sent to Mobile </span>
										</span>
										<!--	<input type="submit"  style="float: right;" class="btn lgn_btn btn-sm w-9 mt-1"   value="Resend OTP" >-->
										<span class="error" style="display: none;">Please provide valid OTP</span>
									</div>
									<div class="alert alert-danger" v-if="show_loading">There was an error. Please try again</div>
									<div class="loginbtn" v-if="show_login_btn">
										<input type="button" id="submit_btn"  value="LOGIN" v-on:click="generate_otp" class="lgn_btn btn mt-2" v-if="first_step==true">
										<input type="button" v-on:click="backfun" class="btn lgn_btn btn-sm float-left mt-4 mx-2" value="BACK" v-if="second_step==true">
										<input type="submit" v-on:click="login" class="btn lgn_btn btn-sm float-right mt-4 mx-2" id="submit_btn2"  value="Submit" v-if="second_step==true">
									</div>
                                <!--
                                <div>
                                    <input type="button" id="submit_btn" v-on:click="generate_otp"  value="LOGIN"  class="lgn_btn btn mt-3">
                                </div> -->
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
    import CryptoJS from 'crypto-js';  
    import { ref } from "vue";
    import '../assets/login.css'
    import VueClientRecaptcha from 'vue-client-recaptcha';
    export default {    
        name: "Login", 
        components: { VueClientRecaptcha },
        setup() {
            /* pass value to captcha  */
            const inputValue = ref(null);
            const getCaptchaCode = (value) => {
                /* you can access captcha code */
                console.log(value);
            };
            const checkValidCaptcha = (value) => {
            /* expected return boolean if your value and captcha code are same return True otherwise return False */
            };
            return {
                inputValue,
                getCaptchaCode,
                checkValidCaptcha,
            };
        },
        data(){
            return {
                first_step:true,
                second_step:false,
                show_login_btn: true,
                global_token: "",
                user_login:{
                    mobile_number: "",
                    captcha: "",
                    otp:"",
                    err: "",
                },
                captcha_value:"",
                show_login_btn: true,
                show_login: true,
		        show_loading: false,
                time_wait:0,
                timerId:"",
                show_timer:false,
                timer_msg:"",
                resend_cnt:0,
                err:"",
                key : CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef"),
		        iv :  CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210"),
            }
        },
        mounted:function(){
            this.generate_global_token();
        },
        methods: {  
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
            async generate_otp() {
                this.captcha_value = document.getElementById("captcha_canvas").textContent;
                if(this.global_token==''){
                    this.generate_global_token();
                }
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
                else if(this.user_login['captcha']!=this.captcha_value){
                    this.err = 'Enter valid captcha';
                    return false;
                }
                else{
                    if(!document.getElementById("submit_btn").disabled){
                        let enc_mobile=this.clean_before_submit(this.user_login.mobile_number);
                        var usr_login={
                            "mobile_number":enc_mobile,
                            "captcha":this.user_login.captcha
                        };
                        try {
                            await axios({
                                url: 'http://localhost:5000/generate_otp',
                                method: 'post',
                                params: {
                                    mobile: usr_login['mobile_number'],
                                    token: this.global_token
                                }
                            }
                            ).then(response => { 
                                //alert('success');
                                console.log(response);
                                if (response.data['status'] == "success") {
                                    this.show_timer = true;
                                    this.time_wait = 30;
                                    this.global_token= response.data['token'];
                                    this.show_countdown_timer();
                                    this.first_step = false;
									this.second_step = true;
									this.timerId = setInterval(this.show_countdown_timer, 1000);
                                }/*else if(response.data['error']=='Token Error'){
                                    this.global_token= response.data['token'];
                                    this.generate_otp();
                                }else{
                                    this.err = response.data['error'];
                                    this.global_token= response.data['token'];
                                }*/
                            })
                        }
                        catch(error){
                                console.log(error.response)
                        };
                    }
                }
            },
            resend_otp:function(){
                let mobile_exp=/^[6-9]\d{9}$/;
                    if(mobile_exp.test(this.user_login['mobile_number']) == false){
                    this.err = 'Enter valid mobile number';
                    setTimeout(function(v){v.err = '';},2000,this);
                    return false;
                }
                else{
                    let enc_mobile=this.clean_before_submit(this.user_login['mobile_number']);
                    axios.post("http://localhost:5000/resend_otp", {
                        "mobilenumber": enc_mobile,
                        "token": this.global_token
                    }).then(response => {
                        if (response.status == 200) {
                            if (typeof (response.data) == "object") {
                                if (response.data['status'] == "success") {
                                    this.global_token = response.data['token']
                                    this.time_wait = 30;
                                    this.show_countdown_timer();

                                    this.err = 'OTP sent to your number';
                                    //	alert(response.data['ttl']);
                                    this.global_token = response.data['token'];
                                    this.first_step = false;
                                    this.second_step = true;
                                    this.resend_cnt = this.resend_cnt + 1;
                                    this.timerId = setInterval(this.show_countdown_timer, 1000);
                                } else if (response.data['error'] == "token_expired") {
                                    this.err = response.data['error'];
                                    this.global_token = response.data['token'];
                                    this.err = "Token Expired. Please try again!";
                                    this.resend_otp();
                                    //this.show_login_btn = false;
                                    //setTimeout(function(v){v.show_login_btn=true;},5000,this);
                                } else {
                                    this.global_token = response.data['token'];
                                    this.err = response.data['error'];
                                }
                            } else {
                                this.err = "Incorrect response recieved from server";
                            }
                        } else {
                            this.err = "Server Error\n" + response.status;
                        }
                    });
                }
            },
            async login(){
                if(this.user_login['otp']==''){
                    this.err = 'Please enter OTP';
                    return false;
                }
                else if(this.user_login['mobile_number']!='' && this.user_login['otp']!='')
                {
                    if(!document.getElementById("submit_btn2").disabled){
                        let enc_mobile=this.clean_before_submit(this.user_login.mobile_number);
                        var ur_lg_data={
                            "mobile":enc_mobile,
                            "otp":this.user_login.otp
                        };
                        await axios.post("http://localhost:5000/validate_otp", {
                            "user_login": ur_lg_data,
                            "token": this.global_token,
                        }).then(response => {
                            if (response.status == 200) {
                                if (typeof (response.data) == "object") {
                                    if (response.data['status'] == "success") {
                                        this.user_login = {
                                        mobile_number: "",
                                        captcha: "",
                                        otp: "",
                                        err: ""
                                        },
                                        this.err = '';
                                        document.location = "/dashboard";
                                    } else if (response.data['error'] == "token_expired") {
                                        this.err = response.data['error'];
                                        this.global_token = response.data['token'];
                                        this.err = "Token Expired. Please try again!";
                                        this.show_login_btn = false;
                                        setTimeout(function (v) { v.show_login_btn = true; }, 5000, this);
                                    } else {
                                        this.global_token = response.data['token'];
                                        this.err = response.data['error'];
                                        setTimeout(function (v) { v.err = ''; }, 3000, this);
                                        if(response.data['details'] && response.data['details']['ttl']){
                                            count_secs(response.data['details']['ttl']);

                                        }
                                    }
                                } else {
                                    this.err = "Incorrect response recieved from server";
                                }
                            } else {
                                this.err = "Server Error\n" + response.status;
                            }
                        });
                    }
                }
                else{
                    this.err = "Mobilenumber / OTP wrong!"
                }
            },
            show_countdown_timer:function() {
                if (this.time_wait == -1) {
                    clearTimeout(this.timerId);
                    this.show_timer=false;
                } else {
                    this.show_timer = true;
                    this.timer_msg = 'Resend OTP in ' + this.time_wait + ' sec';
                    this.time_wait--;
                }
            },
            backfun:function(){
				//this.mobilenumber="";
                this.user_login['captcha'] = '';
                this.inputValue='';
                this.user_login['otp']='';
                this.user_login['err']='';
                this.err='';
                this.first_step=true;
                this.second_step=false;
            },
            clean_before_submit:function(vno){
                var vp = vno;
                var key = this.key;
                var iv=this.iv;
                if( vp != ""){
                        var encrypted = CryptoJS.AES.encrypt(vp, key, {iv:iv});
                        encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                }
                return encrypted;  
        	}
            
        }    
    }
</script>