import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/学历学位'
export default {
  saveOrUpdate(user) {
    return request({
      url: `${api_url}/saveOrUpdate`, // 后端接口完整路径
      method: 'post',
      data:user
    })
  },
}
