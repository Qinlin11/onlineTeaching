<script setup>
import AsideCononent from "@/views/avatar/components/aside.vue";
import HeaderCononent from "@/views/avatar/components/header.vue";
</script>

<template>
    <div class="common-layout" style="margin: 0; padding: 0">
        <el-container>
            <el-aside width="200px">
                <AsideCononent />
            </el-aside>
            <el-container>
                <el-header>
                    <HeaderCononent/>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="less">
.common-layout {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 50px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 30px;
  }
  .el-container{
    height: 100vh;
  }

</style>
