<template>
  <div class="mine">
    <div class="user-img">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <ul>
      <li>
        <label>用户id: </label>
        <span>{{user.id}}</span>
      </li>
      <li>
        <label>用户名: </label>
        <span>{{user.username}}</span>
      </li>
      <li>
        <label>专业: </label>
        <span>{{user.grade}}</span>
      </li>
      <li>
        <label>密码：</label>
        <el-input  v-model="user.password" show-password :disabled="isdisable"></el-input>
      </li>
      <li>
        <label>密保：</label>
        <el-input  v-model="user.question" :disabled="isdisable"></el-input>
        <el-input v-model="user.answer" class="answer" :disabled="isdisable"></el-input>
          <el-button type="primary"  @click="change()">修改</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
ul{
  width:300px;
  text-align: left;
  margin:0 auto;
}
li {
  list-style: none;
  margin-top:20px;

}
.mine .answer{
  margin-top:20px;
  margin-left:48px;
}
.change{
  margin-left:10px;
  color:#409EFF;
  cursor: pointer;
}
span{
  color:#778899;
}
.user-img{
  width:200px;
  text-align: left;
  margin:0 auto;
  
  
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
</style>
