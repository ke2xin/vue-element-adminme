<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item label="上传的文件类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择文件类型">
          <el-option value="1000" label="身份证照片" />
          <el-option value="1001" label="老师教师资格证" />
          <el-option value="1002" label="教师专业性学历-专业性学历" />
          <el-option value="1003" label="教师专业性证书-专业认证" />
          <el-option value="1004" label="教师特殊课程类目认证" />
          <el-option value="1005" label="机构和老师之间的合作声明" />
          <el-option value="1006" label="授权函(在泛知识行业是服务商和老师的授权书)" />
          <el-option value="1007" label="机构营业执照照片" />
          <el-option value="1008" label="机构logo照片" />
          <el-option value="1009" label="机构注册证图片" />
          <el-option value="1010" label="服务商合作案例" />
          <el-option value="1011" label="机构特殊课程类目认证" />
          <el-option value="1012" label="老师在小程序的头像icon" />
        </el-select>
      </el-form-item>
      <el-form-item label="请选择文件" prop="file">
        <el-upload
          ref="pictureUpload"
          v-model="ruleForm.file"
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
import { dyRoleUploadMaterial } from '@/api/douyin'

export default {
  name: 'Index',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        type: undefined,
        file: undefined
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
      fd.append('file', this.ruleForm.file)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dyRoleUploadMaterial(fd).then((response) => {
            console.log('提交数据返回结果')
            console.log(response)
            // const result=response.data
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    httpRequest(param) {
      console.log(param)
      this.ruleForm.file = param.file
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
