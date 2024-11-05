export declare const useHome: import("pinia").StoreDefinition<"home", {
    count: number;
    name: string;
}, {
    doubleCount: (state: {
        count: number;
        name: string;
    } & import("pinia").PiniaCustomStateProperties<{
        count: number;
        name: string;
    }>) => number;
}, {
    increment(): void;
    randomizecount(): void;
    fnName(): Promise<void>;
}>;
