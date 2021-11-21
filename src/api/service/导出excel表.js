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
  output(id) { // 插入新的基本信息
    return request({
      url: `${api_url}/getexcel1`, // 后端接口完整路径
      method: 'post',
      params: id,
      responseType: 'arraybuffer'
    })
  },
  output3(id) { // 插入新的基本信息
    return request({
      url: `${api_url}/getword1`, // 后端接口完整路径
      method: 'post',
      params: id,
      responseType: 'arraybuffer'
    })
  },
  output4(id) { // 插入新的基本信息
    return request({
      url: `${api_url}/getword3`, // 后端接口完整路径
      method: 'post',
      params: id,
      responseType: 'arraybuffer'
    })
  },
}
