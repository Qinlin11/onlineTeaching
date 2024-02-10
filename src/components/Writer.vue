<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getActivitiesWritingAll, postActivitiesWritingCreate, writingDeleteAPi } from '@/apis/myhome'
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
    writeType: '',
    description: '',
});

const writingData = ref([]);
const GetAall = async () => {
    const response = await getActivitiesWritingAll(31);
    writingData.value = response.data;
}

const submitForm = async () => {
    const { writeName, startTime, endTime, writeType, description } = formData;
    await postActivitiesWritingCreate(writeName,writeType,startTime,endTime,description)
    await GetAall()

    ElMessage({
        message:'创建成功',
        type: 'success'
    })
}
const deleteDocument = async (id) => {
    await writingDeleteAPi(id)
    await GetAall()
    ElMessage({
        message:'删除成功',
        type: 'success'
    })
}

onMounted(() => {
    GetAall()
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
        <div class="table-item">
            <el-row :gutter="24" class="a" v-for="writing in writingData" :key="writing.id">
                <div class="document-box">
                    <el-col :span="6">
                        <span>文章标题：{{ writing.writing_name }}</span>
                    </el-col>
                    <el-col :span="12">
                        <span>更新时间： {{ writing.create_time }}</span>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="updateDocument(writing.id)">修改</el-button>
                        <el-button id="debtn" type="danger"  @click="deleteDocument(writing.id)">删除
                        </el-button>
                    </el-col>
                </div>
            </el-row>
        </div>
        <el-dialog title="新建写作" v-model="dialogVisible" class="form-container">
            <el-form ref="form" :model="formData" label-width="120px">
                <el-form-item label="命名">
                    <el-input v-model="formData.writeName" class="text_input"></el-input>
                </el-form-item>
                <el-form-item label="写作类型">
                    <el-input v-model="formData.writeType" class="text_input"></el-input>
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
