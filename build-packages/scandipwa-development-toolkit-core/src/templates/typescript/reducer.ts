import { Reducer } from 'redux';

// TODO update this import when renamed
import { PlaceholderAction, PlaceholderActionType, PlaceholderStore } from './Placeholder.type';

export const getInitialState = (): PlaceholderStore => ({
    // TODO set initial state
});

export const PlaceholderReducer: Reducer<
PlaceholderStore,
PlaceholderAction
> = (
    state = getInitialState(),
    action,
) => {
    const { type } = action;

    switch (type) {
    case PlaceholderActionType.PLACEHOLDER_ACTION_TYPE:
        // const { payload } = action;

        return {
            ...state,
            // TODO implement payload handling
        };

    default:
        return state;
    }
};

export default PlaceholderReducer;
