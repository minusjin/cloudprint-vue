<template>
  <div class="main-print">
    <el-steps :active="active">
      <el-step title="上传文件" icon="el-icon-upload"></el-step>
      <el-step title="打印设置" icon="el-icon-edit"></el-step>
      <el-step title="打印支付" icon="el-icon-bank-card"></el-step>
    </el-steps>
    <div class="main-one" v-show="oneShow">
      <div class="upload-box">
        <el-upload :on-success="fileSuccess"
                   class="upload-demo"
                   ref="upload"
                   :auto-upload="false"
                   drag
                   action="http://localhost:8082/upload/uploadFile"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

        </el-upload>
        <el-button style="margin:10px 0 0 23%;" size="small" type="primary" icon="el-icon-upload"  @click="submitUpload">上传文件</el-button>
      </div>
    </div>
    <div class="main-two" v-show="twoShow">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="打印模式" prop="page">
          <el-radio-group v-model="ruleForm.page">
            <el-radio label="单面"></el-radio>
            <el-radio label="双面"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="打印颜色" prop="pageType">
          <el-radio-group v-model="ruleForm.pageType">
            <el-radio label="黑白"></el-radio>
            <el-radio label="彩色"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="打印页数" prop="printPiece">
          <el-input-number size="small" v-model="ruleForm.printPiece" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
      <el-form-item label="打印尺寸" prop="pageSize">
        <el-radio-group v-model="ruleForm.pageSize">
          <el-radio label="A4"></el-radio>
          <el-radio label="A3"></el-radio>
        </el-radio-group>
      </el-form-item>
        <el-form-item label="打印数量" prop="printCount">
          <el-input-number size="small" v-model="ruleForm.printCount" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
      <el-form-item label="打印备注" style="padding-right: 40%" prop="printRemark">
        <el-input type="textarea" v-model="ruleForm.printRemark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div class="main-three" v-show="threeShow">
      <div>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="orderId"
              label="打印订单号"
              width="170">
            </el-table-column>
            <el-table-column label="云打印订单">
              <el-table-column
                prop="printFile"
                label="文件名"
                width="120">
              </el-table-column>
              <el-table-column label="文件信息">
                <el-table-column
                  prop="printCount"
                  label="打印份数"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="page"
                  label="打印模式"
                  width="100">
                </el-table-column>

                <el-table-column
                  prop="pageType"
                  label="打印颜色"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="pageSize"
                  label="打印尺寸"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="orderPrice"
                  label="费用"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="printRemark"
                  label="打印备注"
                  width="350">
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" style="margin-top: 20px">
            <el-form-item label="支付方式">
              <el-radio-group v-model="sizeForm.payType" size="medium">
                <el-radio border label="线上支付" ></el-radio>
                <el-radio border label="店内支付" ></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item size="large" >
              <el-button type="primary" @click="onSubmit">立即提交</el-button>
            </el-form-item>
          </el-form>
        </template>
      </div>

    </div>
  </div>



</template>


<script>
export default {
  name: "Explain",
  data(){
    return{
      oneShow:true,
      twoShow:false,
      threeShow:false,
      active:1,
      ruleForm: {
        printFile: '',
        cloudUrl:'',
        page: '',
        pageType: '',
        pageSize: '',
        printCount: 1,
        printPiece: 1,
        printRemark: '',
      },
      tableData: [{
        orderId: '',
        printFile: '',
        printCount: '',
        page: '',
        pageType: '',
        pageSize: '',
        printRemark: '',
        cost: '',
        orderPrice:''
      }],
      sizeForm:{
        orderId:'',
        payType: '',
      },
      rules: {
        page: [
          { required: true, message: '请填写打印模式', trigger: 'blur' }
        ],
        pageType: [
          { required: true, message: '请填写打印颜色', trigger: 'blur' }
        ],
        pageSize: [
          { required: true, message: '请填写打印尺寸', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    //确认订单
    onSubmit() {
      if(this.sizeForm.payType=="线上支付"){
        console.log("success")
      }else {
        console.log(this.sizeForm.orderId)
        let fomdata =new FormData();
        fomdata.append('orderId',this.sizeForm.orderId)
        fomdata.append('payType',this.sizeForm.payType)
        this.$http.post("/priorder/savePayType",fomdata).then(res=>{
          if (res.data.code==200){
            this.$message({
              showClose: true,
              message: '打印订单已下单',
              type: 'success'
            });
            //跳转页面
            this.$router.push("/center/centers")
          }
        })
      }
    },

    //获取生成订单信息
    getLsit(value){
      this.sizeForm.orderId=value
      let fomdata =new FormData();
      fomdata.append('orderId',value)
      this.$http.post("/priorder/getPrintOrder",fomdata).then(res=>{
        this.tableData = res.data
      })
    },
    //文件上传成功返回
    fileSuccess(response, file){
      this.ruleForm.printFile = file.name;
      this.ruleForm.cloudUrl = response;
      this.$message({
        showClose: true,
        message: '恭喜你上传文件成功',
        type: 'success'
      });
      this.active=2
      this.oneShow=false
      this.twoShow=true
      this.threeShow=false
    },
    //文件上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleChange(value) {
      console.log(value);
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交订单
    submitForm(formName) {
      let fomdata =new FormData();
      fomdata.append('printFile',this.ruleForm.printFile)
      fomdata.append('cloudUrl',this.ruleForm.cloudUrl)
      fomdata.append('page',this.ruleForm.page)
      fomdata.append('pageType',this.ruleForm.pageType)
      fomdata.append('pageSize',this.ruleForm.pageSize)
      fomdata.append('printCount',this.ruleForm.printCount)
      fomdata.append('printPiece',this.ruleForm.printPiece)
      fomdata.append('printRemark',this.ruleForm.printRemark)
      fomdata.append('customerId',this.$cookies.get("cookieUserId"))
      this.$http.post("/priorder/savePrintOrder",fomdata).then(res=>{
        if (res.data.code==200){
          this.$message({
            showClose: true,
            message: '恭喜你'+res.data.msg,
            type: 'success'
          });
          //清空表单
          this.active=3
          this.oneShow=false
          this.twoShow=false
          this.threeShow=true
          this.getLsit(res.data.data)
        }else {
          this.$message({
            showClose: true,
            message: '订单提交失败',
            type: 'error'
          });
        }
      })
    },

  },
  created() {
    //this.getLsit("E20201226112056514");
  }
}
</script>

<style  scoped>
.main-print{
  margin: 10px 20% 0 20%;

}
.main-one{
  margin: 20px 20% 0 23%;
}
.main-two{
  margin: 10px 100px 0 100px;
  padding-left: 25%;
}
.upload-box{
  margin: 0 0 30px 100px;
}

</style>

