<template>


<div >
  <!--表格-->
  <el-table
    :data="tableData"
    stripe
    style="width: 100%;">
    <el-table-column
      prop="createTime"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="bookName"
      label="图书名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="isbn"
      label="ISBN码">
    </el-table-column>
    <el-table-column
      prop="rehear"
      label="审核状态" width="180">
    </el-table-column>
    <el-table-column
      prop="rehearRemark"
      label="审核结果" width="300">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">

        <el-button
          size="mini"
          type="danger"
          @click="handleDelete( scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--分页-->
  <el-pagination
    background layout="total,prev, pager, next"
    :total="total" :page-size="size" :current-page="pageNow"
    @current-change="findPage"
  >
  </el-pagination>

</div>
</template>

<script>
export default {
name: "MyBook",
  data() {
    return {
      tableData: [{
        bookImg:'',
        bookName: '',
        author: '',
        publishing: '',
        introduction: '',
        recommend: '',
        isbn: '',
        pickupAddress: '',
        contactWay : '',
        id:'',
        createTime:'',
        creatUser:'',
        rehear:'',

      }],
      size: 5,
      pageNow: 1,
      total:0,
    }
  },
  methods:{
    handleEdit(value){

    },
    handleDelete(){

    },
    getList(){
      let fomdata =new FormData();
      fomdata.append('size',this.size)
      fomdata.append('pageNow',this.pageNow)
      this.getTotal();
      this.$http.post("http://localhost:8082/sysbook/list",fomdata).then(res=>{
        this.tableData = res.data;

      })
    }, //处理分页
    findPage(page){
      this.pageNow = page
      this.getList();
      this.getTotal();
    },
    //获取总数
    getTotal(){
      let fomdata =new FormData();
      fomdata.append('size',this.size)
      fomdata.append('pageNow',this.pageNow)
      this.$http.post("http://localhost:8082/sysbook/getTotal",fomdata).then(res=>{
        this.total = res.data
      })
    },
  },
  created() {
    //初始化加载数据
    this.getList();
  }
}
</script>

<style scoped>

</style>
