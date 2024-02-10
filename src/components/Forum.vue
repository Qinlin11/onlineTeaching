<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ArrowDown } from "@element-plus/icons-vue";
import { getActivitiesDisussAll, getActivitiesDisussDelete, postActivitiesDisussCreate, } from '@/apis/myhome'
import Edit from "@/components/edit.vue";

const open = () => {
    dialogVisible.value = true;
};
const closeDialog = () => {
    dialogVisible.value = false;
};
//实例化对象
const tableData = ref([]);
//默认表单关闭
const dialogVisible = ref(false);
//实例化参数：讨论名称，讨论内容
const formData = reactive({
    forumName: "",
    content: "",
    description: ''
});

//提交和创建新讨论
async function submitForm() {
    const formItem = {
        update_time: new Date().toLocaleString(),
        more: "...",
        ...formData,
    };

    tableData.value.push(formItem);
    ElMessage({
        message: "表单提交成功",
    });
    // 关闭对话框
    dialogVisible.value = false;
    await postActivitiesDisussCreate(formData.forumName, formData.content);
}

const data = ref([]);
const GetResource = async () => {
    const response = await getActivitiesDisussAll(31);
    data.value = response.data;
}

const deleteDocument = async (row) => {
    await getActivitiesDisussDelete(row.id);
    await GetResource();
    ElMessage({ type: "success", message: "删除成功" });
};
onMounted(() => {
    GetResource();
})
</script>
<template>
    <div class="taps-item">
        <div class="item">
            <el-form size="large" style="display: flex; justify-content: space-between; margin: 0 45px">
                <el-form-item>
                    <el-button text @click="open" class="btn_new">新建</el-button>
                </el-form-item>
                <el-form-item style="display: flex; align-items: center">
                    <div class="search-item">
                        <div class="search-input">
                            <input class="nav-search-input" placeholder="搜索"/>
                        </div>
                        <div class="search-svg">
                            <span class="icon iconfont icon-fenxiang"></span>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-item">
            <el-scrollbar height="560px">
                <el-table :data="data" style="width: 100%; height: calc(100vh - 203px)">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="update_time" label="时间"></el-table-column>
                    <el-table-column label="...">
                        <template #default="{ row }">
                            <el-dropdown>
                            <span class="el-dropdown-link">
                              ...
                              <el-icon><ArrowDown/></el-icon>
                            </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <el-button type="primary" @click="deleteDocument(row)">删除</el-button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <el-button type="primary" @click="updateDocument(row)">修改</el-button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </template>
                    </el-table-column>

                    <template #empty>
                        <el-empty></el-empty>
                    </template>
                </el-table>
            </el-scrollbar>
        </div>
        <el-dialog title="新建讨论" v-model="dialogVisible" class="form-container">
            <el-form ref="form" :model="formData" label-width="120px">
                <el-form-item label="输入标题">
                    <el-input v-model="formData.writeName" class="text_input"></el-input>
                </el-form-item>
                <el-form-item label="输入内容">
                    <edit v-model="formData.description" class="editor"/>
                </el-form-item>
                <el-button type="primary" class="btn_submit" @click="submitForm">发布</el-button>
                <el-button class="btn_cancel" @click="closeDialog">取消</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<style lang="less" scoped>
.taps-item {

  .item {
    border-bottom: 1px solid #1076db;
    //display: flex;

    .el-form-item {
      margin: 0;
    }
  }

  .search-item {

    display: flex;
    align-items: center;
    border: 2px solid #f1f2f3;
    background-color: #f1f2f3;
    width: 120%;
    border-radius: 6px;
    height: 40px;


    .search-input {
      list-style: none;
      //opacity: 0;
      display: flex;
      align-items: center;


      .nav-search-input {
        flex: 1;
        border: none;
        box-shadow: none;
        background-color: transparent;
        overflow: hidden;
        outline: none;
        line-height: 25px;
        font-size: 16px;
      }

      .nav-search-input:focus {
        //color: red;
        background-color: #ffffff;
        border-radius: 6px;
      }
    }

    .search-svg {
      display: flex;
      align-items: center;
      //text-align: center;
      width: 35px;
      height: 35px;
      padding: 0 7px;

      span {
        align-items: center;
        width: 100%;
        height: 100%;

      }
    }
  }
}

.btn_new {
  background-color: #2c3e50;
}

.el-tabs__header {
  margin: 0;
}

.btn_submit {
  position: absolute;
  right: 50px;
  bottom: 10px;
}
</style>
