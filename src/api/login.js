import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/service/用户/login',
    method: 'post',
    data: {
      '职工号':username,
      '密码':password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/service/用户/info',
    method: 'get',
    params: { token }
  })
}

export function register(user) {
  return request({
    url: '/service/用户/register',
    method: 'post',
    data: user
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
