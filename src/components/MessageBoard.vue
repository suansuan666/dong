<template>
  <div class="message-board">
    <div class="wrapper">
      <div class="field">
        <el-input v-model="comment" placeholder="留下你的评论吧" class="field-comment"></el-input>
        <el-button type="danger" @click="submit()">发表</el-button>
      </div>
      <ul v-for="(item,index) in items" :key="index" class="board">
        <li>
          <div class="leave-comment">
            <div class="left">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="right" @click="open">
              <span class="username">{{item.userName}}</span>
              <p class="comment">{{item.comment}}</p>
            </div>
            <el-button type="danger" @click="delComment(item.id)" class="del" size="small">删除</el-button>
          </div>
          <div class="reply-box">
            <span class="reply-label">回复</span>
            <p class="comment">{{reply}}</p>
             <el-button type="danger" @click="delReply(item.id)" class="del" size="small">删除</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      items: [
        { 
          id:'1',
          commentUserId:'1',
          userName: "不吃萝卜的兔子",
          comment: "我也好想申请奖学金啊 哈哈哈哈"
        },
        {
          id:'2',
          commentUserId:'2',
          userName: "不吃萝卜的兔子",
          comment: "我也好想申请奖学金啊 哈哈哈哈"
        }
      ],
      comment: "",
      reply: "心动不如行动，快快来申请啊"
    };
  },
  methods: {
    open() {
      this.$prompt("请输入评论", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "回复成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    getComments() {
      let data = {
        nowPage: 1,
        pageSize: 15
      };
      axios({
        method: "post",
        url: "/comment/getAllComment",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.items = rea.data.data.commentVoList;
          }
          console.log(this.tableData);
        })
        .catch(res => {
          console.log(res);
        });
    },
    submit(){
      let data = {
        userName: 1,
        comment: this.comment,
        commentUserId:this.$route.params.userId
      };
      axios({
        method: "post",
        url: "/comment/getAllComment",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
             this.$message({
              message: "评论成功",
              type: "success"
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    delComment(index){
       let data = {
        id: index,
        role: this.role,
        userId:this.$route.params.userId
      };
      axios({
        method: "post",
        url: "/comment/deleteComment",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
             this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    delReply(index){
       let data = {
        id: index,
        role: this.role,
        userId:this.$route.params.userId
      };
      axios({
        method: "post",
        url: "/reply/deleteReplyById",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
             this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
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
  },
  created(){
    this.getComments();
    console.log('hahha',document.cookie);
  }
};
</script>
<style scoped>
.message-board {
  background: rgb(84, 92, 100);
}
.message-board .field-comment {
  width: 430px;
}

.wrapper {
  /* background: #cfcfcf; */
  width: 500px;
  margin: 0 auto;
  padding: 5px;
  color: white
}
li {
  list-style: none;
  margin-left: 5px;
  position: relative;
}
.left {
  float: left;
}
.right {
  float: left;
  margin-left: 8px;
  cursor: pointer;
}
.board li {
  overflow: hidden;
  margin-top: 20px;
}
.username {
  display: block;
  text-align: left;
  font-size: 13px;
}
.comment {
  font-size: 15px;
  /* display: inline-block; */
}
.del {
  float: right;
  /* margin:0 5px; */
}
.reply-box {
  text-align: left;
  margin-left: 50px;
}
.reply-label {
  color: rgb(255, 208, 75);
  font-size: 13px;
}
.leave-comment {
  overflow: hidden;
}
</style>