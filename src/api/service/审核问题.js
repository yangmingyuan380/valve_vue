import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/审核问题'
export function getAccountProblem(user) {
    return request({
      url: `${api_url}/problem`, // 后端接口完整路径
      method: 'get',
      params:user
    })

}
