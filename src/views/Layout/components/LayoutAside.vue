<script setup>
import { Folder, Microphone, User } from '@element-plus/icons-vue'
</script>

<template>
    <div class="app-aside">
        <div class="taps">
            <el-menu default-active="1" style="height: 100%; width: 100%" router>
                <el-menu-item index="/Repository">
                    <template #title>
                        <el-icon>
                            <Folder/>
                        </el-icon>
                        <span>资源库</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/seminarcentre">
                    <template #title>
                        <el-icon>
                            <Microphone/>
                        </el-icon>
                        <span>研讨中心</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/myhome">
                    <template #title>
                        <el-icon>
                            <User/>
                        </el-icon>
                        <span>我的空间</span>
                    </template>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<style scoped lang="less">

.app-aside {
  display: flex;
  flex-direction: column;
  //align-items: center;
  min-height: 100vh;
  background-image: url("../../../assets/background.jpg");
  background-size: cover;

  .avatar {
    margin-left: 20px;
    height: 100px;
    display: flex;
    align-items: center;
  }

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
.el-menu-item {
    opacity: 0.8;
}

</style>
