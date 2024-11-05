export type Res<TData> = Promise<ItypeAPI<TData>>;
export interface ItypeAPI<TData = unknown> {
    data: TData;
    msg: string | null;
    code: number;
}
