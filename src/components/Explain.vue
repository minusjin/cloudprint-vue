<template>
  <div>
    <div class="main-comment" v-for="item in comments">
      <div class="comments" style="padding-left: 10px" v-show="commentState">

        <img style="padding-bottom: 30px" width="40px" height="40px" :src=item.avatar>
        <div style="display: inline-block ;height: auto;border-radius: 30px;padding: 10px 0 0 10px">
          <div style="width: 200px;">
            <a  >{{item.nickname}}</a>
            <a style="font-size: 13px">{{ item.createTime }}</a>
          </div>
          <div style="margin: 10px 0 0 10px">{{ item.content }}</div>
          <div style=""><el-button type="text" @click="reply(item)" >回复</el-button></div>
        </div>
      </div>
      <div class="reply" v-show="showItemId === item.id" >
        <el-input style="width: 300px"
                  :placeholder= placeholder
                  suffix-icon="el-icon-edit"
                  v-model="replyInput">
        </el-input>
        <el-button type="primary" size="small"  round>发布</el-button>
      </div>
      <!--子集评论-->
      <div v-for="items in item.replyComments">
        <div class="comment" v-show="item.replyComments!=''"  >
          <div class="comment-main" style="margin-left: 70px;height: 100px;width: 510px;border-bottom: #d1dfe4 2px solid;">
            <img style="padding-bottom: 30px;margin-left: 10px" width="40px" height="40px" :src=items.avatar>
            <div style="display: inline-block ;height: auto;border-radius: 30px;padding: 10px 0 0 10px">
              <div style="width: 200px;">
                <a>{{ items.nickname }}@{{items.parentNickname}}</a>
                <a style="font-size: 13px">{{ items.createTime }}</a>
              </div>
              <div style="margin: 10px 0 0 10px">{{items.content}}</div>
              <div style=""><el-button type="text" @click="replys(items)">回复</el-button></div>
            </div>
          </div>
        </div>
        <div class="reply" style="margin-left: 23%" v-show="showItemsId === items.id">
          <el-input style="width: 300px"
                    :placeholder= placeholder
                    suffix-icon="el-icon-edit"
                    v-model="replyInput">
          </el-input>
          <el-button type="primary" size="small"  round>发布</el-button>
        </div>
      </div>
    </div>
  </div>



</template>


<script>
export default {
  name: "Explain",
  data(){
    return{
      commentState:true,
      showItemId:'',
      showItemsId:'',
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
      replyInput:'',
      placeholder:'',
    }
  },
  methods:{
    //获取评论
    getLsit(){
      this.$http.get("http://localhost:8082/comment/commentList").then(res=>{
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
    }
    //保存评论
  },
  created() {
    this.getLsit();
  }
}
</script>

<style  scoped>

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
  height: 50px;
  width: 600px;
  border-radius: 30px
}
</style>

