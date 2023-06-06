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
