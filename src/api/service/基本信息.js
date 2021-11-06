import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/基本信息'
export default {
  getlist() { // 获取数据字典
    return request({
      url: `${api_url}/getlist`, // 后端接口完整路径
      method: 'get',
    })
  },
  saveOrUpdate(user) { // 插入新的基本信息
    return request({
      url: `${api_url}/saveOrUpdate`, // 后端接口完整路径
      method: 'post',
      data:user
    })
  },
  getdata(查询条件,user) { // 根据职工号更新基本信息
    return request({
      url: `${api_url}/getdata`, // 后端接口完整路径
      method: 'post',
      params: {
        "查询条件":查询条件,
      },
      data:user
    })
  },

}
