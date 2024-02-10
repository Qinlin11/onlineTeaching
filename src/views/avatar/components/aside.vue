<script setup>
import { Setting, User } from '@element-plus/icons-vue'
</script>

<template>
    <div class="avatar-aside">
        <div class="centered-container">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt="">
            <h3>管理员</h3>
        </div>
        <div class="taps">
            <el-menu default-active="1" style="height: 100%; width: 100%" router>
                <el-menu-item index="/UserInformation/administrator/">
                    <template #title>
                        <el-icon>
                            <Setting/>
                        </el-icon>
                        <span>控制面板</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/UserInformation/administrator/userControl">
                    <template #title>
                        <el-icon>
                            <user/>
                        </el-icon>
                        <span>用户管理</span>
                    </template>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<style scoped lang="less">
img{
    margin-top: 10px;
    width: 80px;
}
.avatar-aside {
  display: flex;
  flex-direction: column;
  //align-items: center;
    min-height:100vh;


  .taps {
    display: flex;
    justify-content: center;

    .demo-tabs {

      > .el-tabs__content {
        background-color: #151d28;
      }

    }
  }
}


.demo-tabs > .el-tabs__content {
  padding: 92px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
