<template>
  <div class="singleImageUpload2 upload-container">
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      action="https://slpos.kosm.com.cn/ypps/ps/ckz/app/upload.php"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        <em>点击上传</em>
      </div>
    </el-upload>
    <div v-show="imageUrl.length>0" class="image-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { upload } from '@/api/projector'

export default {
  name: 'SingleImageUpload4',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  computed: {
    imageUrl() {
      console.log('图片封面图')
      console.log(this.value)
      return this.value
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      console.log('提交', val)
      this.$emit('input', val)
    },
    handleImageSuccess(data) {
      console.log('上传后成功', data)
      // this.tempUrl = data.temp_url
      if (data.code === 50000) {
        this.$message({
          message: data.data.msg,
          type: 'error'
        })
      }
      this.emitInput(data.data.url)
    },
    beforeUpload() {
      // const _self = this
      return new Promise((resolve, reject) => {
        upload({}).then(response => {
          console.log('上传后', response)
          /* const key = response.data.qiniu_key
          const token = response.data.qiniu_token
          _self._data.dataObj.token = token
          _self._data.dataObj.key = key*/
          this.tempUrl = response.data.temp_url
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
  height: 100%;
  position: relative;
  .image-uploader {
    height: 100%;
  }
  .image-preview {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    border: 1px dashed #d9d9d9;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, .5);
      transition: opacity .3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
