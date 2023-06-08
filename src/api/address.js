import request from '@/utils/request'

export function addressResolution(data) {
  return request({
    url: '/ps/ckz/address/l.php',
    method: 'post',
    data
  })
}
