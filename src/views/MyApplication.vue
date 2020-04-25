<template>
    <div class='my-application'>
        <div class="no-apply">
            <div class="notice">你当前暂无申请</div>
            <el-button type="danger">新增申请</el-button>
        </div>
        <div></div>
    </div>
</template>
<script>
export default {
    
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