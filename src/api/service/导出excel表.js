import request from '@/utils/request'
// request中封装好了axios请求
// 后端接口路径
const api_url = 'service/导出'
export default {
  output1(idList) { // 插入新的基本信息
    return request({
      url: `${api_url}/getexcel4`, // 后端接口完整路径
      method: 'post',
      data:idList,
      responseType: 'arraybuffer'
    })
  },

}
