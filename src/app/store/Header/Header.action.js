export const CHANGE_HEADER_STATE = 'CHANGE_HEADER_STATE';
export const GOTO_PREVIOUS_HEADER_STATE = 'GOTO_PREVIOUS_HEADER_STATE';

export const changeHeaderState = headerState => ({
    type: CHANGE_HEADER_STATE,
    headerState
});

export const goToPreviousHeaderState = () => ({
    type: GOTO_PREVIOUS_HEADER_STATE
});
