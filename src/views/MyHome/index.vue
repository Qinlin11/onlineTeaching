<script setup>
import { ref,onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSpace } from '@/apis/myhome'


const data = ref([]);
const GetSpace = async () => {
  const response = await getSpace();
  data.value = response.data;
}


const route = useRoute()

const isTeachingActivities = route.path === '/myhome/teaching'


onMounted(() => {
    GetSpace();
})

</script>

<template>
  <div class="my-home">
    <el-container>
      <div class="aside">
        <el-aside width="200px" style="height: 100%">
          <span class="title-span" style="">课件目录</span>
          <div class="catalog">
            <el-menu>
              <el-menu-item  v-for="i in data" :key="i.id">
                <span>第{{ i.directory_name }}课</span>
              </el-menu-item>
            </el-menu>
            <div class="add-catalog">
              <span>创建/导入目录</span>
            </div>
          </div>
        </el-aside>
      </div>
      <el-main style="padding: 0;">
        <div class="tabs">
          <el-menu class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/myhome">
              <template #title>
                <span>教案</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/myhome/tutorial">
              <template #title>
                <span>导学案</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/myhome/teaching">
              <template #title>
                <span>教学活动</span>
              </template>
            </el-menu-item>
            <el-menu-item v-if="!isTeachingActivities" index="/myhome/form">
              <template #title>
                <el-button type="primary" >+教案/导学案</el-button>
              </template>
            </el-menu-item>
          </el-menu>

        </div>
        <div>
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.my-home{
 border: 1px solid #797979;

  .aside {
   border-right: 1px solid #797979;
    min-height: 100vh;
    display: flex;


    .title-span {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #dcdfe6;
      height: 58px;
      color: #303133
    }
  }
 .catalog {
  display: flex;
  flex-direction: column;

  .add-catalog {
   width: 100%;
   height: 100%;
   flex: 1;
   display: flex;
   justify-content: center;
    span {
     text-align: center;
    }
  }
 }
  //el-main
  .tabs {
    .el-menu-demo {
      display: flex;
      justify-content: space-around;
    }
  }

}
</style>
