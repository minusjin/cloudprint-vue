<template>

<div>
  <!-- 搜索筛选 -->
  <el-form :inline="true" :model="formInline" ref="formInline" class="user-search" style="padding-left: 20%">
    <el-form-item label="" prop="RehearState">
      <el-select size="small" v-model="formInline.RehearState" placeholder="请选择审核状态">
        <el-option label="待审核" value="1"></el-option>
        <el-option label="审核通过" value="2"></el-option>
        <el-option label="审核未通过" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="" prop="Name">
      <el-input size="small" v-model="formInline.Name"  placeholder="输入文件名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
      <el-button size="small"   @click="resetForm('formInline')">重置</el-button>
    </el-form-item>
  </el-form>
  <!--列表-->
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="createTime"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      label="文件名"
      width="200">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.description }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      prop="type"
      label="类型" width="180">
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
          @click="handleEdit(scope.row)">编辑</el-button>
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
<!--修改模态框-->
  <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog()'>
    <el-form label-width="80px" ref="editForm" :model="editForm" >
      <el-form-item label="文件名称" prop="rehearRemark" style="width: 50%">
        <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入文件名称"></el-input>
      </el-form-item>
      <el-form-item label="文件类型" prop="rehearState">
        <el-select size="small" v-model="editForm.type" placeholder="请选择" style="width: 41%;" >
          <el-option label="考研" value="考研"></el-option>
          <el-option label="考试" value="考试"></el-option>
          <el-option label="求职" value="求职"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件简介" prop="rehearRemark" >
        <el-input type="textarea" :rows="2" placeholder="请输入文件简介" v-model="editForm.description"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click='closeDialog()'>取消</el-button>
      <el-button size="small" type="primary"  class="title" @click="saveInfo('editForm')">保存</el-button>
    </div>
  </el-dialog>
</div>


</template>


<script>
export default {
name: "MyFile",
  data(){
    return {
      title: '修改文件信息',
      editFormVisible: false, //控制编辑页面显示与隐藏
      editForm:{
        id:'',
        name:'',
        type:'',
        description:''
      },

      formInline: {
        Name: '',
        RehearState:'',
      },
      total:0,
      size: 4,
      pageNow: 1,
      tableData:[{
        createTime: '',
        name: '',
        description: '',
        type: '',
        cloudUrl:'',
        id:'',
        fileName:'',
        rehear:'',
        rehearRemark:'',
      }] ,
    }
  },
  methods:{
    handleEdit(value){
      this.editForm.id = value.id
      this.editForm.name = value.name
      this.editForm.type = value.type
      this.editForm.description = value.description
      this.editFormVisible = true;
    },
    closeDialog() {
      this.editFormVisible = false;
    },
    handleDelete(row) {
      let fomdata =new FormData();
      fomdata.append('fileId',row.id)
      this.$http.post("http://localhost:8082/sysfile/delFile",fomdata).then(res=>{
        if (res.data.code==200){
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          });
          this.getList();
        }
      })
    },
    //保存修改
    saveInfo(){
      let fomdata =new FormData();
      fomdata.append('fileId',this.editForm.id)
      fomdata.append('name',this.editForm.name)
      fomdata.append('type',this.editForm.type)
      fomdata.append('description',this.editForm.description)
      this.$http.post("http://localhost:8082/sysfile/uploadFile",fomdata).then(res=>{
        if (res.data.code==200){
          this.$message({
            showClose: true,
            message: '恭喜你'+res.data.msg,
            type: 'success'
          });
          this.getList();
          //关闭模态框
          this.closeDialog()

        }
      })
    },
    //表单重置
    resetForm(formInline) {
      this.$refs[formInline].resetFields();
      this.getList();
    },
    //处理分页
    findPage(page){
      this.formInline.pageNow = page
      this.getList();
      this.getTotal();
    },
    //获取总数
    getTotal(){
      let fomdata =new FormData();
      fomdata.append('size',this.size)
      fomdata.append('pageNow',this.pageNow)
      this.$http.post("http://localhost:8082/sysfile/getTotal",fomdata).then(res=>{
        this.total = res.data
      })
    },
    //获取列表
    getList(){
      let fomdata =new FormData();
      fomdata.append('rehearState',this.formInline.RehearState)
      fomdata.append('name',this.formInline.Name)
      fomdata.append('size',this.size)
      fomdata.append('pageNow',this.pageNow)
      this.$http.post("http://localhost:8082/sysfile/list",fomdata).then(res=>{
        this.tableData = res.data;

      })
    },
  },
  created() {
    this.getList();
    this.getTotal();
  }
}
</script>

<style  scoped>


</style>

