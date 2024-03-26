import request from '@/utils/request'

export function dyUploadResource(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_upload_resource.php',
    method: 'post',
    data
  })
}

export function dyQueryResourceStatus(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_query_resource_status.php',
    method: 'post',
    data
  })
}

export function dyRoleUploadMaterial(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_upload_material.php',
    method: 'post',
    data
  })
}
export function dyKcUploadMaterial(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_kc_upload_material.php',
    method: 'post',
    data
  })
}
export function dyKcUploadResource(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_kc_upload_resource.php',
    method: 'post',
    data
  })
}
export function dyKcAddProduct(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_kc_add_product.php',
    method: 'post',
    data
  })
}
export function dyTest(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_test.php',
    method: 'post',
    data
  })
}

export function lunar(data) {
  return request({
    url: '/ps/ckz/douyinkc/lunar.php',
    method: 'post',
    data
  })
}

export function dyRoleSettle(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_settle.php',
    method: 'post',
    data
  })
}
export function dyRoleSettlePartner(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_settle_partner.php',
    method: 'post',
    data
  })
}
export function dyRoleAddRole(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_add_role.php',
    method: 'post',
    data
  })
}
export function dyRoleBindRole(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_bind_role.php',
    method: 'post',
    data
  })
}

export function dyRoleGetBindList(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_get_bind_list.php',
    method: 'post',
    data
  })
}
export function dyRoleClassAuth(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_class_auth.php',
    method: 'post',
    data
  })
}
export function dyRoleUpdateClassAuth(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_update_class_auth.php',
    method: 'post',
    data
  })
}

export function dyRoleEntity(query) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_entity.php',
    method: 'get',
    params: query
  })
}
export function dyRoleGetClassAuth(data) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_get_class_auth.php',
    method: 'post',
    data
  })
}
export function dyRoleEntityInfo(query) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_entity_info.php',
    method: 'get',
    params: query
  })
}
export function dyRoleGetAuditDetail(query) {
  return request({
    url: '/ps/ckz/douyinkc/dy_role_get_audit_detail.php',
    method: 'get',
    params: query
  })
}
export function dyKcQuery(query) {
  return request({
    url: '/ps/ckz/douyinkc/dy_kc_query.php',
    method: 'get',
    params: query
  })
}
