<template>
<div class="login-box">
  <div class="login-box-main">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round style="margin-left: 100px" @click="submitForm('ruleForm')">登录 Login</el-button>
        <br>
        <div style="padding-left: 90px">
          <el-button type="text" @click="register">立即注册</el-button>
          <el-button type="text">忘记密码?</el-button>

        </div>

      </el-form-item>
    </el-form>
  </div>


</div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'));
      }
      callback();
    };
    return {
      ruleForm: {
        password: '',
        username: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkName, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let fomdata =new FormData();
          fomdata.append('username',this.ruleForm.username)
          fomdata.append('password',this.ruleForm.password)
          this.$http.post("http://localhost:8082/sysuser/login",fomdata).then(res=>{
            console.log(res.data);
            if (res.data.code==200){
              this.$router.push('/index')
              this.$store.commit("updateLogin",false)
              this.$store.commit("username",this.ruleForm.username)
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
            }else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    register(){
      this.$router.push({path:'/register', query: { docId:'我是谁'}})
    },
  }
}

</script>

<style scoped>
.login-box{
  width: 100%;
  height: 640px;
  background-color: #f5f5f5;
}
.login-box-main{
  margin: 100px 300px 10px 400px;
  padding: 100px 250px 100px 150px;
  background-color: white;
}
</style>
