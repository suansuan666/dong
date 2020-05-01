<template>
  <div class="application-summary">
    <div class="conditions">
      学号：
      <el-input v-model="studentId" placeholder="请输入内容"></el-input>姓名：
      <el-input v-model="userName" placeholder="请输入内容"></el-input>年级：
      <el-input v-model="grade" placeholder="请输入内容"></el-input>专业：
      <el-input v-model="major" placeholder="请输入内容"></el-input>班级：
      <el-input v-model="gradeClass" placeholder="请输入内容"></el-input>年份：
      <el-input v-model="time" placeholder="请输入内容"></el-input>奖学金类型：
      <el-input v-model="type" placeholder="请输入内容"></el-input>成绩类型：
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
    <el-button type="danger" @click="add()" class="add" v-if="show ==2">新增</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" v-if="show ==2"></el-table-column>
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
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20,30 ]"
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
      sortKind: "",
      total: 0,
      pageSize: 15,
      nowPage: 1,
      currentPage: 1,
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
      studentId: "",
      userName: "",
      grade: "",
      major: "",
      gradeClass: "",
      type: "",
      time: "",
      multipleSelection: "",
      show: 0
    };
  },
  methods: {
    search() {
      let sortkind;
      if (this.sortKind == "") {
        sortkind = "jiaquan";
      } else {
        sortkind = this.sortKind;
      }
      let data = {
        studentId: this.studentId,
        userName: this.userName,
        grade: this.grade,
        major: this.major,
        gradeClass: this.gradeClass,
        type: this.type,
        time: this.time,
        sortKind: sortkind,
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
            this.show++;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      let checkArr = this.multipleSelection; // multipleSelection存储了勾选到的数据
      let params = [];
      checkArr.forEach(function(item) {
        params.push(item.id);
      });
      console.log("liu", params);
      let data = {
        ids: params
      };
      axios({
        method: "post",
        url: "/scholarshiped/addList",
        data: Qs.stringify(data, { indices: false })
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
          }
          if (res.data.code == 602) {
            this.$message.error("你已重复添加");
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleCurrentChange(val) {
      this.nowPage = val;
      console.log(`当前页: ${val}`);
    },
    getInfo() {
      let data = {
        time: "2019",
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
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleDelete(index, row) {
      let data = {
        id: row.id
      };
      axios({
        method: "post",
        url: "/scholarship/deleteScholarship",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.tableData.splice(index, 1);
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
    check(){    
      var user=this.getCookie("role");
      if(user == 1){
        this.show++;
      }
    }
  },
  created() {
    this.getInfo();
    this.check();
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
<style>
</style>