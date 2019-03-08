import {
    UPDATE_CMS_PAGE,
    UPDATE_LOAD_STATUS
} from './CmsPage.action';

const initialState = {
    page: {},
    isLoading: true
};

const CmsPageReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_CMS_PAGE:
        const { page } = action;

        return {
            ...state,
            page
        };

    case UPDATE_LOAD_STATUS:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };

    default:
        return state;
    }
};

export default CmsPageReducer;
