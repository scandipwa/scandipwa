export type HighEntropyClientHints = |
    'architecture' |
    'bitness' |
    'model' |
    'platform' |
    'platformVersion' |
    'uaFullVersion'

declare global {
    interface NavigatorUAData {
        readonly brands: string[]
        readonly mobile: boolean
        readonly platform: string
        getHighEntropyValues<T extends HighEntropyClientHints[]>(hints: T): Promise<
            {
                [K in T[number]]: string
            }
        >
    }

    interface Navigator {
        userAgentData?: NavigatorUAData
    }
}
