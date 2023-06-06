<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="dataForm" :rules="rules" :model="data">
        <el-form-item prop="uri">
          <el-input v-model="data.uri" placeholder="请输入课程的uri" style="width: 250px" class="filter-item" />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { dyQueryResourceStatus } from '@/api/douyin'

export default {
  name: 'Searchkc',
  directives: { waves },
  data() {
    return {
      data: {
        uri: ''
      },
      rules: {
        uri: [
          { required: true, message: 'uri是必须的', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleFilter() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const that = this
          dyQueryResourceStatus(this.data).then((response) => {
            console.log('提交返回的数据', response)
            const result = JSON.parse(response.data)
            if (result.err_no === 0) {
              const status = that.statusFilter(result.data.status)
              console.log(status)
              this.$alert(result.data.resource_uri, status, {
                confirmButtonText: '确定'
              })
            }
          })
        }
      })
    },
    statusFilter(status) {
      const statusMap = {
        1: '上传中',
        2: '上传成功',
        3: '上传失败'
      }
      return statusMap[status]
    }
  }
}
</script>

<style scoped>

</style>
