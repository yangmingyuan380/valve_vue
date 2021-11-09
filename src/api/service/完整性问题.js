import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/完整性登记表'
export function getIntegrityProblem(token) {
  return request({
    url: `${api_url}/problem`,
    method: 'get',
    params: token
  })
}
export function putIntegrityProblem(integritychart) {
  return request({
    url: `${api_url}/problem`,
    method: 'put',
    data:integritychart
  })
}