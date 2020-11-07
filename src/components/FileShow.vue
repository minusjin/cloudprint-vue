<!--文件展示首页-->
<template>
<div class="fileShow">
  <div class="select-box">
    <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
      <el-form-item label="资料名称" prop="name">
        <el-input v-model="formInline.name" placeholder="资料名称"></el-input>
      </el-form-item>
      <el-form-item label="资料类型" prop="type">
        <el-select v-model="formInline.type" placeholder="资料类型">
          <el-option label="考研" value="考研"></el-option>
          <el-option label="考试" value="考试"></el-option>
          <el-option label="四六级" value="四六级"></el-option>
          <el-option label="求职" value="求职"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formInline')" round>查询</el-button>
        <el-button @click="resetForm('formInline')" round>重置</el-button>

      </el-form-item>
    </el-form>
  </div>
  <div class="contents">

      <div v-for="item in tableData"  class="table-box" >

        <el-tag style="margin: 5px 0 0 5px">{{ item.type }}</el-tag>
        <span>{{item.name}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{item.createTime}}</span>

        <h4 style="margin-left: 20px">{{item.description}}</h4>
        <div class="button-box" >
          <el-button type="primary" plain size="small" round>查看详情</el-button>
          <el-button type="success" plain size="small" @click="download(item.cloudUrl)"  round>下载文件</el-button>
        </div>

      </div>

  </div>
  <el-pagination
    background layout="prev, pager, next"
    :total="total" :page-size="formInline.size" :current-page="formInline.pageNow"
    @current-change="findPage"
    style="margin-left: 20%">
  </el-pagination>


</div>
</template>

<script>
export default {
  name: "FileShow",
  data() {
    return {
      formInline: {
        name: '',
        type: '',
        size: 4,
        pageNow: 1
      },
      tableData: {
        createTime: '',
        name: '',
        description: '',
        type: '',
        cloudUrl:'',
        id:'',
        fileName:''
      },
      total:0



    }

  },
  methods: {
    //处理分页
    findPage(page){
      this.formInline.pageNow = page
      this.getList();
      this.getTotal();
    },
    //查询
    onSubmit: function (formInline) {
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
      fomdata.append('name',this.formInline.name)
      fomdata.append('type',this.formInline.type)
      fomdata.append('size',this.formInline.size)
      fomdata.append('pageNow',this.formInline.pageNow)
      this.$http.post("http://localhost:8082/sysfile/list",fomdata).then(res=>{
        console.log(res.data)
        this.tableData = res.data;

      })
    },
    //获取总数
    getTotal(){
      let fomdata =new FormData();
      fomdata.append('size',this.formInline.size)
      fomdata.append('pageNow',this.formInline.pageNow)
      this.$http.post("http://localhost:8082/sysfile/getTotal",fomdata).then(res=>{
        this.total = res.data
      })
    },
    download(event){
        window.open(event)


      console.log(event)
    }


  },
  created() {
    //初始化加载数据
    this.getList();
    this.getTotal();
  }
}
</script>

<style scoped>
.fileShow{

}
.select-box{
  margin: 20px 0 0 20%;
}
.contents{
  margin: 0 30% 0 20%;
}
.table-box{
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: 10px;
  padding-bottom: 10px;
}
.button-box{
  margin-left: 70%;
}

</style>
