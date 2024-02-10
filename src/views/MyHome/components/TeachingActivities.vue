<script setup>
import Homework from "@/components/Homework.vue";
import Vote from "@/components/Vote.vue"
import Writer from "@/components/Writer.vue";
import Forum from "@/components/Forum.vue";
import Textpast from "@/components/Textpast.vue";
import { ref } from 'vue';
const activeName = ref('first')

</script>

<template>
    <div class="tap-activity">
        <el-tabs class="demo-tabs" stretch v-model="activeName">
            <el-tab-pane label="作业" name="first">
                <Homework />
            </el-tab-pane>
            <el-tab-pane label="测试" name="second">
                <Textpast />
            </el-tab-pane>
            <el-tab-pane label="写作" name="third">
                <Writer />
            </el-tab-pane>
            <el-tab-pane label="讨论区" name="fourth">
                <Forum />
            </el-tab-pane>
            <el-tab-pane label="投票" name="fifth">
                <Vote />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="less">
    .tap-activity {
        display: flex;

        .demo-tabs {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            flex: 1;

            /deep/ .el-tabs__header {
                margin: 0;
            }
        }
    }


</style>
