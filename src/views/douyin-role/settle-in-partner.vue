<template>
  <div class="app-container">
    <el-form ref="personalForm" label-width="80px" :model="personalForm" :rules="rules">
      <el-form-item label="类型" prop="entity_type">
        <el-select v-model="personalForm.basic_auth.entity_type" placeholder="请选择">
          <el-option v-for="item in entity_type_arr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="实体名称" prop="entity_name">
        <el-input v-model="personalForm.basic_auth.entity_name" />
      </el-form-item>
      <el-form-item label="证件类型" prop="certificate_type">
        <el-select v-model="personalForm.basic_auth.certificate_type" placeholder="请选择">
          <el-option v-for="item in certificate_type_arr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="personalForm.basic_auth.individual.name" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="id_number">
        <el-input v-model="personalForm.basic_auth.individual.id_number" />
      </el-form-item>
      <el-form-item label="身份证有效期" prop="expire_time">
        <el-date-picker v-model="personalForm.basic_auth.individual.expire_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="身份证证件照：" style="" prop="merIdenImgFront">
            <el-row type="flex" justify="space-between" class="uploadidcard">
              <el-col :span="10">
                <el-upload
                  ref="upload"
                  v-model="personalForm.basic_auth.individual.front_path"
                  class="idCard1"
                  action="#"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  accept=".JPG, .png, .jpeg"
                  multiple="multiple"
                  :on-change="idenImghandleChange"
                  :http-request="handleHttpRequest1"
                  :auto-upload="true"
                >
                  <img v-if="merIdenImgFront" :src="merIdenImgFront" class="avatar" style="width:100%;height:100%">
                </el-upload>
              </el-col>
              <el-col :span="10">
                <el-upload
                  class="idCard2"
                  action="#"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  accept=".JPG, .png, .jpeg"
                  multiple="multiple"
                  :on-change="idenImghandleChange"
                  :http-request="handleHttpRequest2"
                  :auto-upload="true"
                >
                  <img v-if="merIdenImgBack" :src="merIdenImgBack" class="avatar" style="width:100%;height:100%">
                </el-upload>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="">
        <p style="color:#888">注：以上所需上传照片仅支持JPEG、GIF、PNG格式的图片，大小不超过2M。</p>
      </el-form-item>
      <el-form-item label="角色类型" prop="industry_role">
        <el-select v-model="personalForm.class_auth.industry_role" placeholder="请选择">
          <el-option v-for="item in industry_role_arr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="资质" prop="qualifications">
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
          <div slot="tip" class="el-upload__tip">上传对应资质</div>
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
import { dyRoleSettlePartner, dyRoleUploadMaterial } from '@/api/douyin'

export default {
  name: 'SettleInPartner',
  data() {
    // 身份证正面验证
    var validateImgFront = (rule, value, callback) => { // （关键代码）
      if (this.personalForm.basic_auth.individual.front_path === '' && this.personalForm.basic_auth.individual.back_path === '') {
        return callback(new Error('附件不能为空'))
      } else if (this.personalForm.basic_auth.individual.front_path === '') {
        return callback(new Error('请上传身份证正面'))
      } else if (this.personalForm.basic_auth.individual.back_path === '') {
        return callback(new Error('请上传身份证背面'))
      } else {
        callback()
      }
    }
    var validateEntityType = (rule, value, callback) => {
      if (this.personalForm.basic_auth.entity_type === '') {
        return callback(new Error('请选择类型'))
      } else {
        callback()
      }
    }
    var validateEntityName = (rule, value, callback) => {
      if (this.personalForm.basic_auth.entity_name === '') {
        return callback(new Error('请填写实体名称'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (this.personalForm.basic_auth.individual.name === '') {
        return callback(new Error('请填写法人姓名'))
      } else {
        return callback()
      }
    }
    var validateIdNumber = (rule, value, callback) => {
      if (this.personalForm.basic_auth.individual.id_number === '') {
        return callback('请填写身份证号码')
      } else {
        return callback()
      }
    }
    var validateExpireTime = (rule, value, callback) => {
      if (this.personalForm.basic_auth.individual.expire_time === '') {
        return callback('请选择身份证过期时间')
      } else {
        return callback()
      }
    }
    var validateQualifications = (rule, value, callback) => {
      if (this.personalForm.class_auth.qualifications <= 0) {
        return callback(new Error('请上传对应资质'))
      } else {
        return callback()
      }
    }
    return {
      entity_type_arr: [
        {
          value: 1,
          label: '个人'
        }
      ],
      certificate_type_arr: [
        {
          value: 1,
          label: '身份证'
        }
      ],
      industry_role_arr: [
        {
          value: 1,
          label: '老师'
        }
      ],
      personalForm: {
        entity_id: 'I7170969438722736139',
        basic_auth: {
          entity_type: undefined,
          entity_name: '唐波',
          certificate_type: undefined,
          individual: {
            name: '唐波',
            id_number: '510902198205163603',
            expire_time: '',
            front_path: '',
            back_path: ''
          }
        },
        class_auth: {
          industry_code: 10000,
          industry_class: {
            first_class: 50000,
            second_class: 51700,
            third_class: 0
          },
          industry_role: undefined,
          qualifications: []
        }
      },
      merIdenImgFront: '',
      merIdenImgBack: '',
      rules: {
        merIdenImgFront: [
          { validator: validateImgFront, trigger: 'change' }
        ],
        entity_type: [
          { validator: validateEntityType, message: '请选择类型名称', trigger: 'blur', required: true }
        ],
        entity_name: [
          { validator: validateEntityName, message: '请填写实体名称', trigger: 'blur', required: true }
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        id_number: [
          { validator: validateIdNumber, trigger: 'blur' }
        ],
        expire_time: [
          { validator: validateExpireTime, trigger: 'blur' }
        ],
        qualifications: [
          { validator: validateQualifications, trigger: 'blur', required: true }
        ]
      },
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    // 上传身份证正面成功
    handleAvatarSuccess1(response, file, fileList) {
      console.log('身份证正面返回的数据', response)
      console.log(file)
      console.log(fileList)
      this.merIdenImgFront = file.url// 保存临时图片
      this.personalForm.basic_auth.enterprise.legal_person.front_path = file.url
      this.personalForm.merIdenImgFront = response// 保存到提交表单
    },
    // 上传身份证反面成功
    handleAvatarSuccess2(response, file, fileList) {
      console.log('身份证反面返回的数据', response)
      this.merIdenImgBack = file.url// 保存临时图片
      this.personalForm.basic_auth.enterprise.legal_person.back_path = file.url
      this.personalForm.merIdenImgBack = response// 保存到提交表单
    },
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
    handleExceed2(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onSubmit() {
      console.log('submit!', this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          dyRoleSettlePartner(this.personalForm).then((response) => {
            console.log('提交表单返回数据', response)
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    handleHttpRequest1(params) {
      console.log(params)
      this.merIdenImgFront = this.handleCreateURL(params.file)
      var fd = new FormData()
      fd.append('type', '1000')
      fd.append('file', params.file)
      dyRoleUploadMaterial(fd).then((response) => {
        console.log(response)
        var meterial = JSON.parse(response.data)
        console.log(meterial)
        if (meterial.err_no === 0) {
          this.$refs.personalForm.validateField('merIdenImgFront')
          this.personalForm.basic_auth.individual.front_path = meterial.path
        }
      })
    },
    handleHttpRequest2(params) {
      console.log(params)
      this.merIdenImgBack = this.handleCreateURL(params.file)
      var fd = new FormData()
      fd.append('type', 1000)
      fd.append('file', params.file)
      dyRoleUploadMaterial(fd).then((response) => {
        console.log(response)
        var meterial = JSON.parse(response.data)
        console.log(meterial)
        if (meterial.err_no === 0) {
          this.$refs.personalForm.validateField('merIdenImgFront')
          this.personalForm.basic_auth.individual.back_path = meterial.path
        }
      })
    },
    handleHttpRequest4(params) {
      console.log(params)
      var fd = new FormData()
      fd.append('type', '1001')
      fd.append('file', params.file)
      dyRoleUploadMaterial(fd).then((response) => {
        console.log(response)
        var meterial = JSON.parse(response.data)
        console.log(meterial)
        if (meterial.err_no === 0) {
          var o = {}
          o.material_type = 1001
          o.material_expiretime = '2029-09-10'
          var arr = []
          arr.push(meterial.path)
          o.material_paths = arr
          this.personalForm.class_auth.qualifications.push(o)
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
