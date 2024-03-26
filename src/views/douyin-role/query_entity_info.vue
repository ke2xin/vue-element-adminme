<template>
  <div class="app-container upload-container">
    <div class="filter-container">
      <el-input v-model="listQuery.certificate_id" placeholder="证件ID" style="width: 200px" class="filter-item" />
      <el-input v-model="listQuery.app_id" placeholder="appID" style="width: 200px" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
  </div>
</template>

<script>
import { dyRoleEntityInfo } from '@/api/douyin'
import waves from '@/directive/waves'
export default {
  name: 'QueryEntity',
  directives: { waves },
  data() {
    return {
      listQuery: {
        certificate_id: '914401010881533344',
        app_id: 'tt535f25e2cc663d7b01'
      },
      rules: {
        app_id: [{ required: true, message: 'appid必须的', trigger: 'change' }]
      }
    }
  },

  methods: {
    getList() {
      dyRoleEntityInfo(this.listQuery).then(response => {
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
