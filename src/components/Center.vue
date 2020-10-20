<template>
  <div>

    <div class="book-nav">
      <div class="nav-search">
        <form action="https://search.douban.com/book/subject_search" method="get">
          <fieldset>
            <legend>搜索：</legend>
            <label for="inp-query">
            </label>
            <div class="inp">
              <input id="inp-query" name="search_text" size="22" maxlength="60" placeholder="书名、作者、ISBN" value="" autocomplete="off">
            </div>
            <div class="inp-btn"><input type="submit" value="搜索"></div>
          </fieldset>
        </form>
      </div>  </div>


  </div>
</template>

<script>
export default {
  name: "Container",
  methods:{
    center(){
      if (this.$cookies.get("cookieLogin")=="true"){

      }else {
        this.$router.push("/login")
        this.$message({
          showClose: true,
          message: "无权限请先登录",
          type: 'error'
        });
      }
    }
  },
  created() {
    //初始化加载数据
    this.center();
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
