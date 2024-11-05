import type { Res } from "@/request/config/type.ts";
interface RegionReq {
    data: string;
}
export declare const registerUser: (params: RegionReq) => Res<string>;
export declare const getHomeApi: () => Res<any>;
export {};
