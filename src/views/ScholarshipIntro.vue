<template>
  <div class="scholarship-intro" >
     <el-button type="primary" plain class="add" @click="add()">新增奖学金</el-button>
    <el-table :data="tableData" style="width: 100%" border :row-class-name="tableRowClassName">
      <el-table-column prop="name" label="奖学金名称">
        <template slot-scope="scope">
          <el-input
          v-model="scope.row.name"
          v-if="edit && scope.row.index == num"
          ></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="金额">
         <template slot-scope="scope">
          <el-input
          v-model="scope.row.money"
          v-if="edit && scope.row.index == num"
          ></el-input>
          <span v-else>{{scope.row.money}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="总人数">
         <template slot-scope="scope">
          <el-input
          v-model="scope.row.count"
          v-if="edit && scope.row.index == num"
          ></el-input>
          <span v-else>{{scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="classCount" label="年级分配">
         <template slot-scope="scope">
          <el-input
          v-model="scope.row.classCount"
          v-if="edit && scope.row.index == num"
          ></el-input>
          <span v-else>{{scope.row.classCount}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="具体要求">
        <template slot-scope="scope">
          <router-link
            :to="{name: 'scholar-detail',params: { id: scope.row.id}}"
          >详情</router-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
           <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-if="edit && scope.row.index == num">保存</el-button>
          <el-button size="mini" @click="Edit(scope.$index, scope.row)" v-else>修改</el-button>
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
      edit:false
    };
  },
  methods: {
    Edit(index){
      this.edit =!this.edit;
      this.num =index;
    },
    handleEdit(index){
      this.edit=!this.edit;
      this.num=index;
       let data = {
        id: this.tableData[index].id,
        name: this.tableData[index].name,
        money:this.tableData[index].money,
        count:this.tableData[index].count,
        classCount:this.tableData[index].classCount,
        description:this.tableData[index].description
      };
      axios({
        method: "post",
        url: "/scholarship/updateScholarshipById",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
             this.$message({
              message: "修改成功",
              type: "success"
            });
          }
         this.getInfo();
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleDelete(index){
       let data = {
        id: this.tableData[index].id,
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
          }
         this.getInfo();
        })
        .catch(res => {
          console.log(res);
        });
    },
    tableRowClassName({row,rowIndex}){
      row.index=rowIndex;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getInfo() {
      let data = {
        nowPage: this.nowPage,
        pageSize: this.pageSize
      };
      axios({
        method: "post",
        url: "/scholarship/getAllScholarship",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data.scholarshipVoList;
            this.total = this.tableData.length;
          }
          console.log(this.tableData);
        })
        .catch(res => {
          console.log(res);
        });
    },
    add(){
      this.$router.push({ name: "add-scholarship",params: {userId: this.$route.params.userId} });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>
<style scoped>
.add{
  float: right;
  margin: 30px 0;
}
.scholarship-intro a{
  color:#409EFF;
}
</style>