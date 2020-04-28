<template>
    <div class='my-application'>
        <div class="no-apply" v-if="false">
            <div class="notice">你当前暂无申请</div>
            <el-button type="danger">新增申请</el-button>
        </div>
        <div>
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
      </el-table-column> -->
    </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        getInfo() {
      let data = {
        studentId:this.$route.params.userId,
        sortKind: 'jiaquan',
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
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    },
    created(){
        this.getInfo()
    }
}
</script>
<style scoped>
.no-apply{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
}
.my-application{
    position: relative;
    height:100vh;
}
.notice{
    margin-bottom: 20px;
}
</style>