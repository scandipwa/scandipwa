export type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>

export type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;
