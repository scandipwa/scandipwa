import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

export const UrlRewritesDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/UrlRewrites/UrlRewrites.dispatcher'
);

export const useUrlRewritesStore = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    return {
        requestUrlRewrite: (urlParam = location.pathname) => {
            UrlRewritesDispatcher.then(
                ({ default: dispatcher }) => dispatcher.handleData(dispatch, { urlParam })
            );
        }
    };
};
