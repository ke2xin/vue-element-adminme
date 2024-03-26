<template>
  <div class="app-container upload-container">
    <div class="filter-container">
      <el-input v-model="listQuery.entity_id" placeholder="实体ID" style="width: 200px" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-descriptions v-if="enterprise" title="基础认证资质">
        <el-descriptions-item label="实体名称">{{ enterprise.basic_auth.entity_name }}</el-descriptions-item>
        <el-descriptions-item label="实体类型">{{ enterprise.basic_auth.entity_type==1?'个人':'企业' }}</el-descriptions-item>
        <el-descriptions-item label="证件照类型">{{ enterprise.basic_auth.certificate_type==1?'身份证':'营业执照' }}</el-descriptions-item>
        <el-descriptions-item label="审核状态">{{ enterprise.auth_status==1?'审核中':enterprise.auth_status==2?'审核成功':'审核失败' }}</el-descriptions-item>
        <el-descriptions-item label="审核原因">{{ enterprise.auth_reason }}</el-descriptions-item>
        <el-descriptions-item label="证件id">{{ enterprise.basic_auth.enterprise.certificate_id }}</el-descriptions-item>
        <el-descriptions-item label="法人">{{ enterprise.basic_auth.enterprise.legal_person.name }}</el-descriptions-item>
        <el-descriptions-item label="身份证id">{{ enterprise.basic_auth.enterprise.legal_person.id_number }}</el-descriptions-item>
        <el-descriptions-item label="身份证过期时间">{{ enterprise.basic_auth.enterprise.legal_person.expire_time }}</el-descriptions-item>
        <el-descriptions-item label="身份证正面uri">{{ enterprise.basic_auth.enterprise.legal_person.front_path }}</el-descriptions-item>
        <el-descriptions-item label="身份证反面uri">{{ enterprise.basic_auth.enterprise.legal_person.back_path }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { dyRoleEntity } from '@/api/douyin'
import waves from '@/directive/waves'
export default {
  name: 'QueryEntity',
  directives: { waves },
  data() {
    return {
      listQuery: {
        entity_id: 'I7170969438722736139'
      },
      enterprise: undefined,
      rules: {
        entity_id: [{ required: true, message: '实体id必须的', trigger: 'change' }]
      }
    }
  },

  methods: {
    getList() {
      dyRoleEntity(this.listQuery).then(response => {
        console.log('获取返回的数据')
        console.log(response)
        const json = JSON.parse(response.data)
        console.log(json)
        this.enterprise = json
      })
    },
    handleFilter() {
      this.getList()
    }
  }
}
</script>

<style scoped>
</style>
