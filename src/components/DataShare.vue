<template>
  <div >
    <el-container>
      <el-main>
        <div class="box">
          <div class="banner1">
            <div class="box-card">
              <h4>资料库由个人用户上传、是可共享的、统一管理的大量存储文件的仓库。学生党所需学习，考试，考研资料这里全都有。</h4>
            </div>
            <router-link to="/dataShare/fileShow">
              <el-button type="primary" style="margin-top: 2px" round>资料库</el-button>
            </router-link>
          </div>
          <div class="banner2">
            <div class="box-card">
              <h4 style="text-align: center">分享你的资料</h4>
            </div>
            <router-link to="/dataShare/uploadFiles">
              <el-button type="primary" style="margin-left: 200px" round >分享文件</el-button>
            </router-link>
        </div>


        </div>

      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "DataShare"
}
</script>

<style scoped>
.el-main {
  height: 700px;
  background-image: url("/static/images/back.png");
}
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  height: 65px;
}
.box{
  padding-left: 30%;
  padding-top: 50px;
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
