<template>
  <div class="app-container upload-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="appid" label="appid" width="180" />
        <el-table-column prop="industry_code" label="行业代码" />
        <el-table-column prop="industry_role" label="角色类型" />
        <el-table-column prop="role_id" label="角色id" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { dyRoleGetBindList } from '@/api/douyin'
import waves from '@/directive/waves'
export default {
  name: 'GetBindList',
  directives: { waves },
  data() {
    return {
      tableData: []
    }
  },

  methods: {
    getList() {
      dyRoleGetBindList({}).then(response => {
        console.log('获取返回的数据')
        console.log(response)
        const json = JSON.parse(response.data)
        console.log(json)
        this.tableData = json.bind_info_list
      })
    },
    handleFilter() {
      this.getList()
    }
  }
}
</script>

<style scoped>
</style>
