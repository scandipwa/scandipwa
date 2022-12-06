import { ResourceType } from './common.types';

export type FileMap = Record<string, string | null>;

export type MapGeneratorOptions = {
    resourceType: ResourceType;
    resourceName: string;
};

export enum DispatcherType {
    QueryDispatcher = 'dispatcher-query',
    RegularDispatcher = 'dispatcher-regular',
    NoDispatcher = 'no-dispatcher',
}

export type ContainerFeatures = {
    logic: boolean;
    state: boolean;
};

export type TypesScriptParam = {
    isTypescript: boolean;
};

export type ComponentResourceParams = {
    containerFeatures: ContainerFeatures;
} & TypesScriptParam;

export type StoreResourceParams = {
    dispatcherType: DispatcherType;
} & TypesScriptParam;

export type QueryResourceParams = {} & TypesScriptParam;

export type ResourceParams = ComponentResourceParams | StoreResourceParams | QueryResourceParams;
