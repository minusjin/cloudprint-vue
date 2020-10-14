<template>
  <div class="main-box">
    <el-container>
      <el-main>
        <div class="box">
          <div class="banner1">
            <div class="box-card">
              <h4>资料库由个人用户上传、是可共享的、统一管理的大量存储文件的仓库。学生党所需学习，考试，考研资料这里全都有。</h4>
            </div>
            <router-link to="/dataShare/fileShow">
              <el-button type="primary" style="margin-top: 2px" round >资料库</el-button>
            </router-link>
          </div>
          <div class="banner2">
            <div class="box-card">
              <h4 style="text-align: center">分享你的资料</h4>
            </div>
              <el-button type="primary" style="margin-left: 42%" round @click="file">分享文件</el-button>
        </div>
          <div class="banner2">
            <div class="box-card">
              <h4 style="text-align: center">分享你的资料</h4>
            </div>
            <el-button type="primary" style="margin-left: 42%" round @click="file">分享文件</el-button>
          </div>

        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "DataShare",
  methods:{
    file(){
      if (this.$cookies.get("cookieLogin")=="true"){
        this.$router.push("/dataShare/uploadFiles")
      }else {
        this.$router.push("/login")
        this.$message({
          showClose: true,
          message: "无权限请先登录",
          type: 'error'
        });
      }
    }
  }
}

</script>

<style scoped>
.main-box{
  height: 100%;
  background-image: url("/static/images/back.png");

}
.box{
  padding: 30px 0 30px 30%;
}
.banner1{
  width: 50%;
  height: 200px;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.banner2{
  margin-top: 20px;
  width: 50%;
  height: 200px;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.box-card{
margin: 20px 20px 0 20px;
  padding: 20px;
}
</style>
