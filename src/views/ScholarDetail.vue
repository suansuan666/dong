<template>
  <div class="scholar-detail">
    <el-form :label-position="labelPosition" label-width="85px" :model="form">
      <el-form-item label="奖学金名称">
        <el-input v-model="form.name" :disabled="isdisable"></el-input>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="form.money" :disabled="isdisable"></el-input>
      </el-form-item>
      <el-form-item label="总人数">
        <el-input v-model="form.count" :disabled="isdisable"></el-input>
      </el-form-item>
      <el-form-item label="年级分配">
        <el-input v-model="form.classCount" :disabled="isdisable"></el-input>
      </el-form-item>
      <el-form-item label="具体要求">
        <el-input v-model="form.description" type="textarea" :rows="5" :disabled="isdisable"></el-input>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      isdisable: true,
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
    getInfo() {
      let data = {
       id:this.$route.params.id
      };
      axios({
        method: "post",
        url: "/scholarship/getScholarshipbyId",
        data: Qs.stringify(data)
      })
        .then(res => {
          if (res.data.code == 0) {
           this.form=res.data.data
          }
         
        })
        .catch(res => {
          console.log(res);
        });
    },
  },
  created(){
    this.getInfo();
  }
  
};
</script>
<style >
.scholar-detail .el-form-item {
  width: 400px;
}
.scholar-detail .el-form {
  width: 500px;
  margin: 0 auto;
  margin-top: 60px;
}
.scholar-detail .el-input.is-disabled .el-input__inner ,.scholar-detail .el-textarea.is-disabled .el-textarea__inner{
  background: none;
  color: black;
  border: none;
}
</style>