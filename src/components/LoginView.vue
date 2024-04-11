<template>
    <div id="back-img">
     <div id="login-sty">
       <span id="wel-words">欢迎登录</span>
       <el-form  @keyup.enter.native="login('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
         <el-form-item label="用户名" prop="name">
           <el-input v-model="ruleForm.name"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="password">
           <el-input v-model="ruleForm.password"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button class="el-button" type="primary" @click="login('ruleForm')">登录</el-button>
           <el-button class="el-button" type="primary" @click="resetForm('ruleForm')">重置</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
 </template>
 <script>
 import Vue from 'vue';
 import request from '@/utils/request';
 export default Vue.extend({
   name: 'home',
   data() {
     return {
       ruleForm: {
         name: '',
         password: '',
 
       },
       /* 校验规则 */
       rules: {
        /* required: true 代表必须也就是不能为空的意思
              min: 1 最少输入一位
              在这个地方你还可以自由的去添加正则表达式去判断用户输入的格式
              是不是手机号 
           */
 
         name: [
           { required: true, message: '账户不能为空', trigger: 'blur' },
            {    
             required: true,
             pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
             message: '请输入正确的手机号码',
             trigger: 'blur',
           },
           { min: 1, message: '长度最少1个字符', trigger: 'blur' }
         ],
         password: [
           /* required: true 代表必须也就是不能为空的意思
              min: 1 最少输入一位
           */
           { required: true, message: '密码不能为空', trigger: 'blur' },
           { min: 1, message: '长度最少1个字符', trigger: 'blur' }
         ],
       }
     };
   },
   methods: {
       login(formName) {
         //判断是否满足规则
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post("/admin/login", this.ruleForm).then(res => {
                if(res.code === '0'){
                 //跳转页面
                  this.$router.push('/')
                  this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                }else{
                  this.$message.error(res.msg)
                }
            })
          } else {
            return false;
          }
        });
      },    resetForm(formName) {
       this.$refs[formName].resetFields();
     }
   }
 })
 </script>
 <style scoped>
 #back-img {
   background-image: url("../assets/login-1.jpeg");
   width: 100%;
   height: 100%;
   position: fixed;
   background-size: 100% 100%;
 }
 
 #login-sty {
   border: 1px solid;
   width: 400px;
   height: 270px;
   margin: 300px auto;
   /* 内边距 */
   padding-top: 40px;
   box-shadow: 10px 10px 10px 10px #7c7f84;
   /* 边框阴影 */
 }
 #login-sty .el-input {
   width: 230px;
 }
 #login-sty .el-button {
 
   width: 70px;
   height: 40px;
   font-size: 17px;
   margin-right: 50px;
 }
 #wel-words{
   text-align: center;
   display: block;
   width: 120px;
   height: 60px;
   margin: 0 auto;
   font-size: 27px;
   color: rgba(139, 149, 158, 0.763);
   font-weight: bold;
 }
 </style>
 