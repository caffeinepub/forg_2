import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MemeCoin {
    decimals: number;
    name: string;
    symbol: string;
    contractAddress: string;
}
export interface backendInterface {
    getMemeCoin(): Promise<MemeCoin>;
    incrementPfpCount(): Promise<bigint>;
    getPfpCount(): Promise<bigint>;
}
