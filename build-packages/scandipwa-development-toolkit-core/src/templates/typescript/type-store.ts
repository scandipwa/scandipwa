import { AnyAction } from 'redux';

export enum PlaceholderActionType {
    PLACEHOLDER_ACTION_TYPE = 'PLACEHOLDER_ACTION_TYPE',
}

export interface PlaceholderAction extends AnyAction {
    type: PlaceholderActionType.PLACEHOLDER_ACTION_TYPE;
    // TODO Update type for payload
    payload: unknown;
}

export interface PlaceholderStore {
    payload: unknown;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        PlaceholderReducer: PlaceholderStore;
    }
}
