<template>
  <div class="notice-detail">
    <el-input type="textarea" :disabled="isdisable"  v-model="content" :rows="10"></el-input>
    <el-button type="primary" @click="edit()" v-if="isShow">编辑</el-button>
    <el-button type="primary" @click="save()" v-if="isHide">保存</el-button>
    <el-button type="danger" @click="del()">删除</el-button>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      content: "",
      isdisable: true,
      isShow: true,
      isHide: false
    };
  },

  methods: {
    getInfo() {
      let data = {
        id: this.$route.params.id
      };
      axios({
        method: "post",
        url: "/notice/getNoticeById",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.content = res.data.data.content;
          }
          if(res.data.code ==305){
            this.content=""
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    edit() {
      this.isdisable = !this.isdisable;
      this.isShow = false;
      this.isHide = true;
    },
    save() {
      this.isdisable = !this.isdisable;
      let data = {
        id: this.$route.params.id,
        createUserId: this.$route.params.userId,
        content: this.content
      };
      axios({
        method: "post",
        url: "/notice/updateNoticeById",
        data: Qs.stringify(data)
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getInfo();
            this.isShow = true;
            this.isHide = false;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    del() {
      let data = {
        id: this.$route.params.id
      };
      axios({
        method: "post",
        url: "/notice/deleteNoticeById",
        data: Qs.stringify(data)
      })
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getInfo();
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  created() {
   this.getInfo();
  }
};
</script>
<style scoped>
</style>
<style>
.notice-detail .el-textarea.is-disabled .el-textarea__inner {
  background: none ;
  color: black ;
  border:none;
}
.notice-detail .el-button {
  margin-top: 50px;
}
</style>