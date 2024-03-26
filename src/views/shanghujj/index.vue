<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item label="上传的文件类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择文件类型">
          <el-option value="PAYMENT_AGREEMENT_PIC" label="支付协议" />
          <el-option value="SOCIAL_CREDIT_CODE_PIC" label="营业执照图片" />
          <el-option value="ID_CARD_FRONT_PIC" label="法人身份证正面" />
          <el-option value="ID_CARD_BACK_PIC" label="法人身份证反面" />
        </el-select>
      </el-form-item>
      <el-form-item label="请选择文件" prop="file">
        <el-upload
          ref="pictureUpload"
          v-model="ruleForm.base64Str"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          :http-request="httpRequest"
          :multiple="false"
          :on-success="upOnSuccess"
          :on-error="upOnError"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadMaterial } from '@/api/hk'

export default {
  name: 'Index',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        type: undefined,
        file: undefined,
        base64Str: undefined
      },
      rules: {
        type: [
          { required: true, message: '请选择文件类型', trigger: 'change' }
        ],
        file: [
          { required: true, message: '请上传文件', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file)
      const uploadFiles = this.$refs.pictureUpload.uploadFiles
      for (var i = 0; i < uploadFiles.length; i++) {
        if (uploadFiles[i]['url'] === file.url) {
          uploadFiles.splice(i, 1)
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
      window.open(file.url)
    },
    handleExceed(files, fileList) {
      console.log(files)
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    submitForm(formName) {
      this.$refs.pictureUpload.submit()
      const fd = new FormData()
      fd.append('type', this.ruleForm.type)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          const reader = new FileReader()
          reader.readAsDataURL(this.ruleForm.file)
          reader.onload = function() {
            const result = reader.result
            // console.log(result)
            const base64Str = result.split(',')[1]
            console.log(base64Str)
            fd.append('base64Str', base64Str)
            uploadMaterial(fd).then((response) => {
              console.log('提交数据返回结果')
              console.log(response)
              // const result=response.data
            })
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    httpRequest(param) {
      console.log(param)
      this.ruleForm.file = param.file
      const reader = new FileReader()
      reader.readAsDataURL(param.file)
      var that = this

      reader.onload = function() { // https://pythonjishu.com/bbikosiuxrykjrc/
        const result = reader.result
        // console.log(result)
        const base64Str = result.split(',')[1]
        // console.log(base64Str)
        that.ruleForm.base64Str = base64Str
        console.log(that.ruleForm.base64Str)
      }
      console.log('测试')
    },
    upOnSuccess(response, file, fileList) {
      console.log(response)
    },
    upOnError(err, file, fileList) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>
