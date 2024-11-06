import request from '@/utils/request'

export const registerUser = (params?: object) => {
  return request.get("/v1/member/oauth", { params });
}
export const getHomeApi = (params?: object) => {
  return request.get("/v1/home/info", { params });
}