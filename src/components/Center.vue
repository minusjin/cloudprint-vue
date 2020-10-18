<template>
  <div>

    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "Container",
  methods:{
    center(){
      if (this.$cookies.get("cookieLogin")=="true"){

      }else {
        this.$router.push("/login")
        this.$message({
          showClose: true,
          message: "无权限请先登录",
          type: 'error'
        });
      }
    }
  },
  created() {
    //初始化加载数据
    this.center();
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
