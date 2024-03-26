<template>
  <div class="app-container">
    <el-form ref="personalForm" label-width="80px" :model="personalForm" :rules="rules">
      <el-form-item label="实体ID" prop="entity_id">
        <el-input v-model="personalForm.entity_id" />
      </el-form-item>
      <el-form-item label="角色类型" prop="industry_role">
        <el-select v-model="personalForm.industry_role" placeholder="请选择">
          <el-option v-for="item in industry_role_arr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="企业类型" prop="industry_role">
        <el-select v-model="personalForm.partner_role_info.partner_info.company_type" placeholder="请选择">
          <el-option v-for="item in company_type_arr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="营业执照上的公司地址" prop="company_addr">
        <el-input v-model="personalForm.partner_role_info.partner_info.company_addr" />
      </el-form-item>
      <el-form-item label="合作案例" prop="cooperation_cases">
        <el-upload
          class="upload-demo"
          action="#"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :http-request="handleHttpRequest4"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">合作案例资料图片</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { dyRoleAddRole, dyRoleUploadMaterial } from '@/api/douyin'

export default {
  name: 'AddRole',
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
    var validateIndustry = (rule, value, callback) => {
      if (this.personalForm.industry_class.first_class === '' || this.personalForm.industry_class.second_class === '') {
        return callback(new Error('请填写类目代码'))
      } else {
        callback()
      }
    }
    // 服务商代老师添加类目纸质
    return {
      industry_role_arr: [
        {
          value: 2,
          label: '机构'
        },
        {
          value: 3,
          label: '代运营服务商'
        }
      ],
      company_type_arr: [
        {
          value: '企业工商户',
          label: '企业工商户'
        },
        {
          value: '个体工商户',
          label: '个体工商户'
        }
      ],
      personalForm: {
        entity_id: 'I7170969438722736139',
        industry_code: 10000,
        industry_class: {
          first_class: 50000,
          second_class: 51700,
          third_class: 0
        },
        industry_role: undefined,
        partner_role_info: {
          partner_info: {
            company_type: '',
            company_addr: '广州市白云区均禾街平沙松园中西街23号606房',
            cooperation_cases: []
          }
        }
      },
      rules: {
        partner_entity_id: [
          { validator: validateEntityId, message: '请填写实体ID', trigger: 'blur', required: true }
        ],
        industry_code: [
          { validator: validateIndustryCode, trigger: 'blur', required: true }
        ],
        industry_class: [
          { validator: validateIndustry, trigger: 'blue', required: true }
        ]
      },
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    // 身份证表单验证
    idenImghandleChange(file, filelist) {
      console.log('没有立即上传')
      console.log(file)
      console.log(filelist)
      this.$refs.personalForm.validateField('merIdenImgFront')// 对部分表单字段进行校验的方法，也就是手动进行表单验证（关键代码）
    },
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
          dyRoleAddRole(this.personalForm).then((response) => {
            console.log('提交表单返回数据', response)
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    handleHttpRequest4(params) {
      console.log(params)
      var fd = new FormData()
      fd.append('type', '1010')
      fd.append('file', params.file)
      dyRoleUploadMaterial(fd).then((response) => {
        console.log(response)
        var meterial = JSON.parse(response.data)
        console.log(meterial)
        if (meterial.err_no === 0) {
          var o = {}
          o.material_type = 1010
          o.material_expiretime = '2029-09-10'
          var arr = []
          arr.push(meterial.path)
          o.material_paths = arr
          this.personalForm.partner_role_info.partner_info.cooperation_cases.push(o)
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
