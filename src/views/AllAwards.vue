<template>
  <div>
   <div class="conditions">
      学号：
      <el-input v-model="studentId" placeholder="请输入内容"></el-input>
     年级：
      <el-input v-model="grade" placeholder="请输入内容"></el-input>专业：
      <el-input v-model="major" placeholder="请输入内容"></el-input>年份：
      <el-input v-model="time" placeholder="请输入内容"></el-input>奖学金类型：
      <el-input v-model="type" placeholder="请输入内容"></el-input><br>
      成绩类型：
      <el-select v-model="sortKind" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="search()">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="studentId" label="学号"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="grade" label="年级"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column prop="gradeClass" label="班级"></el-table-column>
      <el-table-column prop="type" label="奖学金类型"></el-table-column>
      <el-table-column prop="jiaQuan" label="加权"></el-table-column>
      <el-table-column prop="zongHe" label="综合"></el-table-column>
      <el-table-column prop="caoXIng" label="操行"></el-table-column>
      <!-- <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
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
      studentId: "",
      grade: "",
      major: "",
      type: "",
      time: "",
       options: [
        {
          value: "jiaquan",
          label: "加权"
        },
        {
          value: "zonghe",
          label: "综合"
        }
      ],
      sortKind:'jiaquan'
    };
  },
  methods: {
    search() {
      // let sortkind;
      // if (this.sortKind == "") {
      //   sortkind = "jiaquan";
      // } else {
      //   sortkind = this.sortKind;
      // }
      let data = {
        studentId: this.studentId,
        grade: this.grade,
        major: this.major,
        type: this.type,
        time: this.time,
        sortKind: this.sortKind,
        nowPage: this.nowPage,
        pageSize: this.pageSize
      };
      axios({
        method: "post",
        url: "/scholarshiped/getList",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data.scholarshipedVoList;
            this.total = res.data.data.pageInfo.total;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getInfo() {
      let data = {
        // year: "2019",
        sortKind: "jiaquan",
        nowPage: this.nowPage,
        pageSize: this.pageSize
      };
      axios({
        method: "post",
        url: "/scholarshiped/getList",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data.scholarshipedVoList;
            this.total = res.data.data.pageInfo.total;
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
.conditions .el-input {
  width: 200px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.conditions {
  margin-bottom: 30px;
  width: 800px;
  text-align: left;
}
.conditions .el-button {
  display: inline-block;
  margin-left: 60px;
}
.add {
  float: right;
  margin-bottom: 10px;
}
</style>