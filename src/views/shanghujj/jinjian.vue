<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item label="接入方自编商户号" prop="outMchId">
        <el-input v-model="ruleForm.outMchId" style="width: 200px;" />
      </el-form-item>
      <h2>商户基础信息</h2>
      <el-row>
        <el-col :span="10">
          <el-form-item label="商户名" prop="mchJson.name">
            <el-input v-model="ruleForm.mchJson.name" maxlength="20" />
          </el-form-item>
        </el-col>
        <el-col :span="4"><div style="width: 100%;height: 10px;" /></el-col>
        <el-col :span="10">
          <el-form-item label="商户简称" prop="mchJson.shortName">
            <el-input v-model="ruleForm.mchJson.shortName" maxlength="20" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="商户类型" prop="mchJson.mchType">
        <el-radio-group v-model="ruleForm.mchJson.mchType">
          <el-radio label="GENERAL">普通商户</el-radio>
          <el-radio label="SUB_MERCHANT">子商户</el-radio>
          <el-radio label="MICRO">小微商户</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="上级商户号" prop="parentMchId">
        <el-input style="width: 200px;" />
      </el-form-item>

      <el-form-item label="商户性质" prop="mchJson.mchNature">
        <el-radio-group v-model="ruleForm.mchJson.mchNature">
          <el-radio value="" label="COMPANY">企业</el-radio>
          <el-radio value="" label="PERSON">个体工商户</el-radio>
          <el-radio value="" label="MICRO">小微商户</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="分账标识" prop="mchJson.splitFlag">
        <el-radio-group v-model="ruleForm.mchJson.splitFlag">
          <el-radio value="" label="Y">分账</el-radio>
          <el-radio value="" label="N">不分帐</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="营业执照号" prop="licenceCode">
        <el-input style="width: 200px;" />
      </el-form-item>
      <el-form-item label="营业执照有效日期" prop="licencePeriod">
        <el-date-picker
          v-model="ruleForm.mchJson.licencePeriod"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item label="营业执照照片" prop="licenceFileNo">
        <el-upload
          ref="pictureUpload"
          v-model="base64Str"
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
      <el-form-item label="法人证件类型" prop="mchJson.legalCertType">
        <el-select v-model="ruleForm.mchJson.legalCertType" placeholder="请选择法人证件类型">
          <el-option value="0" label="身份证" />
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item label="法人姓名" prop="legalPerson">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="4"><div style="width: 100%;height: 10px;" /></el-col>
        <el-col :span="10">
          <el-form-item label="法人证件号" prop="legalCertNo">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="法人证件有效期" prop="legalIdPeriod">
        <el-date-picker
          v-model="ruleForm.mchJson.legalIdPeriod"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="法人证件">
        <div style="display: flex;justify-content: space-around">
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus1 avatar-uploader-icon" />
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest2"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
            <i v-else class="el-icon-plus2 avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item label="联系人姓名" prop="contactName">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="4"><div style="width: 100%;height: 10px;" /></el-col>
        <el-col :span="10">
          <el-form-item label="联系人手机号" prop="contactPhone">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="联系人电邮" prop="contactEmail">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="2"><div style="width: 100%;height: 10px;" /></el-col>
        <el-col :span="8">
          <el-form-item label="客服电话" prop="serviceTel">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="2"><div style="width: 100%;height: 10px;" /></el-col>
        <el-col :span="6">
          <el-form-item label="经营地址" prop="busiAddr">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="省市区">
        <el-cascader
          v-model="selectedOptions"
          size="large"
          :options="options"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="mcc" prop="mcc">
        <el-input />
      </el-form-item>
      <el-form-item label="门店照">
        <div style="display: flex;justify-content: space-around;">
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus3 avatar-uploader-icon" />
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus4 avatar-uploader-icon" />
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus5 avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="其他">
        <div style="display: flex;justify-content: space-around;">
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus6 avatar-uploader-icon" />
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus7 avatar-uploader-icon" />
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus8 avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="提现方式" prop="withdrawType">
        <el-select v-model="ruleForm.mchJson.withdrawType" placeholder="请选择提现方式">
          <el-option value="AUTOMATIC" label="自动提现" />
          <el-option value="MANUAL" label="手动提现" />
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="费率" prop="withdrawRate">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="2"><div style="width: 100%;height: 10px;" /></el-col>
        <el-col :span="8">
          <el-form-item label="提现加收" prop="withdrawAdvance">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="2"><div style="width: 100%;height: 10px;" /></el-col>
        <el-col :span="6">
          <el-form-item label="注册资金（单位：万）" prop="registeredCapital">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
      <h2>结算账户信息</h2>
      <el-row>
        <el-col :span="10">
          <el-form-item label="开户行名称" prop="bankName">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="4"><div style="width: 100%;height: 10px;" /></el-col>
        <el-col :span="10">
          <el-form-item label="开户支行号" prop="branchCode">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="账户类型" prop="acctType">
        <el-radio-group v-model="ruleForm.mchJson.splitFlag">
          <el-radio value="COMPANY" label="对公账户" />
          <el-radio value="PERSON" label="对私账户" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账户名" prop="acctName">
        <el-input />
      </el-form-item>
      <el-form-item>
        <div style="display: flex;justify-content: space-around;">
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus9 avatar-uploader-icon" />
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="true"
            :show-file-list="false"
            :http-request="httpRequest1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
            <i v-else class="el-icon-plus10 avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData, codeToText } from 'element-china-area-data'
export default {
  name: 'Jinjian',
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        outMchId: undefined,
        mchJson: {
          name: '',
          shortName: '',
          mchType: 'SUB_MERCHANT',
          parentMchId: '',
          mchNature: 'MICRO',
          splitFlag: 'Y',
          licenceCode: '',
          licencePeriod: '',
          licenceFileNo: '',
          legalCertType: '',
          legalIdPeriod: '',
          withdrawType: '',
          accountType: 'TRADE'
        }
      },
      rules: {
        outMchId: [
          { required: true, message: '自编商户号不可为空', trigger: 'blur' }
        ],
        'mchJson.name': [
          { required: true, message: '商户名不可为空', trigger: 'blur' }
        ],
        'mchJson.shortName': [
          { required: true, message: '商户简称不可为空', trigger: 'blur' }
        ],
        'mchJson.mchNature': [
          { required: true, message: '商户性质不可为空', trigger: 'blur' }
        ],
        'mchJson.splitFlag': [
          { required: true, message: '分账标识不可为空', trigger: 'blur' }
        ],
        'mchJson.legalCertType': [
          { required: true, message: '法人证件类型不可为空', trigger: 'blur' }
        ]
      },
      base64Str: undefined,
      imageUrl1: '',
      imageUrl2: ''
    }
  },
  methods: {
    handleExceed(files, fileList) {
      console.log(files)
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    submitForm(formName) {
      const fd = new FormData()
      fd.append('type', this.ruleForm.type)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('验证成功')
          console.log(this.ruleForm)
        }
      })
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
    },
    handleAvatarSuccess(res, file) {
      console.log('预览')
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    httpRequest1(param) {
      console.log(param)
      console.log('预览2')
      this.imageUrl1 = URL.createObjectURL(param.file)
    },
    httpRequest2(param) {
      console.log(param)
      console.log('预览2')
      this.imageUrl2 = URL.createObjectURL(param.file)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleChange(value) {
      console.log(value[0])
      console.log(codeToText[value[0]])
      if (value[1] != null && value[2] != null) {
        var addressText = codeToText[value[0]] + '/' + codeToText[value[1]] + '/' + codeToText[value[2]]
      } else {
        if (value[1] != null) {
          addressText = codeToText[value[0]] + '/' + codeToText[value[1]]
        } else {
          addressText = codeToText[value[0]]
        }
      }
      // this.form.address = addressText
      console.log(addressText)
      this.provinces = codeToText[this.selectedOptions[0]]
      this.city = codeToText[this.selectedOptions[1]]
      this.area = codeToText[this.selectedOptions[2]]
    }
  }
}
</script>

<style>
.el-icon-plus1:before{
  content: '法人正面';
}
.el-icon-plus2:before{
  content: '法人反面';
}
.el-icon-plus3:before{
  content: '门店门头照';
}
.el-icon-plus4:before{
  content: '门店外景照';
}
.el-icon-plus5:before{
  content: '门店内景照';
}
.el-icon-plus6:before{
  content: '其他补充图片';
}
.el-icon-plus7:before{
  content: '门店收银台照';
}
.el-icon-plus8:before{
  content: '支付协议照';
}
.el-icon-plus9:before{
  content: '开户许可证';
}
.el-icon-plus10:before{
  content: '银行卡正面照';
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
