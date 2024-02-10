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
            <el-table :data="tableData" style="width: 100%; height: calc(100vh - 203px);">
                <el-table-column prop="index" label="序号"></el-table-column>
                <el-table-column prop="time" label="时间"></el-table-column>
                <template #empty>
                    <el-empty></el-empty>
                </template>
            </el-table>
        </div>
        <el-dialog title="新建测试" v-model="dialogVisible" class="form-container">
            <el-form ref="form" :model="formData" label-width="120px">
                <el-form-item label="测试命名">
                    <el-input v-model="formData.testName" class="text_input"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="formData.startTime" type="datetime"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="formData.endTime" type="datetime"></el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-dropdown size="large" split-button type="primary">+添加题目

                        <template #dropdown>
                            <el-dropdown-menu>
                            <el-dropdown-item @click="addQuestion('multiple')">添加多选题</el-dropdown-item>
                            <el-dropdown-item @click="addQuestion('single')">添加单选题</el-dropdown-item>
                            <el-dropdown-item @click="addQuestion('trueFalse')">添加判断题</el-dropdown-item>
                            <el-dropdown-item @click="addQuestion('fillIn')">添加填空题</el-dropdown-item>
                            <el-dropdown-item @click="addQuestion('essay')">添加简答题</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-form-item>
                <el-form-item v-for="(question, index) in formData.questions" :key="index">
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="question.content" placeholder="题目内容" class="content"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="danger" @click="removeQuestion(index)">删除</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-switch v-model="question.required" active-text="必答" inactive-text=""></el-switch>
                        </el-col>
                    </el-row>
                    <el-row v-if="question.type === 'multiple' || question.type === 'single'">
                        <el-col :span="24">
                            <el-checkbox-group v-model="question.options">
                                <el-checkbox v-for="(option, optionIndex) in question.options" :key="optionIndex"
                                    :label="option">
                                    {{ option }}
                                </el-checkbox>
                            </el-checkbox-group>
                            <el-input v-model="question.newOption" placeholder="添加选项" class="addOption"></el-input>
                            <el-button type="text" @click="addOption(question)" class="addOption_btn">添加选项</el-button>
                        </el-col>
                    </el-row>
                    <el-row v-if="question.type === 'trueFalse'">
                        <el-col :span="24">
                            <el-radio-group v-model="question.answer" >
                                <el-radio label="true" class="question">正确</el-radio>
                                <el-radio label="false">错误</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row v-if="question.type === 'fillIn' || question.type === 'essay'">
                        <el-col :span="24">
                            <el-input v-model="question.answer" placeholder="答案"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <template v-slot:footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveForm">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([]);
let index = 1;

const dialogVisible = ref(false);
const formData = ref({
    testName: '',
    startTime: '',
    endTime: '',
    questions: []
});

function open() {
    dialogVisible.value = true;
}

function addQuestion(type) {
    const question = {
        type: type,
        content: '',
        options: [],
        answer: ''
    };
    formData.value.questions.push(question);
}

function removeQuestion(index) {
    formData.value.questions.splice(index, 1);
}

function saveForm() {
    const formItem = {
        index: index++,
        time: new Date().toLocaleString(),
        ...formData.value
    };
    tableData.value.push(formItem);
    console.log(formData.value);
    dialogVisible.value = false;
}

function addOption(question) {
    if (question.newOption) {
        question.options.push(question.newOption);
        question.newOption = '';
    }
}
</script>




<style lang="less" scoped>
.text_input{
    width:220px;
}
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
    background-color: #1076db;
}

.el-tabs__header {
    margin: 0;
}
.form-container {
  height: 100px;
  overflow: auto;
  color:#000000;
}
.addOption{
    width:300px;
    height: 40px;
    border-radius: 10px;
    padding-bottom:0%;
    background-color:#1076db;

}
.addOption_btn{
    background-color:#1076db;

}
.content{
    width:300px;
}
.question{
    left:20px;
}
</style>
