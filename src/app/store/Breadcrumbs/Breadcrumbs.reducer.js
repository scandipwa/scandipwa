import {
    UPDATE_BREADCRUMBS
} from './Breadcrumbs.action';
import { TOGGLE_BREADCRUMBS } from '.';

const initialState = {
    breadcrumbs: [],
    areBreadcrumbsVisible: true
};

const BreadcrumbsReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_BREADCRUMBS:
        const { breadcrumbs } = action;

        return {
            ...state,
            breadcrumbs
        };

    case TOGGLE_BREADCRUMBS:
        const { areBreadcrumbsVisible } = action;

        return {
            ...state,
            areBreadcrumbsVisible
        };

    default:
        return state;
    }
};

export default BreadcrumbsReducer;
