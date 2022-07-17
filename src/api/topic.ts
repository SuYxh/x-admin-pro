import { request } from "@/utils/service"

export interface Topic {
  id: number
  title: string
  classify_id: number
  user_id: number
  company: string
  author: string
  view: number
  like: number
  collect: number
}

export interface CreateTopicType {
  title: string
  classify_id: number | undefined
  company: string
  author: string
  answer?: string
  mdurl?: string
}

/** 获取所有题目 */
export function getAllTopic() {
  return request({
    url: "/topic/getAllTopic",
    method: "get"
  })
}

// 创建题目
export function createTopic(data: CreateTopicType) {
  return request({
    url: "/topic/create",
    method: "post",
    data
  })
}
