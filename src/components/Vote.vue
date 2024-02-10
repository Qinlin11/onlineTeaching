<script setup>
import { ref, reactive, onMounted } from 'vue'
import { postActivitiesVoteCreate,getActivitiesVoteAll } from '@/apis/myhome'
import Edit from "@/components/edit.vue";
const tableData = ref([]);
const index = ref(1); // 初始序号
const open = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};
const dialogVisible = ref(false);
const formData = reactive({
  VoteName: "",
  startTime: "",
  endTime: "",
  description: "",
});

async function submitForm() {
  const formItem = {
    index: index.value++,
    time: new Date().toLocaleString(),
    more: "...",
    ...formData,
  };
  tableData.value.push(formItem);
  ElMessage({
    message: "表单提交成功",
  });
  // 关闭对话框
  dialogVisible.value = false;
  await postActivitiesVoteCreate(
    formData.VoteName,
    formData.startTime,
    formData.endTime,
    formData.description
  );
}
const data = ref([]);
const GetResource = async () => {
    const response = await getActivitiesVoteAll(31);
    data.value = response.data;
}

const searchTopic = ref('')


const deleteDocument = (tableData) => {
    console.log(tableData)
}

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
                            <input class="nav-search-input" placeholder="搜索" v-model="searchTopic"/>
                        </div>
                        <div class="search-svg">
                            <span class="icon iconfont icon-fenxiang"></span>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-item">
      <el-table
        :data="data"
        style="width: 100%; height: calc(100vh - 203px)"
      >
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="update_time" label="时间"></el-table-column>
        <el-table-column label="...">
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button
                  id="debtn"
                  class="button_size"
                  @click="deleteDocument(tableData)"
                  >删除</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty></el-empty>
        </template>
      </el-table>
    </div>
        <el-dialog title="新建投票" v-model="dialogVisible" class="form-container">
            <el-form ref="form" :model="formData" label-width="120px">
                <el-form-item label="命名">
                    <el-input v-model="formData.writeName" class="text_input" ></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="formData.startTime" type="datetime"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="formData.endTime" type="datetime"></el-date-picker>
                </el-form-item>
                <el-form-item label="描述">
                    <edit v-model="formData.description" class="editor" />
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
