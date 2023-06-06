<template>
  <div class="app-container">
    <div>请选择：</div>
    <el-upload
      action="https://slpos.kosm.com.cn/ypps/ps/ckz/douyinkc/upload_file.php"
      :on-success="uploadOnSuccess"
      :on-error="uploadOnError"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div v-if="url!==''">
      原图：<el-button type="primary" icon="el-icon-document" @click="handleCopy(url,$event)">
        copy链接
      </el-button>
      <el-image :src="url" />
    </div>
    <div v-if="compress_url!==''">
      压缩图：<el-button type="primary" icon="el-icon-document" @click="handleCopy(compress_url,$event)">
        copy链接
      </el-button>
      <el-image :src="compress_url" />
    </div>
  </div>
</template>

<script>
import clip from '@/utils/clipboard'
export default {
  name: 'Index',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      url: '',
      compress_url: ''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadOnSuccess(response) {
      console.log('上传成功回调')
      console.log(response)
      this.url = response.data.url
      this.compress_url = response.data.compress_url
      this.$notify({
        message: '成功',
        type: 'success',
        duration: 2000
      })
    },
    uploadOnError(err) {
      console.log('上传视频失败回调')
      console.log(err)
      this.$notify({
        message: '错误',
        type: 'error',
        duration: 2000
      })
    },
    handleCopy(text, event) {
      clip(text, event)
    }
  }
}
</script>

<style scoped>

</style>
