import {request} from "./request";

//  获取首页多个数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//  获取首页商品数据,传入类型和页码
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
