<template>
    <div id="app">
      <div class="home">
    
        <el-container>
          <el-header style="background-color: #545c64;">
            <img src="@/assets/logo.png" style="width: 50px; height: 50px;position: relative; top:7px" alt="">
            <span style=" color: aliceblue; position: relative;top: -10px;left: 10px;font-size: 18px;">Vue管理系统</span>
          </el-header>
          <el-container>
            <el-aside style="background-color:#545c64; width:200px;min-height: 100vh; ">
              <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                
                <el-menu-item index="/">
                  <i class="el-icon-menu"></i>
                  <span slot="title">系统首页</span>
                </el-menu-item>
  
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/admin">管理员信息</el-menu-item>
                    <el-menu-item index="1-2">用户信息</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
  
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>信息管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">学生信息</el-menu-item>
                    <el-menu-item index="1-2">老师信息</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-aside>
            <el-main>
              <router-view />
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'layout',
  }
  </script>
  <style>
  .el-menu {
    border-right: none !important;
  }
  </style>