<template>
  <div>
     <el-table :data="tableData" style="width: 100%" border >
      <el-table-column prop="studentId" label="学号"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="grade" label="年级"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column prop="gradeClass" label="班级"></el-table-column>
      <el-table-column prop="type" label="奖学金类型"></el-table-column>
      <el-table-column prop="jiaQuan" label="加权"></el-table-column>
      <el-table-column prop="zongHe" label="综合"></el-table-column>
      <el-table-column prop="caoXIng" label="操行"></el-table-column>
       <el-table-column label="操作" fixed="right" v-if="show" >
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      show:false
    };
  },
  methods: {
     handleDelete(index, row) {
      let data = {
        ids: row.id
      };
      axios({
        method: "post",
        url: "/scholarshiped/deleteList",
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getInfo() {
      let data = {
        year: '2019',
        sortKind: 'jiaquan',
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
          
             this.total=res.data.data.pageInfo.total;
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
        this.show=true;
      }
    }
  },
  created(){
    this.getInfo();
    this.check();
  }
};
</script>
<style scoped>
.add {
  float: right;
  margin-bottom: 30px;
}
</style>