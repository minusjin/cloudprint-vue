<template>
  <div class="uploadFiles-box">
    <div class="upload-box">
      <el-upload :on-success="fileSuccess"
                 class="upload-demo"
                 ref="upload"
                 :auto-upload="false"
                 drag
                 action="http://localhost:8082/upload/uploadFile"
                 multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

      </el-upload>
      <el-button style="margin:10px 0 0 260px;" size="small" type="primary" icon="el-icon-upload"  @click="submitUpload">上传文件</el-button>
    </div>

    <div class="file-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="资料名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="资料类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择资料类型">
            <el-option label="考研" value="考研"></el-option>
            <el-option label="考试" value="考试"></el-option>
            <el-option label="求职" value="求职"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资料描述" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">分享资料</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
name: "UploadFiles",
  data(){
  return{
    ruleForm: {
      name: '',
      type: '',
      description: '',
      fileName:'',
      cloudUrl:'',

    },
    rules: {
      name: [
        { required: true, message: '请输入资料名称', trigger: 'blur' },
        { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
      ],
      description:[
        { required: true, message: '请填写资料描述', trigger: 'blur' }
        ]
    },

  }
  },
  methods:{
    fileSuccess(response, file){
this.ruleForm.fileName = file.name;
this.ruleForm.cloudUrl = response;
      this.$message({
        showClose: true,
        message: '恭喜你上传文件成功',
        type: 'success'
      });
    },
    //文件上传
    submitUpload() {
      this.$refs.upload.submit();
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
  this.$http.post("/sysfile/saveFile",fomdata).then(res=>{
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
    },
}
</script>

<style scoped>
.uploadFiles-box{
  margin-top: 60px ;
  margin-left: 25%;
}
.upload-box{
  margin: 0 0 30px 100px;
}
.file-box{
  margin-right: 50%;
}
</style>
