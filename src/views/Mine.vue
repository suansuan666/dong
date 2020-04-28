<template>
  <div class="mine">
    <div class="user-img">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <el-form :label-position="labelPosition" label-width="70px" :model="user">
      <el-form-item label="用户ID :">
        <el-input v-model="user.id" :disabled="isdisable"></el-input>
      </el-form-item>
      <el-form-item label="用户名 :">
        <el-input v-model="user.name" :disabled="isdisable"></el-input>
      </el-form-item>
      <el-form-item label="专业 :">
        <el-input v-model="user.major" :disabled="isdisable"></el-input>
      </el-form-item>
      <el-form-item label="密码 :">
        <el-input  v-model="user.password" show-password :disabled="isdisable"></el-input>
      </el-form-item>
      <el-form-item label="密保 :">
        <el-input v-model="user.answer" class="answer" :disabled="isdisable"></el-input>
      </el-form-item>
    </el-form>
        <el-button type="primary"  @click="change()">修改</el-button>
  </div>
</template>
<script>
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
      isdisable:true,
    };
  },
  methods:{
    change(){
      this.isdisable=!this.isdisable
    }
  }
};
</script>
<style scoped>
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
}
.mine .el-form{
    width:200px;
    margin:0 auto;
    margin-top:60px;
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
