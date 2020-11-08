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
    <div>
      <el-button
        type="success" round icon="el-icon-collection" @click="handleEdit"
        >参与共享</el-button>
    </div>
    <div style="margin-bottom: 15px;position: relative;"><h2 style="font-size: 24px"><span>书友评论
        </span>
    </h2></div>

    <textarea class="reply-text"  placeholder="写下你的评论..." v-model="input"></textarea>
    <el-button style="margin: 8px 0 0 500px" type="success" size="small" icon="el-icon-edit" @click="saveComment(-1)" round>发布</el-button>
    <div class="main-comment">
      <div  v-for="item in comments">
        <div class="comments" style="padding-left: 10px" v-show="commentState">

          <img style="padding-bottom: 30px" width="40px" height="40px" :src=item.avatar>
          <div style="display: inline-block ;height: auto;border-radius: 30px;padding: 10px 0 0 10px">
            <div style="width: 400px;">
              <a  >{{item.nickname}}</a>
              <a style="font-size: 13px">{{ item.createTime }}</a>
            </div>
            <div style="margin: 10px 0 0 10px">{{ item.content }}</div>
            <div style=""><el-button type="text" @click="reply(item)" >回复</el-button></div>
          </div>
        </div>
        <div class="reply" v-show="showItemId === item.id" >
          <textarea class="reply-area" :placeholder= placeholder v-model="replyInput"></textarea>
          <div style="margin-top: 5px;padding-left: 250px">
            <el-button type="success" size="small" @click="saveComment(item.id)"  round>发布</el-button>
            <el-button type="info" size="small" style="background-color: #bbbbbb" @click="closeButton(1)" round>取消</el-button>
          </div>
        </div>
        <!--子集评论-->
        <div v-for="items in item.replyComments">
          <div class="comment" v-show="item.replyComments!=''"  >
            <div class="comment-main" style="margin-left: 70px;height: 100px;width: 510px;border-bottom: #d1dfe4 2px solid;">
              <img style="padding-bottom: 30px;margin-left: 10px" width="40px" height="40px" :src=items.avatar>
              <div style="display: inline-block ;height: auto;border-radius: 30px;padding: 10px 0 0 10px">
                <div style="width: 400px;">
                  <a>{{ items.nickname }}@{{items.parentNickname}}</a>
                  <a style="font-size: 13px">{{ items.createTime }}</a>
                </div>
                <div style="margin: 10px 0 0 10px">{{items.content}}</div>
                <div style=""><el-button type="text"  @click="replys(items)">回复</el-button></div>
              </div>
            </div>
          </div>
          <div class="reply" style="margin-left: 23%" v-show="showItemsId === items.id">
            <textarea class="reply-area" :placeholder= placeholder v-model="replyInput"></textarea>


            <div style="margin-top: 5px;padding-left: 250px">
              <el-button type="success" size="small" @click="saveComment(items.id)" round>发布</el-button>

              <el-button type="info" size="small" style="background-color: #bbbbbb" @click="closeButton(2)" round>取消</el-button>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div >



<!--参与共享框-->
  <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
    <el-form label-width="80px" ref="editForm" :model="editForm" >

      <el-form-item label="取书备注" prop="rehearRemark">
        <el-input size="small" type="textarea" v-model="editForm.borrowRemark" auto-complete="off" placeholder="请输入取书备注"></el-input>
      </el-form-item>
      <div class="block" style="padding-left: 2%">
        <span class="demonstration">预计归还日期：</span>
        <el-date-picker
          size="small"
          v-model="editForm.borrowTime"

          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
      <el-button size="small" type="primary"  class="title" @click="bookShare('editForm')">借阅</el-button>
    </div>
  </el-dialog>
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
      id:'',
      creatUser:'',
      state:''
    },
    title: '借阅此书',
    editFormVisible: false, //控制编辑页面显示与隐藏

    editForm:{
      borrowRemark:'',
      borrowTime:'',
    },
    //评论
    commentState:true,
    //回复控件
    showItemId:'',
    showItemsId:'',
    placeholder:'',
    comments:{
      id:'',
      nickname:'',
      email: '',
      content:'',
      avatar:'',
      createTime:'',
      parentCommentId:'',
      replyComments:{
        id:'',
        nickname:'',
        email: '',
        content:'',
        avatar:'',
        createTime:'',
        parentCommentId:'',
        parentNickname:''
      }
    },
    //回复的值
    replyInput:'',
    input:'',



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
    },
    handleEdit() {
      if (this.bookInfo.state=="1"){

        this.editFormVisible = true;
      }else {
        this.$message({
          showClose: true,
          message: '图书已借阅',
          type: 'error'
        });
      }
    },
    closeDialog(dialog) {
        this.editFormVisible = false
    },
    bookShare(){
      let fomdata =new FormData();
      fomdata.append('borrowUser',this.$cookies.get("cookieUserId"))
      fomdata.append('bookId',this.bookInfo.id)
      fomdata.append('bookUser',this.bookInfo.creatUser)
      fomdata.append('remandTime',this.editForm.borrowTime)
      fomdata.append('borrowRemark',this.editForm.borrowRemark)
      console.log(this.bookInfo.state)
      if (this.bookInfo.state=="1"){
        this.$http.post("http://localhost:8082/borrowbook/saveBorrow",fomdata).then(res=>{
          if (res.data.code==200){
            this.$message({
              showClose: true,
              message: '恭喜你'+res.data.msg,
              type: 'success'
            });
          }
        })
      }
      console.log(this.editForm.borrowTime)
    },
    //获取评论
    getComment(){
      let fomdata =new FormData();
      fomdata.append('insertId',this.id)
      this.$http.post("http://localhost:8082/comment/commentList",fomdata).then(res=>{
        this.comments = res.data
      })
    },
    //一级评论回复
    reply(item){
      this.showItemId = item.id;
      this.placeholder ="@"+ item.nickname;
    },
    //二级评论回复
    replys(items){
      this.showItemsId = items.id;
      this.placeholder ="@"+ items.nickname;
    },
    //保存评论
    saveComment(value){
      let fomdata =new FormData();
      fomdata.append('userId',this.$cookies.get("cookieUserId"))
      if (value==-1){
        fomdata.append('content',this.input)
      }else {
        fomdata.append('content',this.replyInput)
      }
      fomdata.append('parentCommentId',value)
      fomdata.append('insertId',this.id)
      this.$http.post("http://localhost:8082/comment/saveComment",fomdata).then(res=>{
        if (res.data.code==200){
          this.getComment();
          this.showItemId = 0;
          this.showItemsId = 0
          this.$message({
            showClose: true,
            message: '恭喜你'+res.data.msg,
            type: 'success'
          });
        }
      })
    },
    //关闭评论
    closeButton(value){
      if (value==1){
        this.showItemId = 0
      }
      if (value==2){
        this.showItemsId = 0
      }

},
  },
  created() {
  this.getBookInfo();
  this.getComment();
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
.main-comment{
  margin-top: 10px;
}
.comments{
  height: 100px;
  width: 600px;
  border-bottom: #d1dfe4 2px solid;
}
.comment{
  margin-left: 30px;
  height: 100px;
  width: 500px;
}
.comment-main{

}
.reply{
  margin-left: 50px;
  padding-top: 10px;
  height: 90px;
  width: 400px;
  border-radius: 30px
}
.reply-text {
  padding: 12px 16px;
  width: 100%;
  height: 80px;
  font-size: 13px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fafafa;
  resize: none;
  display: inline-block;
  vertical-align: top;
  outline-style: none;
}
.reply-area{
  padding: 12px 16px;
  width: 400px;
  height: 40px;
  font-size: 13px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fafafa;
  resize: none;
  display: inline-block;
  vertical-align: top;
  outline-style: none;
}
</style>
