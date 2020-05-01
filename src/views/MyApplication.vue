<template>
  <div class="my-application">
    <div class="no-apply" v-if="isShow">
      <div class="notice">你当前暂无申请</div>
      <el-button type="danger" @click="apply">新增申请</el-button>
    </div>
    <div v-if="show">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="studentId" label="学号"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="gradeClass" label="班级"></el-table-column>
        <el-table-column prop="type" label="奖学金类型"></el-table-column>
        <el-table-column prop="jiaQuan" label="加权"></el-table-column>
        <el-table-column prop="zongHe" label="综合"></el-table-column>
        <el-table-column prop="caoXing" label="操行"></el-table-column>
        <el-table-column prop="jiaQuanClassRank" label="加权班级排名"></el-table-column>
        <el-table-column prop="jiaquanMajorRank" label="加权专业排名"></el-table-column>
        <el-table-column prop="zongHeClassRank" label="综合班级排名"></el-table-column>
        <!-- <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>-->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      nowPage: 1,
      pageSize: 15,
      total: 0,
      currentPage: 1,
      isShow: false,
      show: false
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getInfo() {
      let data = {
        studentId: this.$route.params.userId,
        sortKind: "jiaquan",
        nowPage: this.nowPage,
        pageSize: this.pageSize
      };
      axios({
        method: "post",
        url: "/apply/getApplyList",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data.scholarshipApplyVoList;
            this.total = res.data.data.pageInfo.total;
          }
          console.log(this.tableData);
          if (this.tableData.length == 0) {
            this.isShow = true;
          } else {
            this.show = true;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    apply(){
      this.$router.push({ name: "apply"});
    }
  },
  created() {
    this.getInfo();
  }
};
</script>
<style scoped>
.no-apply {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.my-application {
  position: relative;
  height: 100vh;
}
.notice {
  margin-bottom: 20px;
}
</style>