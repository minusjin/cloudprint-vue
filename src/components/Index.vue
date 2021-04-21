<template>
<div>

  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in 2" :key="item">
    </el-carousel-item>
  </el-carousel>
<div class="announce-box">
  <div class="announce" >

    <a>平台正在测试</a>
  </div>
</div>


<div class="cloud-service">
  <div class="public-header">云共享能力</div>
  <div class="service-border"></div>
  <div class="show-box">
    <el-row :gutter="8">
      <el-col :span="6" style="margin-left: 60px">
        <el-card shadow="always" >
          <img src="/static/images/show1.jfif" style="border-radius: 4px;width: 56px;height: 56px;padding-left: 40%" >
          <p class="chosen-title">立即打印</p>
          <div class="chosen-desc">点击立即打印文件，实现快速高效打印</div>
        </el-card>
      </el-col>
      <el-col :span="6" style="margin-left: 60px">
        <el-card shadow="always" >
          <img src="/static/images/show2.jfif" style="border-radius: 4px;width: 56px;height: 56px;padding-left: 40%" >
          <p class="chosen-title">资料共享</p>
          <div class="chosen-desc">共享学习资料，让学习变的更轻松</div>

        </el-card>
      </el-col>
      <el-col :span="6" style="margin-left: 60px">
        <el-card shadow="always" >
          <img src="/static/images/show3.jfif" style="border-radius: 4px;width: 56px;height: 56px;padding-left: 40%" >
          <p class="chosen-title">图书共享</p>
          <div class="chosen-desc">参与图书共享，让读书变的更简单</div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</div>

  <div class="solution-banner">
    <img src="https://zos.alipayobjects.com/cmsmng/cms/images/j0w3hctt/9c65111f-b10a-484e-bdc4-1d7d83293e20.png"  >
  </div>

  <div class="footer">
    <div class="footer-box">
      <footer class="footer___F8l1H">Copyright © 2020 云共享资料库｜ ICP证陕B2-20201009

      </footer>
    </div>
  </div>

</div>

</template>

<script>
export default {
  name: "Index"
}
</script>

<style scoped>
.announce-box{
  padding: 10px 150px 0 50px;
}
.announce{
  margin-left: 100px;
  padding: 10px 25px 10px 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 30px
}
.footer{
  background-color: #383735;
  margin-top: 10px;
}
.footer___F8l1H {
  font-size: 12px;
  color: #999;
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.cloud-service{
  width: 80%;
  padding: 49px 58px 10px 58px;
  text-shadow: 0 0 black;
}
.public-header{
  font-size: 28px;
  color: #333333;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}
.service-border{
  width: 56px;
  height: 7px;
  background-image: linear-gradient(270deg, rgba(130, 188, 255, 0.00) 0%, #4B87FF 50%);
  margin: 5px 0 52px;
}
.chosen-title{
  width: 100%;
  margin: 15px 0 5px;
  font-size: 20px;
  line-height: normal;
  font-weight: 700;
  color: #333333;
  text-align: center;
}
.chosen-desc{
  font-size: 16px;
  color: #999;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: 5px;
  padding-right: 15px;
  height: 48px;
  width: 240px;
  overflow: hidden;
}
.el-carousel__item{
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-size: 100% 100%;
  background-image: url("/static/images/carousel02.png");

}
.el-carousel__item:nth-child(2n+1) {
  background-image: url("/static/images/carousel01.png");
  background-size: 100% 100%;
}

.solution-banner{
  margin: 0 auto;
  width: 1200px;
  height: 492px;
  font-size: 0;
  overflow: hidden;
}
.show-box{
  margin-left: 7%;
}

</style>
