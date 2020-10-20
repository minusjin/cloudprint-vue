<!--图书展示首页-->
<template>
<div>
  <div class="book-nav">
    <div class="nav-search">
      <form >
        <fieldset>
          <legend>搜索：</legend>
          <label for="inp-query">
          </label>
          <div class="inp">
            <input id="inp-query" name="search_text" size="22" maxlength="60" placeholder="输入书名搜索" v-model="formInline.bookName"  autocomplete="off">
          </div>
          <div class="inp-btn"><input type="submit" value="搜索" @click="getList"></div>
        </fieldset>
      </form>
    </div>  </div>
  <div class="article">

    <div v-for="item in tableData" class="table-box">
      <div class="main-pic">
        <img :src=item.bookImg style="max-width: 135px;max-height: 200px;">
      </div>
      <div style="padding: 15px 0 0 20%">
        <span>《{{ item.bookName}}》</span>
        <el-divider direction="vertical"></el-divider>
        <span>作者:{{ item.author }}</span>
        <h5 style="margin:10px 20px 10px 20px">{{ item.introduction}}</h5>
      </div>
      <div ><span style="
    margin-left: 2%;
">推荐分数:{{item.recommend}}星</span></div>
      <div class="button-box" >
        <el-button type="primary" plain size="small">查看详情</el-button>
        <el-button type="success" plain size="small" @click="" >借阅此书</el-button>
      </div>
    </div>

    <el-pagination
      background layout="prev, pager, next"
      :total="total" :page-size="formInline.size" :current-page="formInline.pageNow"
      @current-change="findPage"
      style="margin-left: 20%">
    </el-pagination>
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
      formInline: {
        bookName: '',
        author: '',
        size: 4,
        pageNow: 1
      },
      imgSrc:"http://qi4mkzi4g.hn-bkt.clouddn.com/s33715398.jpg",
      total:0,
      tableData: [{
        bookImg:'',
        bookName: '',
        author: '',
        introduction: '',
        recommend: '',
        id:''
      }],
      search:'',
    };
  },
  methods:{
  uploadBook(){
    this.$router.push("/uploadBooks")
  },
    //处理分页
    findPage(page){
      this.formInline.pageNow = page
      this.getList();
      this.getTotal();
    },
    //表单重置
    resetForm(formInline) {
      this.$refs[formInline].resetFields();
    },
    //获取列表
    getList(){
      let fomdata =new FormData();
      fomdata.append('bookName',this.formInline.bookName)
      fomdata.append('author',this.formInline.author)
      fomdata.append('size',this.formInline.size)
      fomdata.append('pageNow',this.formInline.pageNow)
      console.log(this.formInline.bookName)
      this.$http.post("http://localhost:8082/sysbook/list",fomdata).then(res=>{
        this.tableData = res.data;

      })
    },
    //获取总数
    getTotal(){
      let fomdata =new FormData();
      fomdata.append('size',this.formInline.size)
      fomdata.append('pageNow',this.formInline.pageNow)
      this.$http.post("http://localhost:8082/sysbook/getTotal",fomdata).then(res=>{
        this.total = res.data
      })
    },
  },
  created() {
    //初始化加载数据
    this.getList();
    this.getTotal();
  }

}
</script>

<style scoped>
.book-nav{
  height: 80px;
  margin: 0 10% 0 10%;
  padding-top: 20px;
  background-color: #F6F6F2;
}
.article{
  width: 675px;
  float: left;
  padding: 0 30px 0 10%;
}
.aside{
  left: 712px;
  width: 300px;
  float: right;
  padding:1% 10% 0 0;
}

.main-pic{
  float: left;
  text-align: center;
  max-width: 155px;
  overflow: hidden;
  padding: 15px 0 0 10px;
}
.table-box{
  height: 200px;
  width: 800px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: 10px;
  padding-bottom: 10px;
  background-color: #F6F6F2;
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
.nav-search {
  margin-left: 145px;
  overflow: visible !important;
  position: relative;
  zoom: 1;
  padding: 10px 0 15px 0;
}

.nav-search fieldset {
  border: none;
  padding: 0;
  margin: 0;
  position: static;
}
.nav-search legend {
  display: none;
}
fieldset legend {
  color: #666;
  padding: 0 5px;
}
.nav-search label {
  position: absolute;
  left: 11px;
  top: 10px;
  line-height: 30px;
  cursor: text;
  color: #bbb;
  width: auto;
}
label {
  vertical-align: middle;
}

.nav-search .inp {
  background-image: url("/static/images/search.png");
  float: left;
  width: 470px;
  height: 34px;
  text-align: center;
  margin-right: -3px;
  cursor: text;
}
.nav-search .inp input {
  width: 96%;
  margin: 0;
  text-align: left;
  height: 30px;
  padding-left: 10px;
  outline: none;
}
.nav-search .inp-btn {
  position: relative;
  left: -1px;
  width: 37px;
  height: 34px;
  zoom: 1;
  overflow: hidden;
}
.nav-search .inp-btn input {
  background: url("/static/images/search.png") no-repeat 0 -40px;
  width: 100%;
  height: 100%;
  font-size: 0;
  padding: 35px 0 0 0;
  overflow: hidden;
  color: transparent;
  cursor: pointer;
}
input {
  font-size: 12px;
  margin-right: 3px;
  vertical-align: middle;
}
input, button, textarea, select, optgroup, option {
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
}
div {
  display: block;
}
.nav-search input {
  -webkit-appearance: none;
  border: none;
  background: transparent;
}



</style>
