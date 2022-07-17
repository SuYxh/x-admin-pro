import { request } from "@/utils/service"

export interface ClassifyType {
  desc: string
  icon: string
  id: number
  key: string
  sortId: number
  title: string
  visible: number
}

/** 获取所有分类 */
export function getAllClassify() {
  return request({
    url: "/classify/getAllClassify",
    method: "get"
  })
}
