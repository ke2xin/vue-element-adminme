<template>
  <div class="app-container">
    <el-form ref="personalForm" label-width="80px" :model="personalForm" :rules="rules">
      <el-form-item label="企业名称" prop="entity_name">
        <el-input v-model="personalForm.basic_auth.entity_name" />
      </el-form-item>
      <el-form-item label="营业执照编号" prop="certificate_id">
        <el-input v-model="personalForm.basic_auth.enterprise.certificate_id" />
      </el-form-item>
      <el-form-item label="营业执照">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove2"
          :http-request="handleHttpRequest3"
          :limit="1"
          :on-exceed="handleExceed2"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="法人姓名" prop="name">
        <el-input v-model="personalForm.basic_auth.enterprise.legal_person.name" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="id_number">
        <el-input v-model="personalForm.basic_auth.enterprise.legal_person.id_number" />
      </el-form-item>
      <el-form-item label="身份证有效期" prop="expire_time">
        <el-date-picker v-model="personalForm.basic_auth.enterprise.legal_person.expire_time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="身份证证件照：" style="" prop="merIdenImgFront">
            <el-row type="flex" justify="space-between" class="uploadidcard">
              <el-col :span="10">
                <el-upload
                  ref="upload"
                  v-model="personalForm.basic_auth.enterprise.legal_person.front_path"
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
      <el-form-item label="营业执照上的公司地址" prop="company_addr">
        <el-input v-model="personalForm.class_auth.partner.company_addr" />
      </el-form-item>
      <el-form-item label="合作案例资料图片" prop="cooperation_cases">
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
          <div slot="tip" class="el-upload__tip">上传合作案例</div>
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
import { dyRoleSettle, dyRoleUploadMaterial } from '@/api/douyin'

export default {
  name: 'SettleIn',
  data() {
    // 身份证正面验证
    var validateImgFront = (rule, value, callback) => { // （关键代码）
      if (this.personalForm.basic_auth.enterprise.legal_person.front_path === '' && this.personalForm.basic_auth.enterprise.legal_person.back_path === '') {
        return callback(new Error('附件不能为空'))
      } else if (this.personalForm.basic_auth.enterprise.legal_person.front_path === '') {
        return callback(new Error('请上传身份证正面'))
      } else if (this.personalForm.basic_auth.enterprise.legal_person.back_path === '') {
        return callback(new Error('请上传身份证背面'))
      } else {
        callback()
      }
    }
    var validateEntityName = (rule, value, callback) => {
      if (this.personalForm.basic_auth.entity_name === '') {
        return callback(new Error('请填写企业名称'))
      } else {
        callback()
      }
    }
    var validateCertificateId = (rule, value, callback) => {
      if (this.personalForm.basic_auth.enterprise.certificate_id === '') {
        return callback(new Error('请填写营业执照编号'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (this.personalForm.basic_auth.enterprise.legal_person.name === '') {
        return callback(new Error('请填写法人姓名'))
      } else {
        return callback()
      }
    }
    var validateIdNumber = (rule, value, callback) => {
      if (this.personalForm.basic_auth.enterprise.legal_person.id_number === '') {
        return callback('请填写法人身份证号码')
      } else {
        return callback()
      }
    }
    var validateExpireTime = (rule, value, callback) => {
      if (this.personalForm.basic_auth.enterprise.legal_person.expire_time === '') {
        return callback('请选择身份证过期时间')
      } else {
        return callback()
      }
    }
    var validateCompanyAddr = (rule, value, callback) => {
      if (this.personalForm.class_auth.partner.company_addr === '') {
        return callback(new Error('请填写公司地址'))
      } else {
        return callback()
      }
    }
    var validateCooperationCases = (rule, value, callback) => {
      if (this.personalForm.class_auth.partner.cooperation_cases.length <= 0) {
        return callback(new Error('请上传合作案例'))
      } else {
        return callback()
      }
    }
    return {
      ruleForm: {
        name: undefined
      },
      uploadURL: 'https://slpos.kosm.com.cn/ypps/ps/ckz/douyinkc/dy_upload_file.php',
      personalForm: {
        basic_auth: {
          entity_type: 2,
          entity_name: '',
          certificate_type: 2,
          enterprise: {
            certificate_id: '',
            certificate_materials: [],
            legal_person: {
              name: '',
              id_number: '',
              expire_time: '',
              front_path: '', // 身份证正面
              back_path: ''// 身份证反面
            }
          }
        },
        class_auth: {
          industry_code: 10000,
          industry_class: {
            first_class: 0,
            second_class: 0,
            third_class: 0
          },
          industry_role: 3,
          partner: {
            company_type: '企业工商户',
            company_addr: '',
            cooperation_cases: []
          }
        }
      },
      merIdenImgFront: '',
      merIdenImgBack: '',
      rules: {
        merIdenImgFront: [
          { validator: validateImgFront, trigger: 'change' }
        ],
        entity_name: [
          { validator: validateEntityName, message: '请填写企业名称', trigger: 'blur' }
        ],
        certificate_id: [
          { validator: validateCertificateId, trigger: 'blur' }
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
        company_addr: [
          { validator: validateCompanyAddr, trigger: 'blur' }
        ],
        cooperation_cases: [
          { validator: validateCooperationCases, trigger: 'blur' }
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
          dyRoleSettle(this.personalForm).then((response) => {
            console.log('提交表单返回数据', response)
          }).catch((err) => {
            console.log(err)
          })
        }
      })
      // this.$refs.upload.submit() 这个是手动提交表单的文件
    },
    handleHttpRequest1(params) {
      // this.merIdenImgFront = 'https://img1.baidu.com/it/u=1650201936,4218389007&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313'// 保存临时图片
      console.log(params)
      this.merIdenImgFront = this.handleCreateURL(params.file)
      this.personalForm.basic_auth.enterprise.legal_person.front_path = 'https://img1.baidu.com/it/u=1650201936,4218389007&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313'
      var fd = new FormData()
      fd.append('type', '1000')
      fd.append('file', params.file)
      dyRoleUploadMaterial(fd).then((response) => {
        console.log(response)
        var meterial = JSON.parse(response.data)
        console.log(meterial)
        if (meterial.err_no === 0) {
          this.$refs.personalForm.validateField('merIdenImgFront')
          this.personalForm.basic_auth.enterprise.legal_person.front_path = meterial.path
        }
      })
    },
    handleHttpRequest2(params) {
      // this.merIdenImgBack = 'https://img1.baidu.com/it/u=1650201936,4218389007&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313'// 保存临时图片
      console.log(params)
      this.merIdenImgBack = this.handleCreateURL(params.file)
      this.personalForm.basic_auth.enterprise.legal_person.back_path = 'https://img1.baidu.com/it/u=1650201936,4218389007&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313'
      var fd = new FormData()
      fd.append('type', 1000)
      fd.append('file', params.file)
      dyRoleUploadMaterial(fd).then((response) => {
        console.log(response)
        var meterial = JSON.parse(response.data)
        console.log(meterial)
        if (meterial.err_no === 0) {
          this.$refs.personalForm.validateField('merIdenImgFront')
          this.personalForm.basic_auth.enterprise.legal_person.back_path = meterial.path
        }
      })
    },
    handleHttpRequest3(params) {
      console.log('提交营业执照')
      console.log(params)
      var fd = new FormData()
      fd.append('type', 1007)
      fd.append('file', params.file)
      dyRoleUploadMaterial(fd).then((response) => {
        console.log(response)
        var meterial = JSON.parse(response.data)
        console.log(meterial)
        if (meterial.err_no === 0) {
          this.personalForm.basic_auth.enterprise.certificate_materials = []
          var o = {}
          o.material_type = 1007
          o.material_expiretime = '2099-12-31'
          var arr = []
          // arr.push('certification/resource/8cd81a3a93be782b1fef994aede24383')
          arr.push(meterial.path)
          o.material_paths = arr
          this.personalForm.basic_auth.enterprise.certificate_materials.push(o)
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
          // arr.push('certification/resource/8cd81a3a93be782b1fef994aede24383')
          arr.push(meterial.path)
          o.material_paths = arr
          this.personalForm.class_auth.partner.cooperation_cases.push(o)
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
