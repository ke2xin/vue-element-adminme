import request from '@/utils/request'

export function uploadMaterial(data) {
  return request({
    url: '/ps/ckz/hkv2/upload_material.php',
    method: 'post',
    data
  })
}
