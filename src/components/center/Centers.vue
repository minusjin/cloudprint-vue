<!--个人中心配置-->
<template>
  <div>
    <div class="nav"></div>
    <template>
      <el-tabs :tab-position="tabPosition" class="tabs-centers" >
        <el-tab-pane label="基本信息"><BasicInfo></BasicInfo></el-tab-pane>
        <el-tab-pane label="我的文件"><MyFile></MyFile></el-tab-pane>
        <el-tab-pane label="我的打印">角色管理</el-tab-pane>
        <el-tab-pane label="我的共享">
          <el-tabs :tab-position="tab" style="height: 600px;">
            <el-tab-pane label="我的图书"><MyBook></MyBook></el-tab-pane>
            <el-tab-pane label="我的借阅"><MyBorrow></MyBorrow></el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import BasicInfo from "./BasicInfo";
import MyFile from "./MyFile";
import MyBook from "./share/MyBook";
import MyBorrow from "./share/MyBorrow";
export default {
  name: "Centers",
  components: {MyBorrow, MyBook, MyFile, BasicInfo},
  data() {
    return {
      tabPosition: 'left',
      tab:'top'
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
  height: 700px;
  padding: 1% 10% 0 10%;
}


</style>
