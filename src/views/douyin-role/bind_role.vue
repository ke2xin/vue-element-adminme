<template>
  <div class="app-container">
    <el-form ref="personalForm" label-width="80px" :model="personalForm" :rules="rules">
      <el-form-item label="实体ID" prop="merchant_entity_id">
        <el-input v-model="personalForm.merchant_entity_id" />
      </el-form-item>
      <el-form-item label="行业code" prop="industry_code">
        <el-input v-model="personalForm.industry_code" />
      </el-form-item>
      <el-form-item label="实体角色类型" prop="merchant_industry_role">
        <el-select v-model="personalForm.merchant_industry_role" placeholder="请选择">
          <el-option v-for="item in merchant_industry_role_arr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { dyRoleBindRole } from '@/api/douyin'

export default {
  name: 'BindRole',
  data() {
    var validateEntityId = (rule, value, callback) => {
      if (this.personalForm.partner_entity_id === '') {
        return callback(new Error('请填写实体ID'))
      } else {
        callback()
      }
    }
    var validateIndustryCode = (rule, value, callback) => {
      if (this.personalForm.industry_code === '') {
        return callback(new Error('请填写行业代码'))
      } else {
        callback()
      }
    }
    return {
      merchant_industry_role_arr: [
        {
          value: 3,
          label: '服务商'
        }
      ],
      personalForm: {
        merchant_entity_id: 'I7170969438722736139',
        industry_code: 10000,
        merchant_industry_role: undefined
      },
      rules: {
        merchant_entity_id: [
          { validator: validateEntityId, message: '请填写实体ID', trigger: 'blur', required: true }
        ],
        industry_code: [
          { validator: validateIndustryCode, trigger: 'blur', required: true }
        ]
      },
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onSubmit() {
      console.log('submit!', this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          dyRoleBindRole(this.personalForm).then((response) => {
            console.log('提交表单返回数据', response)
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleCreateURL(file) {
      const _URL = window.URL || window.webkitURL
      const src = _URL.createObjectURL(file)
      console.log(src)
      return src
    }
  }
}
</script>

<style scoped>

</style>
