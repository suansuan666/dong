<template>
  <div class="mine">
    <div class="user-img">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <el-form :label-position="labelPosition" label-width="80px" :model="user">
      <el-form-item label="用户名 :">
        <el-input v-model="user.userName" :disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="电话号码:">
        <el-input v-model="user.mobile" :disabled="mb"></el-input>
        <span class="change" v-if="mb" @click="Mb">修改</span>
        <span @click="changeMobile" class="change" v-if="isMb">保存</span>
      </el-form-item>
      <el-form-item label="专业 :">
        <el-input v-model="user.major" :disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="年级 :">
        <el-input v-model="user.grade" :disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="班级 :">
        <el-input v-model="user.gradeClass" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码 :">
        <el-input  v-model="user.password" show-password :disabled="pw"></el-input>
        <span  class="change" v-if="pw" @click="Pw">修改</span>
         <span @click="changePassword()" class="change" v-if="isPw">保存</span>
      </el-form-item>
      <el-form-item label="密保 :">
        <el-input v-model="user.question" class="answer" :disabled="disable"></el-input>
        <el-input v-model="user.answer" class="answer" :disabled="disable"></el-input>      
      </el-form-item>
      <span class="change" v-if="disable" @click="Question">修改</span>
      <span @click="changeQuestion" class="change" v-if="isDisable">保存</span>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      labelPosition: "right",
      user: {
        password: "www",
        question: "aaa",
        answer: "xccc",
        id: 1111,
        username: "2016224512",
        grade:'2016'
      },
      isDisable:false,
      disable:true,
      mb:true,
      isMb:false,
      pw:true,
      isPw:false,
    };
  },
  methods:{
    Pw(){
      this.pw=false;
      this.isPw=true;
    },
    Mb(){
      this.mb=false;
      this.isMb=true;
    },
    Question(){
      this.disable=false;
      this.isDisable=true;
    },
    changeQuestion(){
     let data={
       studentId:this.$route.params.userId,
       question:this.user.password,
       answer:this.user.answer,
     };
      axios({
        method: "post",
        url: "/user/updateQuestionByStudentId",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
           this.$message({
              message: "修改成功",
              type: "success"
            });
            this.isDisable=false;
            this.disable=true;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    changeMobile(){
      let data={
       studentId:this.$route.params.userId,
       mobile:this.user.mobile
     };
      axios({
        method: "post",
        url: "/user/updateMobileByStudentId",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
           this.$message({
              message: "修改成功",
              type: "success"
            });
             this.isMb=false;
             this.mb=true;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    changePassword(){
       let data={
       studentId:this.$route.params.userId,
       password:this.user.password,
     };
      axios({
        method: "post",
        url: "/user/updatePassword",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
           this.$message({
              message: "修改成功",
              type: "success"
            });
            this.isPw=false;
            this.password=true;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    getInfo() {
      let data = {
        studentIdOrMobile:  this.$route.params.userId 
      };
      axios({
        method: "post",
        url: "/user/getUserByStudentIdOrMobile",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
           this.user=res.data.data
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
  },
  created(){
    this.getInfo();
  }
};
</script>
<style scoped>
.change{
  color: #409EFF;
  cursor: pointer;
  margin-left:20px;
}
</style>
<style>
.mine .el-input{
  width:200px;
}
.mine .el-button{
  margin-top:40px;
  margin-left:30px;
}
.mine .el-avatar{
  width:80px;
  height:80px;
}
.mine .el-form-item{
    width:400px;
    margin-bottom: 5px;
}
.mine .el-form{
    width:200px;
    margin:0 auto;
    margin-top:30px;
}
.mine .el-input.is-disabled .el-input__inner {
  background: none;
  color: black;
  border: none;
}
.mine .el-form-item__content{
  text-align: left;
}
</style>
