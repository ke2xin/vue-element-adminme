<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item label="资源类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择资源类型">
          <el-option value="1" label="商品详情图（jpeg、jpg、png）" />
          <el-option value="2" label="商品视频履约内容（mp4、mpeg、mov）" />
          <el-option value="3" label="商品音频履约内容（mp3、wav、m4a）" />
          <el-option value="4" label="商品图片履约内容（jpeg、jpg、png）" />
          <el-option value="100" label="商品其他履约内容" />
          <el-option value="21" label="老师身份证照片（jpeg、jpg、png）" />
          <el-option value="22" label="机构法人身份证照片（jpeg、jpg、png）" />
          <el-option value="23" label="老师资质照片（jpeg、jpg、png）" />
          <el-option value="24" label="机构资质照片（jpeg、jpg、png）" />
          <el-option value="25" label="机构logo照片（jpeg、jpg、png）" />
          <el-option value="31" label="课程展示图片（jpeg、jpg、png）" />
          <el-option value="32" label="老师展示图片（jpeg、jpg、png）" />
          <el-option value="33" label="机构展示图片（jpeg、jpg、png）" />
        </el-select>
      </el-form-item>
      <el-form-item label="资源" prop="url">
        <el-upload
          v-model="ruleForm.url"
          drag
          class="upload-demo"
          action="https://slpos.kosm.com.cn/ypps/ps/ckz/douyinkc/dy_upload_file.php"
          :on-success="videoOnSuccess"
          :on-error="videoOnError"
          :limit="1"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text"><em>点击上传</em></div>
          <div class="el-upload__tip">请不要上传太大的文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="dyResult.err_no===0">
      <el-alert :title="dyResult.err_message" type="success" :closable="false" :description="dyResult.data.resource_uri" />
      <el-button @click="handleCopy(dyResult.data.resource_uri,$event)">复制</el-button>
    </div>
    <div v-show="displayShow">
      <el-alert :title="dyResult.err_message" type="error" />
    </div>
  </div>
</template>

<script>
import { dyUploadResource } from '@/api/douyin'
import clip from '@/utils/clipboard'

export default {
  name: 'Index',
  data() {
    return {
      ruleForm: {
        type: '',
        url: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择资源类型', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请上传资源', trigger: 'blur' }
        ]
      },
      displayShow: false,
      dyResult: {
        err_no: undefined,
        err_message: '',
        data: {
          resource_uri: undefined
        }
      }
    }
  },
  methods: {
    videoOnSuccess(response) {
      console.log('上传视频成功回调')
      console.log(response)
      this.ruleForm.url = response.data.url
      this.$notify({
        message: '成功',
        type: 'success',
        duration: 2000
      })
    },
    videoOnError(err) {
      console.log('上传视频失败回调')
      console.log(err)
      this.$notify({
        message: '错误',
        type: 'error',
        duration: 2000
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning('当前限制选择1个文件')
    },
    beforeRemove(file, fileList) {
      this.ruleForm.url = ''
      return this.$confirm(`确定移除${file.name}？`)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('验证通过', this.ruleForm)
          dyUploadResource(this.ruleForm).then((response) => {
            console.log('提交返回的数据')
            console.log(response)
            this.dyResult = JSON.parse(response.data)
            if (response.data.err_no !== 0) {
              this.displayShow = false
              console.log(this.dyResult)
            }
          })
        } else {
          console.log('验证势必')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleCopy(text, event) {
      clip(text, event)
    }
  }
}
</script>

<style scoped>

</style>
