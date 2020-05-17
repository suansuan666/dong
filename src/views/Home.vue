<template>
  <div class="home">
    <el-container>
        <el-header>
          <h2>信 息 学 院 奖 学 金 管 理 系 统</h2>
          <div class="header-nav">
            <span class="username">{{userName}}</span>
            <router-link to="/" class="login-out">退出</router-link>
          </div>
        </el-header>
      <el-container>
        <el-aside width="300px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <router-link :to="{name:'notice',params: {userId: this.userId}}">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">公告</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name:'scholarship-intro',params: {userId: this.userId}}">
              <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">奖学金介绍</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name:'application-summary',params: {userId: this.userId}}" v-if="manager">
              <el-menu-item index="3">
                <i class="el-icon-postcard"></i>
                <span slot="title">当年申请汇总</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name:'awards',params: {userId: this.userId}}">
              <el-menu-item index="4">
                <i class="el-icon-bank-card"></i>
                <span slot="title">当年获奖公布</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name:'all-awards',params: {userId: this.userId}}" v-if="manager">
              <el-menu-item index="5">
                <i class="el-icon-trophy"></i>
                <span slot="title">历年获奖情况</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name:'my-awards',params: {userId: this.userId}}" v-if="student">
              <el-menu-item index="6">
                <i class="el-icon-trophy-1"></i>
                <span slot="title">我的获奖情况</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name:'my-application',params: {userId: this.userId}}" v-if="student">
              <el-menu-item index="7">
                <i class="el-icon-tickets"></i>
                <span slot="title">我的申请</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name:'mine',params: {userId: this.userId}}">
              <el-menu-item index="8">
                <i class="el-icon-s-home"></i>
                <span slot="title">个人中心</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data(){
    return{
      userId:'',
      manager:false,
      student:false,
      userName:''
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
     getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
     check(){    
      var user=this.getCookie("role");
      this.userName=this.getCookie('userName');
      if(user == 1){   
        this.manager=true;
      }
      if(user == 2){
        this.student=true;
      }
    
  }},
  created(){
    this.userId=this.$route.params.userId;
    this.$router.push({name:'notice'})
    console.log("----",this.$route.params.userId);
    this.check()
  },
  
  }
</script>
<style scoped>
.home .el-menu {
  height: 100%;
  /* padding-top: 50px; */
}
.home .el-header{
  background-color: rgb(84, 92, 100);
  color: white;
  line-height: 60px;
}
.header-nav{
  float: right;
}
.username{
  margin-right:10px;
}
.login-out{
  color: rgb(255, 208, 75);
}
.home h2{
  /* display: inline-block;
  margin:0 auto */
  float: left;
}
</style>