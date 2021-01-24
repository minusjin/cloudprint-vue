<template>
  <div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;">
      <el-table-column
        prop="orderId"
        label="订单号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="orderState"
        label="订单状态"
        width="150">
      </el-table-column>
      <el-table-column
        prop="printFile"
        label="打印文件"
        width="240">
      </el-table-column>
      <el-table-column
        prop="pickCode"
        label="取书码"
        width="150">
      </el-table-column>
      <el-table-column
        prop="payState"
        label="支付状态"
        width="150">
      </el-table-column>
      <el-table-column
        prop="orderPrice"
        label="打印价格（元）"
      width="150">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">订单详情</el-button>
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
      <el-divider>打印订单</el-divider>
      <div>
        <div style="width: 400px;margin-bottom: 10px">
          <span>顾客：{{this.$cookies.get("cookieUsername")}}</span><el-divider direction="vertical"></el-divider><span>订单状态：{{ editForm.orderState }}</span>
          <el-divider direction="vertical"></el-divider><span>订单日期：{{ editForm.createTime }}</span>
        </div>
        <div style="width: 400px;margin-bottom: 10px">
          <span>订单号：{{ editForm.orderId }}</span>
        </div>
        <div style="width: 400px;margin-bottom: 10px">
          <span>打印文件名：{{ editForm.printFile }}</span>
        </div>

        <span>打印备注：{{ editForm.printRemark }}</span>

        <el-divider></el-divider>
        <div style="width: 400px;margin-bottom: 10px">
          <span>支付状态：{{ editForm.payState }}</span><el-divider direction="vertical"></el-divider><span>打印类型：{{ editForm.pagePrice}}</span>

        </div>
        <div style="width: 400px">
          <span>打印价格（元）：{{ editForm.orderPrice }}</span><el-divider direction="vertical"></el-divider><span>取货码：{{ editForm.pickCode }}</span>

        </div>
      </div>
      <el-divider><i class="el-icon-collection-tag"></i>
      </el-divider>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyPrint",
  data() {
    return {
      title: '订单详情',
      editFormVisible: false, //控制编辑页面显示与隐藏
      editForm:{
        id:'',
        orderId: '',
        orderState: '',
        pickCode: '',
        printFile: '',
        createTime: '',
        orderPrice: '',
        printRemark: '',
        pagePrice : '',
        payState:'',
      },
      tableData: [{
        id:'',
        orderId: '',
        orderState: '',
        pickCode: '',
        printFile: '',
        createTime: '',
        orderPrice: '',
        printRemark: '',
        pagePrice : '',
        payState:'',
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
      this.$http.post("http://localhost:8082/priorder/list",fomdata).then(res=>{
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
