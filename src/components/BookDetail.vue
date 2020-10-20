<!--图书详情页-->
<template>
<div>
  <div class="book-nav">

  </div>

  <div style="background-color: #d1dfe4">

  </div>
  <div class="article">
    <div class="main-pic">
      <img :src=bookInfo.bookImg style="max-width: 135px;max-height: 200px;">
    </div>
    <div  class="main-book">
      <h1 style="font-weight: bold;
    font-size: 20px;margin-top: 0">{{bookInfo.bookName}}</h1>
      <p>
        <span class="label">作者</span>
        <span class="label">{{bookInfo.author}}</span>
      </p>
      <p>
        <span class="label">出版社</span>
        <span class="label">{{bookInfo.publishing}}</span>
      </p>
      <p>
        <span class="label">ISBN</span>
        <span class="label">{{bookInfo.isbn}}</span>
      </p>
      <el-rate
        style="margin-top: 3%"
        v-model="recommend"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
      </div>

    <div class="section">
      <div style="margin-bottom: 15px;position: relative;"><h2><span>   · · · · · ·作品简介
        · · · · · ·</span>
      </h2></div>
      <div style="margin: 0  20px 0 15px;"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {{bookInfo.introduction}}</p></div>
      <div style="margin-bottom: 15px;position: relative;"><h2><span>   · · · · · ·取书地址
        · · · · · ·</span>
      </h2></div>
      <div style="margin: 0  20px 0 15px;"><h3>{{bookInfo.pickupAddress}}</h3></div>
      <div style="margin-bottom: 15px;position: relative;"><h2><span>   · · · · · ·联系方式
        · · · · · ·</span>
      </h2></div>
      <div style="margin: 0  20px 0 15px;"><h3>{{bookInfo.contactWay}}</h3></div>


    </div>
  </div >
  <div class="aside">aside</div>


</div>
</template>

<script>
export default {
name: "BookShare",
  data() {
  return{
    recommend: 0,
    id: this.$route.params.id,
    bookInfo:{
      bookImg:'',
      bookName: '',
      author: '',
      publishing: '',
      introduction : '',
      isbn: '',
      pickupAddress: '',
      contactWay : '',

      id:''

    }
  }

  },
  methods:{
    getBookInfo(){
      let fomdata =new FormData();
      fomdata.append('id',this.id)
      this.$http.post("http://localhost:8082/sysbook/listDetail",fomdata).then(res=>{
        this.bookInfo = res.data;
        this.recommend = parseInt(res.data.recommend);

      })
    }
  },
  created() {
  this.getBookInfo();
  }
}

</script>

<style scoped>
.book-nav{
  height: 80px;
  padding-top: 20px;
  background-color: #F6F6F2;
}


.article {
  float: left;
  width: 600px;
  margin-bottom: 50px;
  margin-left: 20%;
}
.aside{
  float: right;
  width: 264px;
  margin-right: 20%;
  background-color: #4B87FF;
}
.main-pic{
  float: left;
  text-align: center;
  max-width: 155px;
  overflow: hidden;
  padding: 6% 0 0 0;
}
.main-book{
  padding: 6% 0 0 0;
  margin-left: 25%;
}
p{
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 14px;
}
h2{
  font-size: 16px;
  color: #007722;
}
h3{
  font-size: 15px;
}
.label{
  margin-right: 5px;
  font-size: 14px;
}
.section{
  margin-top: 36px;
  margin-bottom: 20px;
}

</style>
