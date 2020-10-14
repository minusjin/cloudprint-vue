<template>
  <!---->
  <!--导航栏-->
  <div id="app">
    <el-menu router class="el-menu-demo"  mode="horizontal">
      <a class="logo-box" ><span>云共享</span> </a>
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/dataShare"> 资料分享</el-menu-item>
      <el-menu-item index="/center">个人中心</el-menu-item>
      <el-menu-item index="3">使用帮助</el-menu-item>
      <div class="login-box" >
        <el-button type="text" v-show="this.$store.state.flagLogin"  @click="login">登录</el-button>
        <el-button type="primary" v-show="this.$store.state.flagLogin" icon="el-icon-user" :round="true" @click="register" >注册</el-button>
        <el-button type="text" v-show="!this.$store.state.flagLogin" disabled>{{this.$cookies.get("cookieUsername")}}</el-button>
        <el-button type="text" v-show="!this.$store.state.flagLogin"  @click="logout">退出</el-button>
      </div>
    </el-menu>
<!--登录模块-->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      formLabelWidth: '120px',
      activeIndex:this.$route.path,
    };
  },
  methods: {
    register(){
      this.$router.push("/register")
    },
    login(){
      this.$router.push("/login")

    },
    logout(){
      this.$http.post("http://localhost:8082/sysuser/logout").then(res=>{
        this.$message({
          showClose: true,
          message: "账号已经成功退出",
          type: 'success'
        });
      })
      this.$store.commit("updateLogin",true)
    },
    flag(){
      if(this.$cookies.get("cookieLogin")=="true"){
        this.$store.commit("updateLogin",false)
      }
    }
  },
  created() {
    //初始化加载数据
    this.flag();
  }
}
</script>

<style>
.logo-box{
  float: left;
  text-align: center;
  padding:18px 60px 0 60px ;
}
.login-box{
  float: right;
  padding:8px 60px 0 0 ;
}
</style>
