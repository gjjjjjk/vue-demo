<template>
  <el-button type="warning" @click="search">查询</el-button>
</template>


<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      name: '',
      phone: '',
      tableData: [
      ]
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    warning1() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        /* 发送请求之后执行then */
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    del() {
      this.$message.error("你真的删了???")
    },
    search() {
      //调用封装好的request访问后端controller中的接口
      request.get("/admin/search").then(res => { //then，发送请求之后要做什么 res=请求响应回来的数据
        if (res.code === '0') {
        //将查询的数据赋值给表格绑定的变量
          this.tableData = res.data
        } else {
        }
      })
    },
  },
  mounted() {  //vue当中很重要的钩子函数 //页面模板渲染完成的时候自动调用
    this.search()
  },
}

</script>



