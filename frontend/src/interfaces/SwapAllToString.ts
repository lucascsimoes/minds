export type SwapAllToStrings<T> = {
    [k in keyof(T)]: string;
}