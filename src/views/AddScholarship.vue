<template>
  <div class="add-scholarship">
    <el-form :label-position="labelPosition" label-width="85px" :model="form">
      <el-form-item label="奖学金名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="form.money"></el-input>
      </el-form-item>
      <el-form-item label="总人数">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="年级分配">
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