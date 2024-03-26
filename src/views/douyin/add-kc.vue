<template>
  <div class="app-container">
    <el-form ref="personalForm" label-width="80px" :model="personalForm" :rules="rules">
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="personalForm.product.common_product_params.title" />
      </el-form-item>
      <el-form-item label="购课须知" prop="purchase_precaution">
        <el-input v-model="personalForm.product.common_product_params.purchase_precaution" type="textarea" />
      </el-form-item>
      <el-form-item label="课程履约" prop="purchase_precaution">
        <el-button type="primary" @click="addkcly">添加</el-button>
      </el-form-item>
      <el-dialog title="添加课程履约" :visible.sync="dialogVisible1" width="40%">
        <el-form-item label="课程履约名称">
          <el-input v-model="product_fulfillment_lst_name" />
        </el-form-item>
        <el-form-item label="课程履约url">
          <el-input v-model="product_fulfillment_lst_name_url" />
        </el-form-item>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogClose1">确 定</el-button>
        </span>
      </el-dialog>
      <el-form-item label="课程履约列表" prop="product_fulfillment_lst">
        <ul>
          <li v-for="(item,index) in personalForm.product.common_product_params.product_fulfillment_lst" :key="index">
            <p style="margin: 0;">{{ item.fulfillment_content.name }}</p>
            <p style="margin: 0;">{{ item.fulfillment_content.fulfillment_uri }}</p>
            <p style="margin: 0;">{{ item.fulfillment_content.url }}</p>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="提单页价格" prop="price">
        <el-input v-model="personalForm.product.common_product_params.price_info.price" type="number">
          <template slot="append">分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="真实价格" prop="real_price">
        <el-input v-model="personalForm.product.common_product_params.price_info.real_price" type="number">
          <template slot="append">分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="挂载路径" prop="path">
        <el-input v-model="personalForm.product.common_product_params.path_info_lst[0].path" />
      </el-form-item>
      <el-form-item label="课程id" prop="course_id">
        <el-input v-model="personalForm.product.common_product_params.path_info_lst[0].query.course_id" />
      </el-form-item>
      <el-form-item label="自定义id" prop="id">
        <el-input v-model="personalForm.product.common_product_params.path_info_lst[0].query.id" />
      </el-form-item>
      <el-form-item label="商品详情" prop="product_detail_lst_name">
        <el-button type="primary" @click="addkcxq">添加</el-button>
      </el-form-item>
      <el-dialog title="添加商品详情" :visible.sync="dialogVisible2" width="40%">
        <el-form-item label="商品详情名称">
          <el-input v-model="product_detail_lst_name" />
        </el-form-item>
        <el-form-item label="商品详情url">
          <el-input v-model="product_detail_lst_name_url" />
        </el-form-item>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogClose2">确 定</el-button>
        </span>
      </el-dialog>
      <el-form-item label="商品详情列表" prop="product_detail_lst">
        <ul>
          <li v-for="(item,index) in personalForm.product.common_product_params.product_detail_lst" :key="index">
            <p style="margin: 0;">{{ item.text }}</p>
            <p style="margin: 0;">{{ item.img_uri }}</p>
            <p style="margin: 0;">{{ item.url }}</p>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="锚点信息" prop="anchor_title">
        <el-input v-model="personalForm.product.common_product_params.anchor_info.video_anchor_info.anchor_title" />
      </el-form-item>
      <el-form-item label="开发者回调" prop="callback_data">
        <el-input v-model="personalForm.product.common_product_params.callback_data" />
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="课程图片uri" style="" prop="merIdenImgFront">
            <el-row type="flex" justify="space-between" class="uploadidcard">
              <el-col :span="10">
                <el-upload
                  ref="upload"
                  v-model="personalForm.product.common_product_params.product_img_uri"
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
                  <img v-if="previewSrc" :src="previewSrc" class="avatar" style="width:100%;height:100%;">
                </el-upload>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="机构id" prop="institution_id">
        <el-input v-model="personalForm.product.course_params.institution_id" />
      </el-form-item>
      <el-form-item label="课程节数" prop="course_num">
        <el-input v-model="personalForm.product.course_params.course_num" type="number">
          <template slot="append">节</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { dyKcUploadMaterial, dyKcAddProduct, dyKcUploadResource } from '@/api/douyin'

export default {
  name: 'AddKc',
  data() {
    var validateTitle = (rule, value, callback) => {
      if (this.personalForm.product.common_product_params.title === '') {
        return callback(new Error('请填写课程名称'))
      } else {
        callback()
      }
    }
    var validatePrecaution = (rule, value, callback) => {
      if (this.personalForm.product.common_product_params.purchase_precaution === '') {
        return callback(new Error('请填写购课须知'))
      } else {
        callback()
      }
    }
    return {
      uploadURL: 'https://slpos.kosm.com.cn/ypps/ps/ckz/douyinkc/dy_upload_file.php',
      personalForm: {
        product_type: 1,
        product: {
          common_product_params: {
            appid: 'tt535f25e2cc663d7b01',
            first_class: 50000,
            second_class: 51700,
            title: '剪映教程基础课程',
            purchase_precaution: '你可以在抖音中的【我】-【≡】-【我的订单】中查询并管理各类订单，你也可以在【我的订单】中关闭部分类型的订单同步，关闭后，你将只能在下单的小程序中查看订单。',
            industry_type: 1,
            product_fulfillment_lst: [
              {
                fulfillment_content: {
                  fulfillment_uri: 'product/resource/70fbcdd40a30d3becface4f64dc4e07d',
                  name: '全面认识剪映',
                  text: ''
                },
                fulfillment_type: 1
              },
              {
                fulfillment_content: {
                  fulfillment_uri: 'product/resource/6831300a6ba1507c927155dbec376ef2',
                  name: '四种添加音频的方式',
                  text: ''
                },
                fulfillment_type: 1
              },
              {
                fulfillment_content: {
                  fulfillment_uri: 'product/resource/1d3910293445101e4795ab0b13e70fdb',
                  name: '添加视频字母（中英文）',
                  text: ''
                },
                fulfillment_type: 1
              },
              {
                fulfillment_content: {
                  fulfillment_uri: 'product/resource/fcf32d2bce668a55d24a6370aa8ab0cf',
                  name: '三种添加文本配音方式',
                  text: ''
                },
                fulfillment_type: 1
              },
              {
                fulfillment_content: {
                  fulfillment_uri: 'product/resource/9f9bb87ad8400bdc6623c7ced85c0f80',
                  name: '调整视频比例和背景',
                  text: ''
                },
                fulfillment_type: 1
              },
              {
                fulfillment_content: {
                  fulfillment_uri: 'product/resource/4403fb208d8dd7274eaea2b0ecd15764',
                  name: '常用调色参数和原理',
                  text: ''
                },
                fulfillment_type: 1
              },
              {
                fulfillment_content: {
                  fulfillment_uri: 'product/resource/daf30eca3db0f3928ffd3ec65d80c83e',
                  name: '基础转场的运用',
                  text: ''
                },
                fulfillment_type: 1
              },
              {
                fulfillment_content: {
                  fulfillment_uri: 'product/resource/4643402dc5eef0d2d9cc2c5317a846a7',
                  name: '录屏功能和相机参数',
                  text: ''
                },
                fulfillment_type: 1
              }
            ],
            price_info: {
              unit: '节',
              price: 5000,
              real_price: 4900
            },
            path_info_lst: [
              {
                path: 'pages/cp_show/cp_show',
                query: {
                  course_id: '1',
                  id: '717'
                }
              }
            ],
            product_detail_lst: [
              {
                img_uri: 'product/resource/ffd51eb030f01f49e70bd8f21417cf73',
                text: '老师介绍'
              },
              {
                img_uri: 'product/resource/87ee5aca387b5f859831e2cb779e5ec1',
                text: '零基础，轻松学'
              },
              {
                img_uri: 'product/resource/901b67cc9245a4f93e412e487086675b',
                text: '教你实用的剪辑技能'
              },
              {
                img_uri: 'product/resource/f5ea6cc752def6a884c0731cf7628d25',
                text: '课程介绍'
              },
              {
                img_uri: 'product/resource/fbc207512b9c42174eac58d494a6230e',
                text: '课程亮点'
              },
              {
                img_uri: 'product/resource/f25001e6a62457cf8b8cfae2f5eac533',
                text: '适合人群'
              },
              {
                img_uri: 'product/resource/acc32a0981caa69d1a77be23b0234b3b',
                text: '剪辑逻辑'
              }
            ],
            anchor_info: {
              video_anchor_info: {
                anchor_title: '剪映基础教程'
              }
            },
            callback_data: '开发者自定义回调信息',
            product_img_uri: 'tos-cn-i-b2i6zad4el/6ae89b1cf67f9e51e0cc86724c320578'
          },
          course_params: {
            institution_id: 'I7170969438722736139',
            course_num: 8,
            refund_label: {
              type: 1,
              day_before_use_info: {
                day: 7
              }
            },
            use_label: {
              valid_date: '2026-12-12'
            }
          }
        }
      },
      dialogVisible1: false,
      dialogVisible2: false,
      previewSrc: '',
      product_fulfillment_lst_name: '',
      product_fulfillment_lst_name_url: '',
      product_detail_lst_name: '',
      product_detail_lst_name_url: '',
      arr: [],
      rules: {
        title: [
          { validator: validateTitle, message: '请填写课程名称', trigger: 'blur', required: true }
        ],
        purchase_precaution: [
          { validator: validatePrecaution, trigger: 'blur', required: true }
        ]
      },
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess1(response, file, fileList) {
      console.log(file)
      console.log(fileList)
      this.merIdenImgFront = file.url// 保存临时图片
      this.personalForm.basic_auth.enterprise.legal_person.front_path = file.url
      this.personalForm.merIdenImgFront = response// 保存到提交表单
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
      this.$message.warning(`当前限制选择 8 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleExceed2(files, fileList) {
      this.$message.warning(`当前限制选择 8 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onSubmit() {
      console.log('submit!', this.personalForm)
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          dyKcAddProduct(this.personalForm).then((response) => {
            console.log('提交表单返回数据', response)
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    handleHttpRequest1(params) {
      console.log(params)
      this.previewSrc = this.handleCreateURL(params.file)
      var fd = new FormData()
      fd.append('type', 31)
      fd.append('file', params.file)
      dyKcUploadMaterial(fd).then((response) => {
        console.log(response)
        const json = JSON.parse(response.data.res)
        console.log(json)
        if (json.err_no === 0) {
          this.personalForm.product.common_product_params.product_img_uri = json.data.resource_uri
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
    },
    addkcly() {
      this.dialogVisible1 = true
    },
    addkcxq() {
      this.dialogVisible2 = true
    },
    dialogClose1() {
      this.dialogVisible1 = false
      var fd = new FormData()
      fd.append('type', 2)
      fd.append('url', this.product_fulfillment_lst_name_url)
      dyKcUploadResource(fd).then((response) => {
        console.log(response)
        const json = JSON.parse(response.data)
        console.log(json)
        if (json.err_no === 0) {
          const o = {}
          const oo = {}
          oo.fulfillment_uri = json.data.resource_uri
          oo.url = this.product_fulfillment_lst_name_url
          oo.text = ''
          oo.name = this.product_fulfillment_lst_name
          o.fulfillment_content = oo
          o.fulfillment_type = 1
          this.personalForm.product.common_product_params.product_fulfillment_lst.push(o)
        } else if (json.err_no === 10003) {
          console.log(json.err_msg)
          const s = json.err_msg.split(':')
          console.log(s)
          const o = {}
          const oo = {}
          oo.fulfillment_uri = s[1]
          oo.url = this.product_fulfillment_lst_name_url
          oo.text = ''
          oo.name = this.product_fulfillment_lst_name
          o.fulfillment_content = oo
          o.fulfillment_type = 1
          this.personalForm.product.common_product_params.product_fulfillment_lst.push(o)
        } else {
          console.log(json.err_msg)
        }
      })
    },
    dialogClose2() {
      this.dialogVisible2 = false
      var fd = new FormData()
      fd.append('type', 1)
      fd.append('url', this.product_detail_lst_name_url)
      dyKcUploadResource(fd).then((response) => {
        console.log(response)
        const json = JSON.parse(response.data)
        console.log(json)
        if (json.err_no === 0) {
          const o = {}
          o.text = this.product_detail_lst_name
          o.img_uri = json.data.resource_uri
          o.url = this.product_detail_lst_name_url
          this.personalForm.product.common_product_params.product_detail_lst.push(o)
        } else if (json.err_no === 10003) {
          console.log(json.err_msg)
          const s = json.err_msg.split(':')
          console.log(s)
          const o = {}
          o.text = this.product_detail_lst_name
          o.img_uri = s[1]
          o.url = this.product_detail_lst_name_url
          this.personalForm.product.common_product_params.product_detail_lst.push(o)
        } else {
          console.log(json.err_msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
