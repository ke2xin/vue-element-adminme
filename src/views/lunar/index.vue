<template>
  <div class="app-container">
    <el-form ref="formData" :rules="rules" :model="date">
      <el-form-item label="请选择您的生日日期：" prop="d">
        <el-date-picker v-model="date.d" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">转换</el-button>
      </el-form-item>
    </el-form>
    <div>
      你的农历生日是：{{ date.d }}<br>
      你的新历生日是：
      <span v-if="newDate">{{ newDate[0] }}-{{ newDate[1] }}-{{ newDate[2] }}</span>
    </div>
  </div>
</template>

<script>
import { lunar } from '@/api/douyin'

export default {
  name: 'Index',
  data() {
    return {
      date: {
        d: ''
      },
      newDate: [],
      rules: {
        d: [
          { required: true, message: '请选择你的生日', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.date)
      var s = this.date.d.split('-')
      var fd = new FormData()
      fd.append('y', s[0])
      fd.append('m', s[1])
      fd.append('d', s[2])
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          lunar(fd).then((response) => {
            console.log(response)
            this.newDate = response.data
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
