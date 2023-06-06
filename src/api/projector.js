import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/ps/ckz/app/pro_list.php',
    method: 'get',
    params: query
  })
}

export function createMp4(data) {
  return request({
    url: '/ps/ckz/app/create.php',
    method: 'post',
    data
  })
}

export function del(query) {
  return request({
    url: '/ps/ckz/app/del.php',
    method: 'get',
    params: query
  })
}

export function upload(query) {
  return request({
    url: '/ps/ckz/app/del.php',
    method: 'get',
    params: query
  })
}

export function getUuid(query) {
  return request({
    url: '/ps/ckz/app/uuid.php',
    method: 'get',
    params: query
  })
}

export function publ(data) {
  return request({
    url: '/ps/ckz/app/publ.php',
    method: 'post',
    data
  })
}
