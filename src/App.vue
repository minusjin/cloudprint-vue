<template>
  <div id="app">
    <el-menu router class="el-menu-demo"  mode="horizontal">
      <a class="logo-box" ><span>云共享</span> </a>
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/dataShare"> 资料分享</el-menu-item>
      <el-menu-item index="/center">个人中心</el-menu-item>
      <el-menu-item index="3">使用帮助</el-menu-item>
      <div class="login-box" >
        <el-button type="text" v-show="isLogin" @click="dialogFormVisible = true">登录</el-button>
        <el-button type="primary" v-show="isLogin" icon="el-icon-user" :round="true" @click="register" >注册</el-button>
        <el-button type="text" v-show="!isLogin" @click="dialogFormVisible = true">退出</el-button>
      </div>


    </el-menu>

    <el-dialog width="30%" :visible.sync="dialogFormVisible">


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      isLogin:true,
      activeIndex:this.$route.path
    };
  },
  methods: {
    register(){
      this.$router.push("/register")
    }
  }
}
</script>

<style>
.logo-box{
  float: left;
  text-align: center;
  padding:18px 60px 0 60px ;
}
.el-menu-item {
  padding: 0 62px;
  font-size: 16px;
}
.login-box{
  float: right;
  padding:8px 60px 0 0 ;
}
</style>
