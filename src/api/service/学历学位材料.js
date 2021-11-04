import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/学历学位'
export default {
  save(user) { // 插入新的基本信息
    return request({
      url: `${api_url}/save`, // 后端接口完整路径
      method: 'post',
      data:user
    })
  },
  update(user) { // 根据职工号更新基本信息
    return request({
      url: `${api_url}/update`, // 后端接口完整路径
      method: 'post',
      data:user
    })
  },

}
