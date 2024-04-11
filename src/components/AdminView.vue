<template>
    <div>
    <div class="about">
      <!-- vue的两大核心   v-model双向绑定 组件化
      页面上面用到的元素绑定的值或者变量一定要在data中定义
      -->
      <el-input style="width:20%;margin-right:10px" 
      placeholder="请输入用户名" v-model="username" clearable></el-input>
      <el-button type="warning" @click="search">查询</el-button>
      <el-button type="info" @click="reSearch">重置</el-button>
      <el-button type="primary">添加</el-button>
      <el-button type="primary" @click="clearInput">清空</el-button>

  
      <el-table :data="tableData" stripe style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="tel" label="电话" width="180"></el-table-column>
        <el-table-column prop="password" label="密码" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop label="操作">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  <div class="search">
      <!-- @keyup.enter.native 为当前元素绑定回车确认事件 -->
      <el-input style="width: 200px;margin-right: 10px;" @keyup.enter.native="search()" v-model="params.name" placeholder="请输入姓名"></el-input>
      <el-input style="width: 200px;margin-right: 10px;" @keyup.enter.native="search()" v-model="params.phone" placeholder="请输入电话"></el-input>
      <el-button type="warning"  @click="selectUserBySearch()">查询</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
</div>
</template>

<script>
import request from '@/utils/request'

export default {
  methods: {
    search() {
         this.$message.warning("你点了查询方法");
      //调用封装好的request访问后端controller中的接口
      request.get("/admin/search",{params:this.params}).then(res => { //then，发送请求之后要做什么 res=请求响应回来的数据
        if (res.code === '0') {
        //将查询的数据赋值给表格绑定的变量
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
            this.$message.error("操作失败,请联系管理员")
        }
      })
    },

    //清空输入框
    clearInput(){
      this.params.name = '',
      this.params.phone = ''
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize
      this.search()
    },
    handleCurrentChange(pageNum) {
      this.params.pageNum = pageNum
      this.search()
    },
  },
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        username: "",
        tel: "",
        password: "",
        address: "",
        id: ""
      },
      total: 0,
      currentSize: 5,
      currentPage4: 1,
      pageSize: 5,
      pageNum: 1,
      username: "",
      tableData: []
    };
  },
  mounted(){
    //在加载页面时就会自动执行里面的代码
    this.search()
  }
};
</script>

<style>
.el-table .warning-row {
  background: orange;
}

.el-table .success-row {
  background: orange;
}
</style>









<script>
import request from '@/utils/request'

export default {
  methods: {
    search(){
      //发送请求访问后端接口
      const params={
        username:this.username
      }
      request.get('/admin/list',{params:params}).then(res=>{
        console.log(res)
        this.tableData=res.data
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  },
  data() {
    return {
        /* 定义一个数组用于存放表格的数据 */
        tableData: [],
        /* 用于用户搜索输入框 */
        params: {
            name: '',
            phone: ''},
      currentPage4:1,
      usernmae: "",
      tableData: [
      ]
    };
  },
  mounted(){
    //在加载页面时就会自动执行里面的代码
    this.search()
  }
};
</script>

<style>
.el-table .warning-row {
  background: orange;
}

.el-table .success-row {
  background: orange;
}
</style>
  