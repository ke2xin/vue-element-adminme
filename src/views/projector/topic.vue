<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="temp">
      <el-form-item label="设备uuid" prop="uuid">
        <el-input v-model="temp.uuid" />
      </el-form-item>
      <el-form-item label="主题" prop="topic">
        <el-input v-model="temp.topic" />
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="temp.url" />
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUuid, publ } from '@/api/projector'

export default {
  name: 'Topic',
  data() {
    return {
      temp: {
        uuid: '',
        topic: 'apptest/ckz',
        url: 'https://slpos.kosm.com.cn/ypps/ps/ckz/happy/test10.mp4'
      },
      rules: {
        uuid: [{ required: true, message: '设备id是必须的', trigger: 'blur' }],
        topic: [{ required: true, message: '订阅主题是必须的', trigger: 'blur' }],
        url: [{ required: true, message: '地址是必须的', trigger: 'blur' }]
      }
    }
  },
  created() {
    getUuid({}).then((response) => {
      console.log('获取uuid')
      console.log('成功获取到')
      console.log(response)
      const tempuuid = response.data.uuid
      this.temp.uuid = tempuuid
      this.temp.topic = this.temp.topic + '/' + tempuuid
    })
  },
  methods: {
    onSubmit() {
      console.log('你点击了提交')
      this.$refs['dataForm'].validate((valid) => {
        console.log('通过了吗？')
        console.log(valid)
        if (valid) {
          console.log('通过了')
          publ(this.temp).then((response) => {
            console.log('提交返回的数据')
            console.log(response)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
