import { useDispatch } from 'react-redux';

import { changeNavigationState } from './Navigation.action';
import { BOTTOM_NAVIGATION_TYPE, TOP_NAVIGATION_TYPE } from './Navigation.config';

export const useNavigationStore = () => {
    const dispatch = useDispatch();

    return {
        changeTopNavigationState: (state: any): void => {
            dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state));
        },
        changeBottomNavigationState: (state: any): void => {
            dispatch(changeNavigationState(BOTTOM_NAVIGATION_TYPE, state));
        }
    };
};
