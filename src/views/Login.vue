<template>
  <div class="login">
    <div class="login-window" >
      <span class="title">欢迎登录</span>
      <el-input prefix-icon="el-icon-user" v-model="id" placeholder="学号"  ></el-input>
      <el-input prefix-icon="el-icon-lock" v-model="password" placeholder="密码" show-password></el-input>
      <router-link to="/find-password" class="forget">忘记密码？</router-link>
      <el-button type="primary" plain @click="login()">登录</el-button>
      <router-link to="/regist"><el-button plain >注册</el-button></router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Qs from 'qs'
export default {
  data(){
    return{
     id:'',
     password:''
    }
  },
  methods:{
   login(){
     let data={
       studentIdOrMobile:this.id,
       password:this.password
     }
     axios({
            method:'post',
            url:'/user/login',
            data:Qs.stringify(data)
        }).then(res =>{
            if(res.data.code == 0){
               this.$router.push({name:'home',params: {userId: this.id}})
            }
        }).catch(res =>{
            console.log(res)
        })
   }
  }
};
</script>
<style scoped>
.login{
  height:100vh;
  width: 100%;
  background: url('../assets/back.jpg');
 
  background-size: cover;
}
.login-window {
  width: 300px;
  height: 230px;
  position: absolute;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
  border: 1px solid #778899;
  padding: 10px;
  padding-bottom: 20px;
  background:rgba(255 ,255 ,240,0.2);
  
  border-radius: 10px;
 
}
.title{
  color: white;
  margin-bottom: 20px;
  display: block;
}
</style>
<style>
.login .el-input{
    width:250px;
    margin-bottom: 10px;
}
.login .el-button{
  margin-top:20px;
  margin-right:30px;
  margin-left:20px;
}
*{
  margin:0 ;
  padding:0;

}
.forget{
  display: block;
  color: #409EFF;
}
</style>