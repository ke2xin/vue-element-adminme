<template>
  <div class="app-container upload-container">
    <div class="filter-container">
      <el-select v-model="listQuery.auth_type" class="filter-item" placeholder="请选择">
        <el-option v-for="item in auth_type_arr" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.auth_taskid" placeholder="审核任务ID" style="width: 200px" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-table :data="tableData" row-key="index" border style="width: 100%;margin-bottom: 20px;">
        <el-table-column label="拒绝原因" prop="audit_reason" sortable width="180" />
        <el-table-column label="状态" prop="audit_status" sortable width="180" />
        <el-table-column label="任务审核id" prop="audit_taskid" width="180" />
        <el-table-column label="有效期" prop="expire_time" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { dyRoleGetAuditDetail } from '@/api/douyin'
import waves from '@/directive/waves'
export default {
  name: 'GetAuditDetail',
  directives: { waves },
  data() {
    return {
      auth_type_arr: [
        {
          value: 1,
          label: '基础认证 '
        },
        {
          value: 2,
          label: '类目认证 '
        },
        {
          value: 3,
          label: '授权函认证 '
        }
      ],
      listQuery: {
        auth_type: 1,
        auth_taskid: 'QUA202211281829303783311363'
      },
      tableData: [],
      rules: {
        auth_taskid: [{ required: true, message: '实体id必须的', trigger: 'change' }]
      }
    }
  },

  methods: {
    getList() {
      dyRoleGetAuditDetail(this.listQuery).then(response => {
        console.log('获取返回的数据')
        console.log(response)
        const json = JSON.parse(response.data)
        console.log(json)
        this.tableData = json.qualifications
        console.log(this.tableData)
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
