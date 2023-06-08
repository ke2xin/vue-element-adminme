<template>
  <div class="app-container">
    <el-form ref="formData" :model="formData" :rules="rules">
      <el-form-item label="请输入地址" prop="address">
        <el-input v-model="formData.address" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">智能解析</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      <el-form-item label="省份" label-width="120px" style="display: inline-block;">
        <el-input v-model="formData.province" style="width: 120px;" />
      </el-form-item>
      <el-form-item label="城市" label-width="120px" style="display: inline-block;">
        <el-input v-model="formData.city" style="width: 120px" />
      </el-form-item>
      <el-form-item label="区" label-width="120px" style="display: inline-block;">
        <el-input v-model="formData.region" style="width: 120px" />
      </el-form-item>
      <el-form-item label="街道" label-width="250px" style="display: inline-block;">
        <el-input v-model="formData.street" style="width: 220px;" />
      </el-form-item>
      <el-form-item label="姓名" label-width="120px" style="display: inline-block;">
        <el-input v-model="formData.name" style="width: 120px;" />
      </el-form-item>
      <el-form-item label="电话" label-width="120px" style="display: inline-block;">
        <el-input v-model="formData.mobile" style="width: 120px;" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addressResolution } from '@/api/address'

export default {
  name: 'Index',
  data() {
    return {
      formData: {
        address: '深圳市龙华区观澜樟坑径上围社区金倡达科技园i栋6楼，18503039400 袁嘉伟',
        province: '',
        city: '',
        region: '',
        street: '',
        name: '',
        mobile: ''
      },
      rules: {
        address: [
          { required: true, message: '地址是必须的', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          console.log('通过验证')
          addressResolution(this.formData).then((response) => {
            console.log(response)
            this.formData = Object.assign(this.formData, response.data)
            console.log(this.formData)
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    resetForm() {
      this.$refs.formData.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
