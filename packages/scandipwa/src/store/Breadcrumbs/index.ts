import { useDispatch } from 'react-redux';

import { toggleBreadcrumbs } from './Breadcrumbs.action';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

export const useBreadcrumbsStore = () => {
    const dispatch = useDispatch();

    return {
        updateBreadcrumbs: (title: string) => {
            BreadcrumbsDispatcher.then(
                ({ default: dispatcher }) => dispatcher.updateWithCmsPage({ title }, dispatch)
            );
        },
        toggleBreadcrumbs: (isActive: boolean) => {
            BreadcrumbsDispatcher.then(
                ({ default: dispatcher }) => dispatcher.update([], dispatch)
            );
            dispatch(toggleBreadcrumbs(isActive));
        }
    };
};
