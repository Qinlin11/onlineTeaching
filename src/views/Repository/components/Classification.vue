<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">教案</el-menu-item>
            <el-menu-item index="2">导学案</el-menu-item>
            <el-menu-item index="3">课件</el-menu-item>
            <el-menu-item index="4">试题</el-menu-item>
        </el-menu>
    </div>
    <el-scrollbar height="650px">
        <template v-if="repository.length !== 0">
            <div class="main">
                <div
                    class="card-box"
                    v-for="item in repository"
                    :key="item.id"
                >
                    <div class="header">
                        <span class="header-name">资源名称：{{ item.resource_name }}</span>
                        <el-button link type="danger" @click="deleteResource(item.id)">删除</el-button>
                    </div>
                    <div class="add">
                        <div class="add-button">
                            <div class="cross" @click="checkResource(item.id)">
                                <i class="iconfont" :class="getFileIcon(item.resource_type)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <el-empty description="description" />
        </template>
    </el-scrollbar>

    <el-dialog v-model="isFormVisible" @close="cancelEdit()" :width="700">
        <form v-if="isFormVisible" title="查看文档" @submit.prevent="submitForm" class="form">
            <label>
                <input class="input1" type="text" v-model="editDocument.editTitle" placeholder="请输入主题">
            </label><br/>
            <div class="content">
                <p id="editor" ref="editor"></p>
                <edit v-model="editDocument.editContent" class="editor" required/>
            </div>
            <el-button type="primary" plain class="concel" @click="cancelEdit()">取消</el-button>
        </form>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getResource_poolInfo, getResource_poolTypeAPI, resource_poolDeleteAPI } from "@/apis/user";
import Edit from "@/components/edit.vue";

const activeIndex = ref('1')
const handleSelect = async (key, keyPath) => {
    const res = await getResource_poolTypeAPI(key)
    repository.value = (res.data === '暂无资源~') ? [] : res.data;
}
const repository = ref([]);
const getResource_poolTypeData = async () => {
    const res = await getResource_poolTypeAPI()
    repository.value = res.data
}


const deleteResource = async (id) => {
    await resource_poolDeleteAPI(id)
    await getAllData();
    ElMessage({
        message: '删除成功',
        type: 'success'
    })
}

const isFormVisible = ref(false)
const editDocument = ref({
    id: '', //修改标题id
    editTitle: '', //修改标题
    editContent: '' //修改文章
})
//取消编辑
const cancelEdit = () => {
    isFormVisible.value = false;
    editDocument.value.editTitle = ''
    editDocument.value.editContent = ''
};

const checkResource = async (id) => {
    isFormVisible.value = true
    const res = await getResource_poolInfo(id)
    editDocument.value.id = res.data.id
    editDocument.value.editTitle = res.data.resource_name
    editDocument.value.editContent = res.data.content.content
}

const getFileIcon = (fileName) => {
    const iconMap = {
        1: "icon-beikejiaoan",
        2: "icon-xiaoneifawen",
        3: "icon-kejian-01",
        4: "icon-monikaoshi",
        // 添加更多文件类型的映射
    };
    return iconMap[fileName] || "icon-ziyuan";
};

onMounted(() => {
    getResource_poolTypeData()
})

</script>

<style scoped lang="less">
.main {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 一行4列，每列平分剩余空间 */
  grid-gap: 5px;

  /* 列与列之间的间距 */

  .card-box {
    width: 200px;
    height: 200px;
    border: 1px solid #999;
    border-radius: 10px;
    margin: 10px 0 0 10px;
    box-shadow: 5px 5px 5px #f0f0f0, /* 右下角阴影 */
      -5px -5px 5px #f0f0f0, /* 左上角阴影 */ -5px 5px 5px #f0f0f0, /* 左下角阴影 */
      5px -5px 5px #f0f0f0; /* 右上角阴影 */

    .header {
      width: 100%;
      height: 24px;
      display: flex;
      justify-content: space-between;
    }

    .add {
      width: 100%;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;

      .add-button {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;

        .cross {
          position: relative;
          width: 100%;
          height: 100%;

          i {
            font-size: 48px;
          }
        }
      }
    }

    &.hover {
      /* 添加鼠标悬停效果 */
      transition: transform 0.3s ease-in-out;
      transform: scale(1.05);
    }
  }

  /* 添加动画 */

  .card-box {
    animation: card-box-anim 0.6s forwards ease-out;
    opacity: 0;
    animation-delay: calc(var(--index) * 0.06s);
  }

  @keyframes card-box-anim {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .card-box:hover {
    &.hover {
      transform: scale(1.05);
    }
  }
}


.form {
    position: absolute;
    margin-left: -20px;
    margin-top: -23px;
    width: 700px;
    height: 550px;
    background: #F2F2F2;
}

.button_size {
    color: #000000;
    background-color: aqua;
}

.input1 {
    margin-left: 20px;
    margin-top: 20px;
    width: 300px;
    height: 22px;
}

.editor {
    width: 650px;
    margin-left: 20px;
    margin-top: 20px;
    color: #000000;
}

.submit {
    width: 65px;
    height: 30px;
    margin-left: 600px;
    margin-top: 10px;
}

.concel {
    width: 65px;
    height: 30px;
    margin-left: 590px;
    margin-top: 10px;
}

.submit1 {
    width: 65px;
    height: 30px;
    margin-left: 50px;
    margin-top: 10px;
}

.el-dropdown-link {
    width: 5px;
    height: 2px;
    margin-left: 10px;
}
</style>
