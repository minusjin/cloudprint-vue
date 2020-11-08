<template>
  <div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;">
      <el-table-column
        prop="bookName"
        label="借阅书名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remandTime"
        label="归还日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="borrowState"
        label="借书状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pickupAddress"
        label="取书地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="contactWay"
        label="联系方式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="borrowRemark"
        label="借书备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">借阅详情</el-button>
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
    <!--详情模态框-->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog()'>
      <el-divider>借阅单</el-divider>
      <div>
        <div style="width: 400px;margin-bottom: 10px">
          <span>借书人：{{this.$cookies.get("cookieUsername")}}</span><el-divider direction="vertical"></el-divider><span>借书状态：{{ editForm.borrowState }}</span>
          <el-divider direction="vertical"></el-divider><span>借书日期：{{ editForm.borrowTime }}</span>
        </div>
        <div style="width: 400px;margin-bottom: 10px">
          <span>借阅书名：{{ editForm.bookName }}</span>
          <el-divider direction="vertical"></el-divider><span>ISBN码：{{ editForm.isbn }}</span>
        </div>
        <span>借书备注：{{ editForm.borrowRemark }}</span>

        <el-divider></el-divider>
        <div style="width: 400px;margin-bottom: 10px">
          <span>共享人：{{ editForm.bookUser }}</span><el-divider direction="vertical"></el-divider><span>归还日期：{{ editForm.remandTime}}</span>

        </div>
        <div style="width: 400px">
          <span>取书地址：{{ editForm.pickupAddress }}</span><el-divider direction="vertical"></el-divider><span>联系方式：{{ editForm.contactWay }}</span>

        </div>
      </div>
      <el-divider><i class="el-icon-collection-tag"></i>
      </el-divider>
    </el-dialog>
  </div>
</template>

<script>
export default {
name: "MyBorrow",
  data() {
    return {
      title: '借阅信息',
      editFormVisible: false, //控制编辑页面显示与隐藏
      editForm:{
        id:'',
        bookName: '',
        isbn: '',
        borrowTime: '',
        remandTime: '',
        borrowState: '',
        borrowRemark: '',
        pickupAddress: '',
        contactWay : '',
        bookUser:'',
      },
      tableData: [{
        id:'',
        bookName: '',
        isbn: '',
        borrowTime: '',
        remandTime: '',
        borrowState: '',
        borrowRemark: '',
        pickupAddress: '',
        contactWay : '',
        bookUser:'',
      }],
      size: 5,
      pageNow: 1,
      total:0,
    }
  },
  methods:{
    handleEdit(value){
      this.editForm = value
      this.editFormVisible = true;
    },
    handleDelete(){

    },
    getList(){
      let fomdata =new FormData();
      fomdata.append('size',this.size)
      fomdata.append('pageNow',this.pageNow)
      this.getTotal();
      this.$http.post("http://localhost:8082/borrowbook/getBorrowBook",fomdata).then(res=>{
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
      this.$http.post("http://localhost:8082/borrowbook/getTotal",fomdata).then(res=>{
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
