import { PlaceholderAction, PlaceholderActionType } from './Placeholder.type';

// TODO rename
export const action = (payload: unknown): PlaceholderAction => ({
    type: PlaceholderActionType.PLACEHOLDER_ACTION_TYPE,
    payload,
});
