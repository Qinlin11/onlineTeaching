<script lang='ts' setup>
const tableData = []
import { ElMessage, ElMessageBox } from 'element-plus'
import type{ Action } from 'element-plus/lib'

const open = () => {
    ElMessageBox.alert('This is a message', 'Title', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
            ElMessage({
                type: 'info',
                message: `action: ${action}`,
            })
        },
    })
}
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
            <el-table :data="tableData"  style="width: 100%; height: calc(100vh - 203px);" >
                <el-table-column prop="index" label="序号"></el-table-column>
                <el-table-column prop="time" label="时间"></el-table-column>
                <template #empty>
                    <el-empty></el-empty>
                </template>
            </el-table>
        </div>
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
.btn_new{
    background-color: #2c3e50;
}
 .el-tabs__header {
     margin: 0;
 }
</style>
