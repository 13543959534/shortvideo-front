import instance from "@/request/config/index.ts";
import type { Res } from "@/request/config/type.ts";
 
//登录接口
interface RegionReq {
    data: string
}
export const registerUser = (params:RegionReq): Res<string> => 
    instance.get("/v1/member/oauth", { params });
// home页面接口
export const getHomeApi = (): Res<any> => 
    instance.get("/v1/home/info");
// // post请求，有参数,如传用户名和密码
// export const loginAPI = (data: ReqLogin): Res<string> =>
//     instance.post("/admin/login", data);