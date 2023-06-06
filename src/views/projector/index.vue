<template>
  <div class="app-container upload-container">
    <div class="filter-container">
      <el-input v-model="listQuery.mp4_bt" placeholder="请输入标题" style="width: 200px" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备id" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.hy_sj }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.mp4_bt }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类别">
        <template slot-scope="scope">
          <span>{{ scope.row.mp4_lb }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="封面图">
        <template slot-scope="scope">
          <el-image :src="scope.row.mp4_pic" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="视频地址">
        <template slot-scope="scope">
          <span>{{ scope.row.mp4_url }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.mp4_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleUpdate(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px;margin-left: 50px">
        <el-form-item label="设备id" prop="hy_sj">
          <el-input v-model="temp.hy_sj" />
        </el-form-item>
        <el-form-item label="类别" prop="mp4_lb">
          <el-input v-model="temp.mp4_lb" />
        </el-form-item>
        <el-form-item label="标题" prop="mp4_bt">
          <el-input v-model="temp.mp4_bt" />
        </el-form-item>
        <el-form-item label="封面图" prop="mp4_pic">
          <el-input v-model="temp.mp4_pic" />
        </el-form-item>
        <!--        <el-form-item label="封面图" prop="mp4_pic" label-width="80px">
          <upload v-model="temp.mp4_pic" />
        </el-form-item>-->
        <el-form-item label="视频地址" prop="mp4_url" label-width="80px">
          <el-input v-model="temp.mp4_url" />
        </el-form-item>
        <!--                <el-form-item label="视频地址" prop="mp4_url" label-width="80px">
          <el-upload
            v-model="temp.mp4_url"
            drag
            class="upload-demo"
            action="https://slpos.kosm.com.cn/ypps/ps/ckz/app/upload_video.php"
            :on-success="videoOnSuccess"
            :on-error="videoOnError"
            :limit="1"
            :on-exceed="handleExceed"
            :before-remove="beforeRemove"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text"><em>点击上传</em></div>
            <div class="el-upload__tip">请不要上传太大的视频</div>
          </el-upload>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createMp4, del } from '@/api/projector'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
/* import Upload from '@/components/Upload/SingleImage4'*/
export default {
  name: 'Index',
  directives: { waves },
  components: { Pagination /* Upload*/ },
  data() {
    return {
      fileList: [],
      uuid: null,
      list: null,
      total: 0,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      dialogFormVisible: false,
      temp: {
        id: undefined,
        hy_sj: '',
        mp4_bt: '',
        mp4_lb: '',
        mp4_pic: '',
        mp4_url: '',
        mp4_time: new Date()
      },
      listQuery: {
        page: 1,
        limit: 10,
        mp4_bt: '',
        hy_sj: ''
      },
      rules: {
        hy_sj: [{ required: true, message: '设备id必须的', trigger: 'change' }],
        mp4_bt: [{ required: true, message: '标题必须的', trigger: 'change' }],
        mp4_lb: [{ required: true, message: '类别必须的', trigger: 'blur' }],
        mp4_pic: [{ required: true, message: '封面图必须的', trigger: 'blur' }],
        mp4_url: [{ required: true, message: '视频地址必须的', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        console.log('获取返回的数据')
        console.log(response)
        this.list = response.data.items
        this.total = response.data.total
        this.uuid = response.data.uuid
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        hy_sj: '',
        mp4_bt: '',
        mp4_lb: '',
        mp4_pic: '',
        mp4_url: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.temp.hy_sj = this.uuid
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        console.log('验证通过吗？', valid)
        console.log(this.temp)
        if (valid) {
          createMp4(this.temp).then((response) => {
            this.temp.id = response.data.id
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {

    },
    updateData() {

    },
    handleDelete(row, index) {
      del({ 'id': row.id }).then((response) => {
        console.log('删除后返回的数据：', response.data)
        this.$notify({
          title: '成功',
          message: '删除成功',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    iii(val) {
      console.log('自定义事件：', val)
    },
    videoOnSuccess(response) {
      console.log('上传视频成功回调')
      console.log(response)
      this.temp.mp4_url = response.data.url
      this.$notify({
        message: '成功',
        type: 'success',
        duration: 2000
      })
    },
    videoOnError(err) {
      console.log('上传视频失败回调')
      console.log(err)
      this.$notify({
        message: '错误',
        type: 'error',
        duration: 2000
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning('当前限制选择1个文件')
    },
    beforeRemove(file, fileList) {
      this.temp.mp4_url = ''
      return this.$confirm(`确定移除${file.name}？`)
    }
  }
}
</script>

<style scoped>
</style>
