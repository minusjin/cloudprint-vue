<!--注册页-->
<template>
<div>
<div class="register-box">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username" required	>
      <el-input v-model.number="ruleForm.username"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" required	>
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" required	>
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
    >
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model.number="ruleForm.phone"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>


</div>
</div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      callback();
    };

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var isMobileNumber= (rule, value, callback) => {
      if (!value) {
        return new Error("请输入电话号码");
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        const isPhone = reg.test(value);
        value = Number(value); //转换为数字
        if (typeof value === "number" && !isNaN(value)) {//判断是否为数字
          value = value.toString(); //转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) { //判断是否为11位手机号
            callback(new Error("手机号码格式如:138xxxx8754"));
          } else {
            callback();
          }
        } else {
          callback(new Error("请输入电话号码"));
        }
      }
    };

    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        email: '',
        phone:'',
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: isMobileNumber, trigger: "blur" }
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
          fomdata.append('email',this.ruleForm.email)
          fomdata.append('phone',this.ruleForm.phone)
          this.$http.post("/sysuser/register",fomdata).then(res=>{
            if (res.data.code==200){
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
              this.$router.push('/login')
            }else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
            }
          })
          console.log(' submit!!');

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }

}
</script>

<style scoped>
.register-box{
  padding:10% 30% 0 30%;

}
</style>
