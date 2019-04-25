import { HOME_PAGE } from 'Component/Header';
import {
    CHANGE_HEADER_STATE,
    GOTO_PREVIOUS_HEADER_STATE
} from './Header.action';

const initialState = {
    headerState: {
        name: HOME_PAGE
    },
    headerStateHistory: [
        { name: HOME_PAGE }
    ]
};

const HeaderReducer = (state = initialState, action) => {
    const { headerState } = action;
    const { headerStateHistory } = state;

    switch (action.type) {
    case CHANGE_HEADER_STATE:
        const { name: nextName } = headerState;
        const { headerState: { name: prevName } } = state;

        if (nextName === prevName) {
            headerStateHistory[headerStateHistory.length - 1] = headerState;
        } else {
            headerStateHistory.push(headerState);
        }

        return {
            ...state,
            headerStateHistory,
            headerState
        };

    case GOTO_PREVIOUS_HEADER_STATE:
        headerStateHistory.pop();
        const newHeaderState = headerStateHistory.slice(-1)[0];

        return {
            ...state,
            headerStateHistory,
            headerState: newHeaderState
        };

    default:
        return state;
    }
};

export default HeaderReducer;
