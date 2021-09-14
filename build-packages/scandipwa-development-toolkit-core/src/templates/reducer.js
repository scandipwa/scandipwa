// TODO update this import when renamed
import { ACTION_TYPE } from './Placeholder.action';

export const getInitialState = () => ({
    // TODO set initial state
});

export const PlaceholderReducer = (state = getInitialState(), action) => {
    switch (action.type) {
    case ACTION_TYPE:
        // const { payload } = action;

        return {
            ...state
            // TODO implement payload handling
        };

    default:
        return state;
    }
};

export default PlaceholderReducer;
