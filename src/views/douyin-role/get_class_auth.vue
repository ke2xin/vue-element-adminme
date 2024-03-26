<template>
  <div class="app-container upload-container">
    <div class="filter-container">
      <el-input v-model="listQuery.merchant_entity_id" placeholder="实体ID" style="width: 200px" class="filter-item" />
      <el-select v-model="listQuery.industry_role" placeholder="请选择" class="filter-item">
        <el-option v-for="item in industry_role_arr" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
  </div>
</template>

<script>
import { dyRoleGetClassAuth } from '@/api/douyin'
import waves from '@/directive/waves'
export default {
  name: 'GetClassAuth',
  directives: { waves },
  data() {
    return {
      industry_role_arr: [
        {
          value: 1,
          label: '老师'
        },
        {
          value: 2,
          label: '机构'
        },
        {
          value: 3,
          label: '服务商'
        }
      ],
      listQuery: {
        merchant_entity_id: 'I7170969438722736139',
        industry_code: 10000,
        industry_role: undefined
      },
      rules: {
        entity_id: [{ required: true, message: '实体id必须的', trigger: 'change' }]
      }
    }
  },

  methods: {
    getList() {
      dyRoleGetClassAuth(this.listQuery).then(response => {
        console.log('获取返回的数据')
        console.log(response)
        const json = JSON.parse(response.data)
        console.log(json)
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
