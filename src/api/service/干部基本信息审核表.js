import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/干部基本信息审核表'
export function getInfoRecord(token) {
  return request({
    url: `${api_url}/record`,
    method: 'post',
    data: token
  })
}
export function putInfoRecord(integritychart) {
  return request({
    url: `${api_url}/record`,
    method: 'put',
    data:integritychart
  })
}
