<template>
  <div>

    <div class="nav"></div>

    <template>


      <el-tabs :tab-position="tabPosition" class="tabs-centers" >
        <el-tab-pane label="基本信息"><BasicInfo></BasicInfo></el-tab-pane>
        <el-tab-pane label="我的文件">配置管理</el-tab-pane>
        <el-tab-pane label="我的打印">角色管理</el-tab-pane>
        <el-tab-pane label="我的共享">通天塔高</el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import BasicInfo from "./BasicInfo";
export default {
  name: "Centers",
  components: {BasicInfo},
  data() {
    return {
      tabPosition: 'left'
    };
  },
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
.nav{
  height: 80px;
  padding-top: 20px;
  background-color: #F6F6F2;
}
.tabs-centers{
  height: 600px;
  padding: 1% 10% 0 10%;
}


</style>
