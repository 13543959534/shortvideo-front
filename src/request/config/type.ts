// Res是返回的参数，返回对数统一管理***
export type Res<TData> = Promise<ItypeAPI<TData>>;

export interface ItypeAPI<TData = unknown> {
    data: TData,//请求的数据，用泛型
    msg: string | null // 返回状态码的信息，如请求成功等
    code: number //返回后端自定义的200，404，500这种状态码
}