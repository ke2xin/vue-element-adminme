<template>
  <div class="app-container">
    <el-form ref="personalForm" label-width="80px" :model="personalForm" :rules="rules">
      <el-form-item label="服务商实体ID" prop="merchant_entity_id">
        <el-input v-model="personalForm.merchant_entity_id" />
      </el-form-item>
      <el-form-item label="行业code" prop="industry_code">
        <el-input v-model="personalForm.industry_code" />
      </el-form-item>
      <el-form-item label="类目信息" prop="industry_class">
        <el-row>
          <el-col :span="8">
            <el-input v-model="personalForm.class.first_class" placeholder="一级类目" type="number" />
          </el-col>
          <el-col :span="8">
            <el-input v-model="personalForm.class.second_class" placeholder="二级类目" type="number" />
          </el-col>
          <el-col :span="8">
            <el-input v-model="personalForm.class.third_class" placeholder="三级类目" type="number" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="行业角色" prop="industry_role">
        <el-select v-model="personalForm.industry_role" placeholder="请选择">
          <el-option v-for="item in industry_role_arr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="资质材料" prop="cooperation_cases">
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
          <div slot="tip" class="el-upload__tip">商家实体在该类目下所需要的资质材料</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="机构备案名称" prop="record_name">
        <el-input v-model="personalForm.institution.record_name" />
      </el-form-item>
      <el-form-item label="机构场景类型" prop="scene_type">
        <el-select v-model="personalForm.institution.scene_type" placeholder="请选择">
          <el-option v-for="item in scene_type_arr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="机构主体类型" prop="subject_type">
        <el-select v-model="personalForm.institution.subject_type" placeholder="请选择">
          <el-option v-for="item in subject_type_arr" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="机构介绍" prop="desc">
        <el-input v-model="personalForm.institution.desc" />
      </el-form-item>
      <el-form-item label="个人姓名" prop="name">
        <el-input v-model="personalForm.institution.employee.employee_material.name" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="id_number">
        <el-input v-model="personalForm.institution.employee.employee_material.id_number" />
      </el-form-item>
      <el-form-item label="身份证有效期" prop="expire_time">
        <el-date-picker v-model="personalForm.institution.employee.employee_material.expire_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="身份证证件照：" style="" prop="merIdenImgFront">
            <el-row type="flex" justify="space-between" class="uploadidcard">
              <el-col :span="10">
                <el-upload
                  ref="upload"
                  v-model="personalForm.institution.employee.employee_material.front_path"
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
      <el-form-item label="合作协议" prop="cooperation_cases">
        <el-upload
          class="upload-demo"
          action="#"
          :on-preview="handlePreview"
          :on-remove="handleRemove3"
          :before-remove="beforeRemove3"
          multiple
          :limit="1"
          :on-exceed="handleExceed3"
          :file-list="fileList"
          :http-request="handleHttpRequest3"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">合作协议</div>
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
import { dyRoleUpdateClassAuth, dyRoleUploadMaterial } from '@/api/douyin'

export default {
  name: 'UpdateClassAuth',
  data() {
    var validateEntityId = (rule, value, callback) => {
      if (this.personalForm.merchant_entity_id === '') {
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
      if (this.personalForm.class.first_class === '' || this.personalForm.class.second_class === '') {
        return callback(new Error('请填写类目代码'))
      } else {
        callback()
      }
    }
    var validateRecordName = (rule, value, callback) => {
      if (this.personalForm.institution.record_name === '') {
        return callback(new Error('请填写机构备案名称'))
      } else {
        callback()
      }
    }
    var validateSceneType = (rule, value, callback) => {
      if (this.personalForm.institution.record_name === '') {
        return callback(new Error('请填写机构场景类型'))
      } else {
        callback()
      }
    }
    // 服务商代老师添加类目纸质
    return {
      merIdenImgFront: '',
      merIdenImgBack: '',
      industry_role_arr: [
        {
          value: 1,
          label: '老师'
        },
        {
          value: 2,
          label: '机构'
        },
        {
          value: 3,
          label: '服务商'
        }
      ],
      scene_type_arr: [
        {
          value: '线上机构',
          label: '线上机构'
        },
        {
          value: '线下机构',
          label: '线下机构'
        }
      ],
      subject_type_arr: [
        {
          value: '个体工商户',
          label: '个体工商户'
        },
        {
          value: '企业工商户',
          label: '企业工商户'
        }
      ],
      personalForm: {
        partner_entity_id: '',
        merchant_entity_id: 'I7170969438722736139',
        industry_code: 10000,
        class: {
          first_class: 50000,
          second_class: 51700,
          third_class: 0
        },
        industry_role: undefined,
        merchant_qualifications: [],
        institution: {
          record_name: '广州用朋贸易有限公司',
          scene_type: '',
          subject_type: '',
          desc: '用朋专注于知识分享，让你获得更有价值的知识！',
          employee: {
            employee_material: {
              name: '唐波',
              id_number: '510902198205163603',
              expire_time: '',
              front_path: '',
              back_path: ''
            },
            cooperation_agreement: {}
          }
        }
      },
      rules: {
        merchant_entity_id: [
          { validator: validateEntityId, message: '请填写实体ID', trigger: 'blur', required: true }
        ],
        industry_code: [
          { validator: validateIndustryCode, trigger: 'blur', required: true }
        ],
        industry_class: [
          { validator: validateIndustry, trigger: 'blur', required: true }
        ],
        record_name: [
          { validator: validateRecordName, trigger: 'blur', required: true }
        ],
        scene_type: [
          { validator: validateSceneType, trigger: 'blur', required: true }
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
    handleRemove3(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleExceed3(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeRemove3(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onSubmit() {
      console.log('submit!', this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          dyRoleUpdateClassAuth(this.personalForm).then((response) => {
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
          this.personalForm.institution.employee.employee_material.front_path = meterial.path
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
          this.personalForm.institution.employee.employee_material.back_path = meterial.path
        }
      })
    },
    handleHttpRequest3(params) {
      console.log(params)
      var fd = new FormData()
      fd.append('type', '1005')
      fd.append('file', params.file)
      dyRoleUploadMaterial(fd).then((response) => {
        console.log(response)
        var meterial = JSON.parse(response.data)
        console.log(meterial)
        if (meterial.err_no === 0) {
          var o = {}
          o.material_type = 1005
          o.material_expiretime = '2029-09-10'
          var arr = []
          arr.push(meterial.path)
          o.material_paths = arr
          this.personalForm.institution.employee.cooperation_agreement = o
        }
      })
    },
    handleHttpRequest4(params) {
      console.log('上传营业执照')
      console.log(params)
      var fd = new FormData()
      fd.append('type', '1007')
      fd.append('file', params.file)
      dyRoleUploadMaterial(fd).then((response) => {
        console.log(response)
        var meterial = JSON.parse(response.data)
        console.log(meterial)
        if (meterial.err_no === 0) {
          var o = {}
          o.material_type = 1007
          o.material_expiretime = '2099-12-31'
          var arr = []
          arr.push(meterial.path)
          o.material_paths = arr
          this.personalForm.merchant_qualifications.push(o)
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
