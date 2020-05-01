<template>
  <div class="find-password">
    <el-steps :active="active" finish-status="success" :space="300">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <div v-if="active == 0">
      请输入学号：<el-input v-model="studentId" class="input"></el-input>
      <el-button type="danger" @click="submit()" class="submit">提交</el-button>
    </div>
    <div class="find" v-if="active==1">  
      <el-form :label-position="labelPosition" label-width="85px" :model="form">
        <el-form-item label="学号">
          <el-input v-model="form.studentId"></el-input>
        </el-form-item>
        <el-form-item label="密保问题">
          <el-input v-model="form.question"></el-input>
        </el-form-item>
        <el-form-item label="密保答案">
          <el-input v-model="form.answer"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="danger" @click="find()">找回</el-button>
    </div>
    <div class="reset" v-if="active ==2">
      
    <el-form :model="ruleForm" status-icon  label-width="100px" class="demo-ruleForm">
   <el-form-item label="学号">
          <el-input v-model="ruleForm.studentId"></el-input>
        </el-form-item>
  <el-form-item label="新密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <!-- <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item> -->
</el-form>
      <el-button type="danger" @click="reset()">重置</el-button>
    </div>
    
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
 data() {
     
      // var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'));
      //   } else {
      //     if (this.ruleForm.checkPass !== '') {
      //       this.$refs.ruleForm.validateField('checkPass');
      //     }
      //     callback();
      //   }
      // };
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'));
      //   } else if (value !== this.ruleForm.pass) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
        ruleForm: {
          studentId:'',
          pass: '',
          checkPass: '',
         
        },
        // rules: {
        //   pass: [
        //     { validator: validatePass, trigger: 'blur' }
        //   ],
        //   checkPass: [
        //     { validator: validatePass2, trigger: 'blur' }
        //   ],
        // },
        active:0,
        labelPosition: "right",
        form:{
          question:'',
          answer:'',
        },
        studentId:'',
      };
    },
  methods: {
    submit() {
      let data = {
        studentIdOrMobile:  this.studentId
      };
      axios({
        method: "post",
        url: "/user/getUserByStudentIdOrMobile",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
           //this.user=res.data.data
           this.active++;
           this.form.question=res.data.data.question;
           this.form.studentId=res.data.data.studentId;
           this.ruleForm.studentId=res.data.data.studentId;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    find(){
       let data = {
        studentId:  this.form.studentId,
        question: this.form.question,
        answer:this.form.answer
      };
      axios({
        method: "post",
        url: "/user/updateQuestionByStudentId",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
           //this.user=res.data.data
          this.active++;
          
          }
        })
        .catch(res => {
          console.log(res);
        });
    
    },
    reset(){
      let data = {
        studentId:  this.ruleForm.studentId,
        password: this.ruleForm.pass
      };
      axios({
        method: "post",
        url: "/user/updatePassword",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
           //this.user=res.data.data
           this.$message({
              message: "重置成功",
              type: "success"
            });
             this.$router.push({path:'/'})      
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style scoped>
.info{
  margin:50px 0;
}
.find-password .input{
  width:200px;
  margin:0 auto;
  margin-top:50px;
}
.find-password .submit{
  display: block;
  margin:0 auto;
  margin-top:50px;
}
</style>
<style>
.find-password .el-form-item {
  width: 400px;
}
.find-password .el-form {
  width: 500px;
  margin: 0 auto;
  margin-top: 60px;
}
.find-password .el-steps--horizontal {
  width: 700px;
  margin: 0 auto;
  margin-top: 30px;
}
.find-password .el-step__main {
  text-align: center;
}
.find-password .el-step.is-horizontal .el-step__line {
  width: 470px;
}

</style>