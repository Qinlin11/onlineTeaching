<template>
   <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="subject"
        label="会议主题"
        width="720">
      </el-table-column>
      <el-table-column
        prop="nums"
        label="会议人数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="会议时间">
      </el-table-column>
    </el-table>
  
</template>

<script>
export default {
 data() {
        return {
          tableData: [{
            subject: '吃饭',
            nums:3,
            date: '2016-05-02'
          }]
        }
      }
}
</script>

<style>

</style>