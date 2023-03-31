import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/ps/ckz/app/login.php',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/ps/ckz/app/info.php',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/ps/ckz/app/logout.php',
    method: 'post'
  })
}
