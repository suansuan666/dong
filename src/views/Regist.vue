<template>
  <div class="regist">
    <el-form :label-position="labelPosition" label-width="80px" :model="user">
      <el-form-item label="学号">
        <el-input v-model="user.studentId"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="user.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="user.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份" prop="role">
        <el-radio-group v-model="user.role">
          <!-- <el-radio label="管理员"></el-radio> -->
          <el-radio label="学生"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="user.grade"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="user.major"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="user.gradeClass"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="密保问题">
        <el-input v-model="user.question" placeholder='请输入问题'></el-input>
        <el-input v-model="user.answer" placeholder= '请输入答案'></el-input>
      </el-form-item>
    </el-form>
    <el-button type="danger" @click="submit()">提交</el-button>
  </div>
</template>
<script>
import axios from "axios";
import Qs from 'qs'
export default {
  data() {
    return {
      labelPosition: "right",
      user: {
        studentId: "",
        userName: "",
        sex: "",
        role: "",
        mobile: "",
        grade: "",
        major: "",
        password: "",
        question: "",
        answer: ""
      }
    };
  },
  methods: {
    submit() { 
        if(this.user.sex == '男'){
            this.user.sex =1
        }
        if(this.user.sex == '女'){
            this.user.sex = 2
        }
        if(this.user.role =='管理员'){
            this.user.role = 1
        }
        if(this.user.role == '学生'){
            this.user.role = 2
        }
        let data={
            studentId: this.user.studentId,
          userName: this.user.userName,
          sex:this.user.sex,
          role:this.user.role,
          mobile:this.user.mobile,
          grade:this.user.grade,
          major:this.user.major,
          gradeClass:this.user.gradeClass,
          password:this.user.password,
          question:this.user.question,
          answer:this.user.answer
        }
        axios({
            method:'post',
            url:'/user/addUser',
            data:Qs.stringify(data)
        }).then(res =>{
            console.log(res)
        }).catch(res =>{
            console.log(res)
        })
    
    }
  }
};
</script>
<style scoped>
</style>
<style>
.regist .el-form-item {
  width: 400px;
}
.regist .el-form {
  width: 500px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>