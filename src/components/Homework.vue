<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getActivitiesAssignmentAll, getActivitiesAssignmentDelete, postActivitiesAssignmentCreate } from '@/apis/myhome'
import Edit from "@/components/edit.vue";


const open = () => {
    dialogVisible.value = true;
}

const closeDialog = () => {
    dialogVisible.value = false;
}
const dialogVisible = ref(false);
const formData = reactive({
    writeName: '',
    startTime: '',
    endTime: '',
    description: '',
});

const resourceData = ref([]);
const GetResource = async () => {
  const response = await getActivitiesAssignmentAll(31);
    resourceData.value = response.data;
}

const submitForm = async () => {
    const { writeName, startTime, endTime, description } = formData;
    await postActivitiesAssignmentCreate(writeName,startTime,endTime,description)
    await GetResource();
    dialogVisible.value = false
    ElMessage({
        message: '创建成功',
        type: 'success'
    })
}

const deleteDocument = async (id) => {
    await getActivitiesAssignmentDelete(id)
    await GetResource();
    ElMessage({
        message: '删除成功',
        type: 'success'
    })

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
                            <input class="nav-search-input" placeholder="搜索" />
                        </div>
                        <div class="search-svg">
                            <span class="icon iconfont icon-fenxiang"></span>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <el-row class="row" v-for="resource in resourceData" :key="resource.id">
            <div class="document-box">
                <el-col :span="6">{{ resource.assignment_name }}</el-col>
                <el-col :span="12">{{ resource.assignment_name }}</el-col>
                <el-col :span="6">
                    <div class="grid-content ep-bg-purple"/>
                    <el-button type="primary" @click="updateDocument(resource.id)">修改</el-button>
                    <el-button id="debtn" type="danger" @click="deleteDocument(resource.id)">删除</el-button>
                </el-col>
            </div>
        </el-row>
        <el-dialog title="新建作业" v-model="dialogVisible" class="form-container">
            <el-form ref="form" :model="formData" label-width="120px">
                <el-form-item label="命名">
                    <el-input v-model="formData.writeName" class="text_input"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="formData.startTime" value-format="YYYY-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="formData.endTime" value-format="YYYY-MM-DD"></el-date-picker>
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

.document-box {
  display: flex;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果，根据需要调整参数 */
  padding: 10px; /* 根据需要调整内边距 */
  border-radius: 5px; /* 根据需要调整边框圆角 */
  margin-bottom: 10px; /* 根据需要调整底部间距 */
  width: 100%;
}

</style>
