import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/审核情况一览表'
export default {
  getdata(page,limit,初审时间开始,初审时间结束,复审时间开始,复审时间结束,user) { // 查询信息
    return request({
      url: `${api_url}/getdata`, // 后端接口完整路径
      method: 'post',
      data:user,
      params: {
        "page":page,
        "limit":limit,
        "初审时间开始":初审时间开始,
        "初审时间结束":初审时间结束,
        "复审时间开始":复审时间开始,
        "复审时间结束":复审时间结束
      },
    })
  },

}
