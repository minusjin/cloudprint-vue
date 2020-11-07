<template>
<div>

  <template>
      <div class="demo-type" style="width: 200px;padding: 2% 0 0 2%">
        <el-avatar :size="60" :src=tableData.headerPic @error="errorHandler">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
        <a style="font-size: 24px;padding-left: 20px;">{{ tableData.username }}</a>
      </div>
  </template>
  <div style="margin-bottom: 15px;position: relative; padding: 2% 0 0 2% "><h2><span>  性别:
        </span>
  </h2> <a style="color: #333333">{{ tableData.sex }}</a></div>
  <div style="margin-bottom: 15px;position: relative; padding: 2% 0 0 2% "><h2><span>  邮箱:
        </span>
  </h2> <a style="color: #333333">{{ tableData.email }}</a></div>
  <div style="margin-bottom: 15px;position: relative; padding: 2% 0 0 2% "><h2><span>  手机:
        </span>
  </h2>  <a style="color: #333333">{{ tableData.phone }}</a></div>
  <div style="margin-bottom: 15px;position: relative; padding: 2% 0 0 2% "><h2><span>  积分:
        </span>
  </h2><a style="color: #333333">{{ tableData.integral }}</a> </div>

  <div style="padding: 2% 0 0 2%">
    <el-button
      type="primary" round icon="el-icon-collection" @click="handleEdit"
    >修改</el-button>
  </div>



  <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog()'>
    <el-form label-width="80px" ref="editForm" :model="editForm" >

      <div class="main-pic" >
        <el-avatar :size="60" :src=tableData.headerPic @error="errorHandler">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
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
          <el-button size="small" type="primary" >上传头像</el-button>
        </el-upload>
      </div>
    <div style="padding-top: 50px">
      <el-form-item label="用户名" prop="rehearRemark">
         <a>{{ tableData.username }}</a>
      </el-form-item>
      <el-form-item label="性别" prop="rehearRemark">
        <el-radio v-model="editForm.Sex" label="1">男生</el-radio>
        <el-radio v-model="editForm.Sex" label="2">女生</el-radio>
      </el-form-item>
      <el-form-item label="邮箱" prop="rehearRemark">
        <el-input size="small" v-model="editForm.Email" auto-complete="off" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="rehearRemark">
        <el-input size="small" v-model="editForm.Phone" auto-complete="off" placeholder="请输入手机"></el-input>
      </el-form-item>
   </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click='closeDialog()'>取消</el-button>
      <el-button size="small" type="primary"  class="title" @click="reviseInfo('editForm')">修改</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
name: "BasicInfo",
  data(){
  return{
    title: '修改信息',
    editFormVisible: false, //控制编辑页面显示与隐藏
    editForm:{
      Email:'',
      Phone:'',
      Sex:''
    },
    tableData:{
      id:'',
      username:'',
      email:'',
      phone:'',
      headerPic:'',
      integral:'',
      sex:'',
    },
  }

  },
  methods: {
    errorHandler() {
      return true
    },
    closeDialog() {
      this.editFormVisible = false
    },
    handleEdit() {
        this.editFormVisible = true;
    },
    getList(){
      let fomdata =new FormData();
      fomdata.append('id',this.$cookies.get("cookieUserId"))
      this.$http.post("http://localhost:8082/sysuser/list",fomdata).then(res=>{
        this.tableData = res.data
        this.editForm.Sex = res.data.sex
        this.editForm.Email = res.data.email
        this.editForm.Phone = res.data.phone
        if (res.data.sex==1){
          this.tableData.sex = '男生'
        }else {
          this.tableData.sex = '女生'
        }
      })
    },
    //图片上传成功返回结果
    fileSuccess(response, file){
      this.tableData.headerPic = response;
      this.$message({
        showClose: true,
        message: '恭喜你头像上传成功',
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
    reviseInfo(){
      let fomdata =new FormData();
      fomdata.append('id',this.$cookies.get("cookieUserId"))
      fomdata.append('sex',this.editForm.Sex)
      fomdata.append('email',this.editForm.Email)
      fomdata.append('headerPic',this.tableData.headerPic)
      fomdata.append('phone',this.editForm.Phone)
      this.$http.post("http://localhost:8082/sysuser/saveInfo",fomdata).then(res=>{
        if (res.data.code==200){
          this.closeDialog();
          this.getList();
          this.$message({
            showClose: true,
            message: '恭喜你'+res.data.msg,
            type: 'success'
          });
        }

      })
    }

  },
  created() {
  this.getList();
  }
}
</script>

<style scoped>
h2{
  font-size: 16px;
  color: #409EFF;
}
.main-pic{
  float: left;
  text-align: center;
  max-width: 135px;
  margin-left: 20px;
  border-width: 2px;
}
.upload-button{
  width: 300px;
  height: 30px;
  margin-left: 10%;
  padding: 3% 0 0 10%;
}
</style>
