<template>
  <div class="notice">
    <el-button type="primary" plain class="add" @click="addNotice()" v-if="show">添加公告</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="detail" height="100">
        <template slot-scope="scope">
          <router-link
            :to="{name: 'notice-detail',params: { id: scope.row.id}}"
          >{{scope.row.content}}</router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[15, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 15,
      nowPage: 1,
      currentPage: 1,
      show: false
    };
  },

  methods: {
    addNotice() {
      this.$router.push({
        name: "add-notice",
        params: { userId: this.$route.params.userId }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.nowPage = val;
      console.log(`当前页: ${val}`);
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
      if(user == 1){
        this.show=true;
      }
    }
  },
  created() {
    let data = {
      nowPage: this.nowPage,
      pageSize: this.pageSize
    };
    axios({
      method: "post",
      url: "/notice/getAllNotice",
      data: Qs.stringify(data)
    })
      .then(res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.noticeVoList;
          this.total = this.tableData.length;
        }
        console.log(this.tableData);
      })
      .catch(res => {
        console.log(res);
      });
    this.check();
    console.log(document.cookie);
  }
};
</script>
<style scoped>
.add {
  float: right;
}
a {
  color: #606266;
}
</style>
<style>
.notice .el-table-column {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.el-pagination {
  margin-top: 50px;
}
</style>