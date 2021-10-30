import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/valveinfo'
export default {
  // 阀门列表，分页查询
  // page:当前页面 limit:每页显示个数
  getValveStatus(page, limit) {
    return request({
      url: `${api_url}/getValveInfo/${page}/${limit}`, // 后端接口完整路径
      method: 'get',
    })
  },
  openById(id) {
    return request({
      url: `${api_url}/openValveByValveID/${id}`, // 后端接口完整路径
      method: 'put',
    })
  },
  closeById(id) {
    return request({
      url: `${api_url}/closeValveByValveID/${id}`,
      method: 'put'
    })
  }
}
