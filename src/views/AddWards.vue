<template>
  <div class="add-wards">
    <el-form :label-position="labelPosition" label-width="85px" :model="form">
      <el-form-item label="学号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.money"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.classCount"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.classCount"></el-input>
      </el-form-item>
      <el-form-item label="奖学金类型">
        <el-input v-model="form.classCount"></el-input>
      </el-form-item>
      <el-form-item label="加权">
        <el-input v-model="form.classCount"></el-input>
      </el-form-item>
      <el-form-item label="具体要求">
        <el-input v-model="form.description" type="textarea" :rows="5"></el-input>
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
        name: "",
        money: "",
        count: "",
        classCount: "",
        description: ""
      }
    };
  },
  methods:{
   submit() {
      let data = {
        name: this.form.name,
        money: this.form.money,
        count:this.form.count,
        classCount:this.form.classCount,
        description:this.form.description
      };
      axios({
        method: "post",
        url: "/scholarship/addScholarship",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
             this.$router.push({name:'scholarship-intro'})
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
<style>
.add-scholarship .el-form-item{
    width:400px;
}
.add-scholarship .el-form{
    width:500px;
    margin:0 auto;
    margin-top:60px;
}
</style>