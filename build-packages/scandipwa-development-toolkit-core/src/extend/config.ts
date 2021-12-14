export type ConfigType = {
    [key: string]: any;
}

let config: ConfigType = {};

export const setConfig = (newConfig: ConfigType = {}) => {
    config = newConfig;
};

export const getConfigByKey = (key: string, defaultValue?: any) => {
    return config[key] || defaultValue;
};