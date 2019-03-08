import {
    UPDATE_NOMATCH
} from './NoMatch.action';

const initialState = {
    noMatch: false
};

const NoMatchReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_NOMATCH:
        const { noMatch } = action;

        return { noMatch };

    default:
        return state;
    }
};

export default NoMatchReducer;
