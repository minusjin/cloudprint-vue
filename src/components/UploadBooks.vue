<!--图示上传页-->
<template>
<div class="upload-book">

  <div class="main-pic">
    <img :src="ruleForm.bookImg" style="max-width: 135px;max-height: 200px;">
  </div>
  <div class="upload-button">
    <el-upload
      class="upload-demo"
      action="http://localhost:8082/upload/uploadFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="fileSuccess"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      >
      <el-button size="small" type="primary" >上传封面</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
<div class="upload-form">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="书名" prop="bookName">
      <el-input v-model="ruleForm.bookName"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="ruleForm.author"></el-input>
    </el-form-item>
    <el-form-item label="出版社" prop="publishing">
      <el-input v-model="ruleForm.publishing"></el-input>
    </el-form-item>
    <el-form-item label="ISBN码" prop="isbn">
      <el-input v-model="ruleForm.isbn"></el-input>
    </el-form-item>
    <el-form-item label="图书简介" prop="introduction">
      <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
    </el-form-item>
    <el-form-item label="推荐指数" prop="recommend">
      <el-select v-model="ruleForm.recommend" placeholder="请选择推荐指数">
        <el-option label="3分" value="3"></el-option>
        <el-option label="6分" value="6"></el-option>
        <el-option label="8分" value="8"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="取书地址" prop="pickupAddress">
      <el-input type="textarea" v-model="ruleForm.pickupAddress"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" prop="contactWay">
      <el-input v-model="ruleForm.contactWay"></el-input>
    </el-form-item>
    <el-form-item label="共享图书时间" prop="sharingTime">
      <el-select v-model="ruleForm.sharingTime" placeholder="请选择共享时间">

        <el-option label="2个月" value="2"></el-option>
        <el-option label="3个月" value="3"></el-option>
        <el-option label="6个月" value="6"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">分享图书</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

</div>
</div>
</template>

<script>
export default {
name: "UploadBooks",
  data() {
    return {
      fileList: [
        {name: '', url: ''}],
      ruleForm: {
        bookImg: 'http://qi4mkzi4g.hn-bkt.clouddn.com/duck/2020-10-18-2b164c85f8844ce28e1e1f741954f80d.jpg',
        bookName: '',
        author: '',
        publishing: '',
        introduction : '',
        isbn: '',
        pickupAddress: '',
        contactWay : '',
        recommend : '',
        sharingTime : '',
      },
      rules: {
        bookName: [
          { required: true, message: '请输入书名', trigger: 'blur' },
        ],
        contactWay:[
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        isbn:[
          { required: true, message: '请填写ISBN码', trigger: 'blur' }
        ],
        pickupAddress:[
          { required: true, message: '请输入取书地址', trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
  //图片上传成功返回结果
    fileSuccess(response, file){
      this.ruleForm.bookImg = response;
      this.$message({
        showClose: true,
        message: '恭喜你上传文件成功',
        type: 'success'
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //表单上传
    submitForm(formName) {
      let fomdata =new FormData();
      fomdata.append('bookImg',this.ruleForm.bookImg)
      fomdata.append('bookName',this.ruleForm.bookName)
      fomdata.append('author',this.ruleForm.author)
      fomdata.append('publishing',this.ruleForm.publishing)
      fomdata.append('introduction',this.ruleForm.introduction)
      fomdata.append('isbn',this.ruleForm.isbn)
      fomdata.append('pickupAddress',this.ruleForm.pickupAddress)
      fomdata.append('contactWay',this.ruleForm.contactWay)
      fomdata.append('recommend',this.ruleForm.recommend)
      fomdata.append('sharingTime',this.ruleForm.sharingTime)
      fomdata.append('creatUser',this.$cookies.get("cookieUserId"))
      this.$http.post("http://localhost:8082/sysbook/saveBook",fomdata).then(res=>{
        console.log(res.data.msg);
        if (res.data.code==200){
          this.$message({
            showClose: true,
            message: '恭喜你'+res.data.msg,
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
.main-pic{
  float: left;
  text-align: center;
  max-width: 155px;
  overflow: hidden;
  margin-left: 30%;
  padding: 4% 0 0 10px;
}
.upload-button{
  width: 300px;
  height: 30px;
  margin-left: 10%;
  padding: 10% 0 0 40%;
}
.upload-book{
  height: auto;
  margin: 2% 15% 0 15%;
  background-color: #F0F3F5;
}
.upload-form{
  padding: 130px 30% 2% 20%;
}
</style>
