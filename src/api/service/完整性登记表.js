import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/完整性登记表'
export function getIntegrityRecord(token) {
  return request({
    url: `${api_url}/record`,
    method: 'post',
    data: token
  })
}
// export function getIntegrityRecords(token) {
//   return request({
//     url: `${api_url}/records`,
//     method: 'get',
//     data: token
//   })
// }
export function putIntegrityRecord(integritychart) {
  return request({
    url: `${api_url}/record`,
    method: 'put',
    data:integritychart
  })
}
// export function postIntegrityRecord(integritychart) {
//   return request({
//     url: `${api_url}/record`,
//     method: 'post',
//     data:integritychart
//   })
// }