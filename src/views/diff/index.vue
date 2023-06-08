<template>
  <div class="app-container">
    <el-form ref="formData" :model="formData" :rules="rules">
      <el-row>
        <el-col :span="6">
          <el-form-item label="开始时间:" prop="start">
            <el-date-picker
              v-model="formData.start"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="5">
          <el-form-item label="结束时间" prop="end">
            <el-date-picker
              v-model="formData.end"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { dyTest } from '@/api/douyin'

export default {
  name: 'Index',
  data() {
    return {
      formData: {
        start: '',
        end: ''
      },
      rules: {
        start: [
          { required: true, message: '请选择开始时间日期', trigger: 'blur' }
        ],
        end: [
          { required: true, message: '请选择截止日期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          console.log('通过验证')
          dyTest(this.formData).then((response) => {
            console.log('请求返回的数据', response)
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    resetForm() {

    }
  }
}
</script>

<style scoped>

</style>
