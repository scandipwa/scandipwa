import { useDispatch } from 'react-redux';

export const UrlRewritesDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/UrlRewrites/UrlRewrites.dispatcher'
);

export const useUrlRewritesStore = () => {
    const dispatch = useDispatch();
    return {
        requestUrlRewrite: (urlParam = location.pathname) => {
            UrlRewritesDispatcher.then(
                ({ default: dispatcher }) => dispatcher.handleData(dispatch, { urlParam })
            );
        }
    };
};
