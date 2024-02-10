<template>
  <el-main>
    <div class="box">
      <div class="task-container">
        <div class="task-bar">
          <div class="task-item" v-for="task in tasks" :key="task.id" @click="showTaskDetails(task)">
            {{ task.name }}
          </div>
        </div>

        <div class="task-details">
          <div v-if="selectedTask">
            <h2>{{ selectedTask.name }}</h2>
            <p><strong>ID：</strong> {{ selectedTask.id }}</p>
            <p><strong>描述：</strong> {{ selectedTask.description }}</p>
            <p><strong>截止日期：</strong> {{ selectedTask.deadline }}</p>
            <p><strong>状态：</strong> {{ selectedTask.status }}</p>
          </div>
          <div v-else>
            选择任务以查看详细信息
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script setup>
import { ref } from 'vue';

const selectedTask = ref(null);

const tasks = ref([
  {
    id: 1,
    name: '任务 1',
    description: '完成项目计划和需求分析。',
    deadline: '2023-12-31',
    status: '进行中',
  },
  {
    id: 2,
    name: '任务 2',
    description: '设计并开发用户界面。',
    deadline: '2023-12-15',
    status: '未开始',
  },
  {
    id: 3,
    name: '任务 3',
    description: '修复应用程序中的Bug。',
    deadline: '2024-01-10',
    status: '已完成',
  },
  // ... 更多任务
]);

const showTaskDetails = (task) => {
  selectedTask.value = task;
};
</script>

<style scoped lang="less">
.box {
  width: 1000px;
  height: 500px;
  overflow: auto;
}

.task-container {
  display: flex;
  height: 100%;
}

.task-bar {
  width: 200px;
  background-color: #D3DCE6;
  padding: 10px;
  overflow-y: auto;
}

.task-item {
  cursor: pointer;
  margin-bottom: 10px;
}

.task-details {
  flex: 1;
  padding: 10px;
  background-color: #a8bace;
  overflow-y: auto;
  white-space: pre-wrap;
}

.task-details h2 {
  color: #333;
  margin-bottom: 10px;
}

.task-details p {
  margin: 5px 0;
}
</style>
