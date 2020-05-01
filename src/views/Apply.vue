<template>
  <div class="apply">
    <el-form :label-position="labelPosition" label-width="100px" :model="form">
      <el-form-item label="学号">
        <el-input v-model="form.studentId"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="form.grade"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.gradeClass"></el-input>
      </el-form-item>
      <el-form-item label="奖学金类型">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="加权">
        <el-input v-model="form.jiaQuan"></el-input>
      </el-form-item>
      <el-form-item label="综合">
        <el-input v-model="form.zongHe"></el-input>
      </el-form-item>
      <el-form-item label="操行">
        <el-input v-model="form.caoXing"></el-input>
      </el-form-item>
      <el-form-item label="加权班级排名">
        <el-input v-model="form.jiaQuanClassRank"></el-input>
      </el-form-item>
      <el-form-item label="加权年级排名">
        <el-input v-model="form.jiaquanMajorRank"></el-input>
      </el-form-item>
      <el-form-item label="综合班级排序">
        <el-input v-model="form.zongHeClassRank"></el-input>
      </el-form-item>
    </el-form>
     <el-button type="danger" @click="submit()">提交</el-button>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        studentId: "",
        grade: "",
        major: "",
        gradeClass: "",
        userName: "",
        type: "",
        jiaQuan: "",
        zongHe: "",
        caoXing: "",
        jiaQuanClassRank: "",
        jiaquanMajorRank: "",
        zongHeClassRank: ""
      }
    };
  },
  methods:{
       submit() {
      let data = {
        studentId:this.form.studentId,
        grade: this.form.grade,
        major: this.form.major,
        gradeClass: this.form.gradeClass,
        userName: this.form.userName,
        type: this.form.type,
        jiaQuan:this.form.jiaQuan,
        zongHe:this.form.zongHe,
        caoXing:this.form.caoXing,
        jiaQuanClassRank:this.form.jiaQuanClassRank,
        jiaquanMajorRank:this.form.jiaquanMajorRank,
        zongHeClassRank:this.form.zongHeClassRank
      };
      axios({
        method: "post",
        url: "/apply/addApply",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.$router.push({ name: "my-application" });
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
</style>
<style scoped>
.apply .el-form-item{
    width:400px;
}
.apply .el-form{
    width:500px;
    margin:0 auto;
    margin-top:20px;
}
</style>