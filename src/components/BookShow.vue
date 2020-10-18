<!--图书展示首页-->
<template>
<div>
  <div class="article">
    <h1>书圈</h1>
    <div class="table-box">
      <div class="main-pic">
        <img :src="imgSrc" style="max-width: 135px;max-height: 200px;">
      </div>
      <div style="padding: 15px 0 0 5px">
        <span>书名</span>
        <el-divider direction="vertical"></el-divider>
        <span>作者</span>
        <h5 style="margin:10px 20px 10px 20px">《有理想就有疼痛:中国当代文化名人访谈录》是一份关于当代中国文化的最真实底稿，收录了高晓春与白先勇、冯骥才、余华、莫言、余秋雨、陈忠实等20位当代中国文化大家的对话。通过近距离的访谈，展现了这些文化大家多彩的内心世界，也阐释了他们对生命、艺术、财富及文化的理解。</h5>
      </div>
      <div ><span >推荐分数</span></div>
      <div class="button-box" >


        <el-button type="primary" plain size="small">查看详情</el-button>
        <el-button type="success" plain size="small" @click="" >借阅此书</el-button>
      </div>
    </div>
  </div>

  <div class="aside">
    <div class="gray_ad">
      <div class="upload-book">
        <el-button type="primary" icon="el-icon-reading" round @click="uploadBook">共享图书</el-button>
      </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
name: "BookShow",
  data() {
    return {
      imgSrc:'http://api.jisuapi.com/isbn/upload/4d/148c513a7b887e.jpg'
    };
  },
  methods:{
  uploadBook(){
    this.$router.push("/uploadBooks")
  },
    //表单上传
    submitForm(formName) {
      let fomdata =new FormData();
      fomdata.append('name',this.ruleForm.name)
      fomdata.append('type',this.ruleForm.type)
      fomdata.append('description',this.ruleForm.description)
      fomdata.append('fileName',this.ruleForm.fileName)
      fomdata.append('cloudUrl',this.ruleForm.cloudUrl)
      fomdata.append('userId',this.$cookies.get("cookieUsername"))
      this.$http.post("http://localhost:8082/sysfile/saveFile",fomdata).then(res=>{
        console.log(res.data.msg);
        if (res.data.code==200){
          this.$message({
            showClose: true,
            message: '恭喜你文件'+res.data.msg,
            type: 'success'
          });
          //清空表单
          this.ruleForm = {}

        }else {
          this.$message({
            showClose: true,
            message: '出错了'+res.data.msg,
            type: 'error'
          });
        }
      })


    }, //重置
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    }



  }

}
</script>

<style scoped>
.article{
  width: 675px;
  float: left;
  padding: 20px 30px 0 10%;
}
.aside{
  left: 712px;
  width: 300px;
  float: right;
  padding:7% 10% 0 0;
}

.main-pic{
  float: left;
  text-align: center;
  max-width: 155px;
  overflow: hidden;
  padding: 15px 0 0 10px;
}
.table-box{
  height: 160px;
  width: 800px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: 10px;
  padding-bottom: 10px;
  background-color: #F0F3F5;
}
.button-box{
  margin-left: 70%;
}
.gray_ad {
  height: 80px;
  padding: 18px 16px;
  background: #F6F6F2;
}
.upload-book {
  padding: 20px 0;
  margin-bottom: 40px;
  font-size: 13px;
  text-align: center;
}

</style>
