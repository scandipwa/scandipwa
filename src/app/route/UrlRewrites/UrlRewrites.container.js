/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { connect } from 'react-redux';

import UrlRewrites from './UrlRewrites.component';

const UrlRewritesDispatcher = import(/* webpackMode: "lazy", webpackChunkName: "dispatchers" */'Store/UrlRewrites/UrlRewrites.dispatcher');

export const mapStateToProps = state => ({
    urlRewrite: state.UrlRewritesReducer.urlRewrite,
    isLoading: state.UrlRewritesReducer.isLoading
});

export const mapDispatchToProps = dispatch => ({
    requestUrlRewrite: (urlParam) => {
        UrlRewritesDispatcher.then(({ default: dispatcher }) => dispatcher.handleData(dispatch, { urlParam }));
    },
    clearUrlRewrites: () => {
        UrlRewritesDispatcher.then(({ default: dispatcher }) => dispatcher.clearUrlRewrites(dispatch));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UrlRewrites);
