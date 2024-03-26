<template>
  <div class="app-container upload-container">
    <div class="filter-container">
      <el-input v-model="listQuery.product_ids" placeholder="课程ID" style="width: 200px" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
  </div>
</template>

<script>
import { dyKcQuery } from '@/api/douyin'
import waves from '@/directive/waves'
export default {
  name: 'QueryKc',
  directives: { waves },
  data() {
    return {
      listQuery: {
        product_ids: '7182848770748497978'
      },
      rules: {
        product_ids: [{ required: true, message: '课程id必须的', trigger: 'change' }]
      }
    }
  },

  methods: {
    getList() {
      dyKcQuery(this.listQuery).then(response => {
        console.log('获取返回的数据')
        console.log(response)
        console.log(response.data)
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
