<template>
  <div class="addNotice">
    <!-- <el-input
  type="textarea"
  :rows="1"
  placeholder="请输入标题"
  v-model="title"
  class="title">
    </el-input>-->
    <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="content"></el-input>
    <el-button type="danger" @click="submit()">提交申请</el-button>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      // title:'',
      content: ""
    };
  },
  methods: {
    submit() {
      let data = {
        createUserId: this.$route.params.userId,
        content: this.content
      };
      axios({
        method: "post",
        url: "/notice/addNotice",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "发布成功",
              type: "success"
            });
             this.$router.push({name:'notice',params: {userId: this.$route.params.userId}})
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
.title {
  margin-top: 50px;
  margin-bottom: 10px;
}
.submit {
  margin-top: 40px;
}
</style>
<style>
.addNotice .el-textarea{
  margin:50px 0;
}
</style>