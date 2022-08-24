export const CLASS_PLUGIN_PROPERTY_TYPE = 'member-property';
export const CLASS_PLUGIN_METHOD_TYPE = 'member-function';
export const CLASS_PLUGIN_STATIC_TYPE = 'static-member';

export type ClassPluginTypes =
    typeof CLASS_PLUGIN_PROPERTY_TYPE
    | typeof CLASS_PLUGIN_METHOD_TYPE
    | typeof CLASS_PLUGIN_STATIC_TYPE;

export const FUNCTION_PLUGIN_TYPE = 'function';

export type PluginReferenceConfig = {
    [CLASS_PLUGIN_PROPERTY_TYPE]: Record<string, ts.Node>,
    [CLASS_PLUGIN_METHOD_TYPE]: Record<string, ts.Node>,
    [CLASS_PLUGIN_STATIC_TYPE]: Record<string, ts.Node>,
    [FUNCTION_PLUGIN_TYPE]: ts.Node | undefined
};

export const createNewPluginReferenceConfig = (): PluginReferenceConfig => ({
    [CLASS_PLUGIN_PROPERTY_TYPE]: {},
    [CLASS_PLUGIN_METHOD_TYPE]: {},
    [CLASS_PLUGIN_STATIC_TYPE]: {},
    [FUNCTION_PLUGIN_TYPE]: undefined
});

export type PartialPluginTargetConfig = {
    name?: string,
    type?: typeof CLASS_PLUGIN_PROPERTY_TYPE
        | typeof CLASS_PLUGIN_METHOD_TYPE
        | typeof CLASS_PLUGIN_STATIC_TYPE
        | typeof FUNCTION_PLUGIN_TYPE,
}

export type PluginTargetConfig = {
    name: string,
    type: typeof CLASS_PLUGIN_PROPERTY_TYPE
        | typeof CLASS_PLUGIN_METHOD_TYPE
        | typeof CLASS_PLUGIN_STATIC_TYPE
        | typeof FUNCTION_PLUGIN_TYPE,
}

export type DiagnosticMessage = {
    messageText: string;
    code: number;
};
