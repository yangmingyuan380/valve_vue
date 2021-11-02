import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/审核情况登记表'
export default {
  save(user) {
    return request({
      url: `${api_url}/save`, // 后端接口完整路径
      method: 'post',
      data:user
    })
  },

}
