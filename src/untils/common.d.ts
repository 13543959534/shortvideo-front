/**
 * 全局通用函数汇总
 *
 */
/**
 * H5传参给APP
 * @param funcName:原生方法名  data
 * @param data:传给原生的数据
 * @returns {}
 */
export declare function sendAppMsg(funcName: string, data: string, data2: string): void;
/**
 * 获取地址参数
 * @param url
 * @returns {unescape}
 */
export declare function getQueryString(): {
    token: string;
};
export declare function numCutting(num: string | number): string;
export declare function delCookie(name: string): void;
export declare function getCookie(name: string): string;
export declare function setCookie(cname: string, cvalue: string, exdays: number): void;
/**
 * 时间戳转时间 formatDate(new Date(时间戳),'hh:mm dd/MM/yyyy')
 * */
export declare function formatDate(date: Date, fmt: string): string;
/**
 *  微信判断
 * @param
 * @returns
 */
export declare function is_weixn(): boolean;
/**
 * 登录设备
 * @param
 * @returns
 */
export declare function deviceCheck(): string;
/**
 * 设备信息
 * @param ""
 * @returns {}
 */
export declare function versions(): any;
